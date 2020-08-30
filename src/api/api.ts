import axios from 'axios'
import { BookType } from '../redux/reducers/books'

const instance = axios.create({
  baseURL: 'https://my-json-server.typicode.com/yuriy-m-dev/book-store/'
})

export const booksAPI = {
  getBooks: (category: number | null, type: string, order: string, searchQuery: string, pageNumber: number) => {
    return instance.get<Array<BookType>>(`books?${category !== null ? `category=${category}&` : ''}_sort=${type}&_order=${order}${searchQuery ? `&q=${searchQuery}` : ''}&_page=${pageNumber}`).then(response => response)
  }
}
