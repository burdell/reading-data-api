interface Book {
  id: string
  book_id: number
  title: string
  author: string
  my_rating: number
  number_of_pages: number
  date_read: string
  my_review: string
  isbn?: string
  isbn_13?: string
}

export type BookConversion = Pick<
  GoodreadsBook,
  | 'Book Id'
  | 'Title'
  | 'Author'
  | 'My Rating'
  | 'Number of Pages'
  | 'Date Read'
  | 'My Review'
  | 'ISBN'
  | 'ISBN13'
>

export type BookWithoutId = Omit<Book, 'id'>

export interface GoodreadsBook {
  'Book Id': number
  Title: string
  Author: string
  'Author l-f': string
  'Additional Authors': string
  ISBN: string
  ISBN13: string
  'My Rating': number
  'Average Rating': number
  Publisher: string
  Binding: string
  'Number of Pages': number
  'Year Published': number
  'Original Publication Year': number
  'Date Read': string
  'Date Added': string
  Bookshelves: string
  'Bookshelves with positions': string
  'Exclusive Shelf': string
  'My Review': string
  Spoiler: string
  'Private Notes': string
  'Read Count': number
  'Recommended For': string
  'Recommended By': string
  'Owned Copies': string | number
  'Original Purchase Date': string
  'Original Purchase Location': string
  Condition: string
  'Condition Description': string
  BCID: string
}

interface Authors {
  id: number
  name: string
  role: string
  image_url: string
  small_image_url: string
  link: string
  average_rating: number
  ratings_count: number
  text_reviews_count: number
}

interface Work {}

interface GoodreadsAPIBook {
  id: number
  isbn: string
  isbn13: number
  text_reviews_count: number
  uri: string
  title: string
  title_without_series: string
  image_url: string
  small_image_url: string
  large_image_url: string
  link: string
  num_pages: string
  format: string
  edition_information: string
  publisher: string
  publication_day: string
  publication_year: string
  publication_month: string
  average_rating: number
  ratings_count: number
  description: string
  authors: { author: Authors }
  published: string
  work: Work
  read_count: number
}

interface Shelves {
  shelf: string
}

export interface GoodreadsAPIReadEvent {
  id: number
  book: GoodreadsAPIBook
  rating: number
  votes: number
  spoiler_flag: boolean
  spoilers_state: string
  shelves: Shelves
  recommended_for: string
  recommended_by: string
  started_at: string
  read_at: string
  date_added: string
  date_updated: string
  read_count: number
  body: string
  comments_count: number
  url: string
  link: string
  owned: number
}
