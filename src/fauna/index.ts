import { config } from 'dotenv'
import faunadb from 'faunadb'

import { getDynamoData } from './dynamo'

async function getBooks() {
  const books = await getDynamoData()
  const faunaBooks = books.map(
    ({ id, number_of_pages, my_rating, ...faunaBook }) => ({
      ...faunaBook,
      number_of_pages: Number(number_of_pages),
      my_rating: Number(my_rating),
    }),
  )
  return faunaBooks
}

export async function migrateToFauna() {
  const books = await getBooks()

  const secret = process.env.FAUNA_KEY
  if (!secret) throw new Error('FAUANA KEY NOT SET!')

  const client = new faunadb.Client({ secret })
  const q = faunadb.query

  try {
    client
      .query(
        q.Map(
          books,
          q.Lambda(
            'book',
            q.Create(q.Collection('read_event'), {
              data: {
                book_id: q.Select('book_id', q.Var('book')),
                title: q.Select('title', q.Var('book')),
                author: q.Select('author', q.Var('book')),
                my_rating: q.Select('my_rating', q.Var('book')),
                number_of_pages: q.Select('number_of_pages', q.Var('book')),
                date_read: q.Date(
                  q.ReplaceStr(q.Select('date_read', q.Var('book')), '/', '-'),
                ),
                my_review: q.Select('my_review', q.Var('book'), ''),
                isbn: q.Select('isbn', q.Var('book')),
              },
            }),
          ),
        ),
      )
      .then((ret) => console.log('=== ret', ret))
      .catch((err) => console.log('=== err', err))
  } catch (e) {
    console.log('ERROR: ', e.message)
  }
}

async function main() {
  await migrateToFauna()
}

if (process.env.NODE_ENV === 'local') {
  config()
  main()
}
