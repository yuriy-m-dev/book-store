import axios from 'axios'
import { BookType } from '../redux/reducers/books'

const instance = axios.create({
  baseURL: 'https://my-json-server.typicode.com/yuriy-m-dev/book-store/'
})

export const booksAPI = {
  getBooks: (category: number, type: string, order: string) => {
    return instance.get<Array<BookType>>(`books?category=${category}&_sort=${type}&_order=${order}`).then(response => {
      return response.data
    })
  }
}
