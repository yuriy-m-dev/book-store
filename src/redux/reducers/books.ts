import { booksAPI } from "../../api/api"
import { AppStateType } from "../store"
import { ThunkAction } from "redux-thunk"
import { Action } from 'redux'

const SET_BOOKS = 'SET_BOOKS'
const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY'
const CLEAR_SEARCH_QUERY = 'CLEAR_SEARCH_QUERY'

const initialState = {
  books: null as Array<BookType> | null,
  searchQuery: ''
}
type InitialStateType = typeof initialState

const books = (state = initialState, action: ActionTypes): InitialStateType => {
  switch(action.type) {
    case SET_BOOKS:
      return {
        ...state,
        books: action.payload
      }
    case SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload
      }
    case CLEAR_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: ''
      }
    default:
      return state
  }
}

const setBooks = (books: Array<BookType>): SetBooksType => ({type: SET_BOOKS, payload: books})
export const setSearchQuery = (query: string): SetSearchQueryType => ({type: SET_SEARCH_QUERY, payload: query})
export const clearSearchQuery = (): ClearSearchQueryType => ({type: CLEAR_SEARCH_QUERY})
type SetBooksType = {
  type: typeof SET_BOOKS
  payload: Array<BookType>
}
type SetSearchQueryType = {
  type: typeof SET_SEARCH_QUERY
  payload: string
}
type ClearSearchQueryType = {
  type: typeof CLEAR_SEARCH_QUERY
}
type ActionTypes = SetBooksType | SetSearchQueryType | ClearSearchQueryType

export const getBooks = (category: number | null, type: string, order: string, searchQuery: string): ThunkActionType => async dispatch => {
  const data = await booksAPI.getBooks(category, type, order, searchQuery)
  dispatch(setBooks(data))
}

export default books

type ThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes | Action>
export type BookType = {
  id: number
  imageUrl: string
  name: string
  price: number
  category: number
  rating: number
}