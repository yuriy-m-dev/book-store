import { booksAPI } from "../../api/api"
import { AppStateType } from "../store"
import { ThunkAction } from "redux-thunk"
import { Action } from 'redux'

const SET_BOOKS = 'SET_BOOKS'
const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY'
const CLEAR_SEARCH_QUERY = 'CLEAR_SEARCH_QUERY'
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_IS_FETCHING = 'SET_IS_FETCHING'

const initialState = {
  books: null as Array<BookType> | null,
  isFetching: false,
  searchQuery: '',
  currentPage: 1,
  totalCount: 0,
  pageSize: 10
}
type InitialStateType = typeof initialState

const books = (state = initialState, action: ActionTypes): InitialStateType => {
  switch(action.type) {
    case SET_BOOKS:
      return {
        ...state, books: action.payload
      }
    case SET_SEARCH_QUERY:
      return {
        ...state, searchQuery: action.payload
      }
    case CLEAR_SEARCH_QUERY:
      return {
        ...state, searchQuery: ''
      }
    case SET_TOTAL_COUNT:
      return {
        ...state, totalCount: +action.payload
      }
    case SET_CURRENT_PAGE:
      return {
        ...state, currentPage: action.payload
      }
    case SET_IS_FETCHING:
      return {
        ...state, isFetching: action.payload
      }
    default:
      return state
  }
}

const setBooks = (books: Array<BookType>): SetBooksType => ({type: SET_BOOKS, payload: books})
const setTotalCount = (totalCount: number) => ({type: SET_TOTAL_COUNT, payload: totalCount})
const setIsFetching = (bool: boolean) => ({type: SET_IS_FETCHING, payload: bool})
export const setSearchQuery = (query: string): SetSearchQueryType => ({type: SET_SEARCH_QUERY, payload: query})
export const clearSearchQuery = (): ClearSearchQueryType => ({type: CLEAR_SEARCH_QUERY})
export const setCurrentPage = (pageNumber: number): SetCurrentPageType => ({type: SET_CURRENT_PAGE, payload: pageNumber})

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
type SetTotalCountType = {
  type: typeof SET_TOTAL_COUNT,
  payload: number
}
type SetCurrentPageType = {
  type: typeof SET_CURRENT_PAGE
  payload: number
}
type SetIsFetchingType = {
  type: typeof SET_IS_FETCHING
  payload: boolean
}
type ActionTypes = SetBooksType | SetSearchQueryType | ClearSearchQueryType | SetTotalCountType | SetCurrentPageType |SetIsFetchingType

export const getBooks = (category: number | null, type: string, order: string, searchQuery: string, pageNumber: number): ThunkActionType => async dispatch => {
  dispatch(setIsFetching(true))
  const response = await booksAPI.getBooks(category, type, order, searchQuery, pageNumber)
  dispatch(setBooks(response.data))
  dispatch(setIsFetching(false))
  dispatch(setTotalCount(response.headers["x-total-count"]))
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