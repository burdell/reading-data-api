import { BookWithoutId, BookConversion } from '../types'

export function getBooks(readingData: BookConversion[], year?: number) {
  const books: BookWithoutId[] = []

  readingData.map(rawBook => {
    const validYear = year ? year === getYear(rawBook['Date Read']) : true
    const book = convertToNewType(rawBook)
    if (validYear && book) books.push(book)
  })

  return books
}

function getYear(date: string): number | undefined {
  const splitDate = date.split('/')
  const year = Number(splitDate[0])
  return year || undefined
}

function convertToNewType(
  rawBook: Partial<BookConversion>
): BookWithoutId | undefined {
  const book = validateData(rawBook)
  if (!book) return

  return {
    author: book.Author,
    book_id: book['Book Id'],
    date_read: book['Date Read'],
    isbn: book.ISBN,
    isbn_13: book.ISBN13,
    my_rating: book['My Rating'],
    my_review: book['My Review'],
    number_of_pages: book['Number of Pages'],
    title: book.Title
  }
}

function validateData(
  book: Partial<BookConversion>
): BookConversion | undefined {
  // const requiredFields = [
  //   "title",
  // ];
  // const fields = Object.keys(book)
  // const hasAllFields = fields.every(field => !!(book as any)[field])

  // if (!hasAllFields) {
  //   return
  // }

  return book as BookConversion
}
