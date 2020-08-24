import { booksAPI } from "../../api/api"
import { AppStateType } from "../store"
import { ThunkAction } from "redux-thunk"
import { Action } from 'redux'

const SET_BOOKS = 'SET_BOOKS'

const initialState = {
  books: null as Array<BookType> | null
}
type InitialStateType = typeof initialState

const books = (state = initialState, action: ActionTypes): InitialStateType => {
  switch(action.type) {
    case SET_BOOKS:
      return {
        ...state,
        books: action.payload
      }
    default:
      return state
  }
}

const setBooks = (books: Array<BookType>): SetBooksType => ({type: SET_BOOKS, payload: books})
type SetBooksType = {
  type: typeof SET_BOOKS
  payload: Array<BookType>
}
type ActionTypes = SetBooksType

export const getBooks = (category: number, type: string, order: string): ThunkActionType => async dispatch => {
  const data = await booksAPI.getBooks(category, type, order)
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