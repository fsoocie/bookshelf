import {useQuery} from 'react-query'
import {client} from './api-client.final'
import bookPlaceholderSvg from '../assets/book-placeholder.svg'

const loadingBook = {
  title: 'Loading...',
  author: 'loading...',
  coverImageUrl: bookPlaceholderSvg,
  publisher: 'Loading Publishing',
  synopsis: 'Loading...',
  loadingBook: true,
}

const loadingBooks = Array.from({length: 10}, (v, index) => ({
  id: `loading-book-${index}`,
  ...loadingBook,
}))

export const useBookSearch = (query, user) => {
  const result = useQuery(['bookSearch', {query}], () =>
    client(`books?query=${encodeURIComponent(query)}`, {
      token: user.token,
    }).then(data => data.books),
  )
  return {...result, books: result.data ?? loadingBooks}
}

export function useBook(bookId, user) {
  const {data: book} = useQuery({
    queryKey: ['book', {bookId}],
    queryFn: () =>
      client(`books/${bookId}`, {token: user.token}).then(data => data.book),
  })
  return book ?? loadingBook
}
