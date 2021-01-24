import { config } from 'dotenv'
import { addDays, format } from 'date-fns'

import { addToDb } from '../db'
import { getEnv } from './env'
import { writeToFile } from '../writeToFile'

import { convertApiBook, getReadBooks } from './goodreads_sync'
import { formatReadDate } from './date'

async function main() {
  const { GOODREADS_KEY, GOODREADS_USER } = getEnv()

  const books = await getReadBooks(GOODREADS_USER, GOODREADS_KEY)

  if (!books.length) return

  const convertedBook = convertApiBook(books[0])
  const readDate = addDays(new Date(), -1)
  convertedBook.date_read = formatReadDate(readDate)

  // writeToFile(convertedBook, './', 'results.json')
  addToDb([convertedBook])
}

if (process.env.NODE_ENV === 'local') {
  config()
  main()
}
