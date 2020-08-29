import { BookType } from "./books"

const ADD_BOOK_TO_CART = 'ADD_BOOK_TO_CART'
const REMOVE_BOOK_FROM_CART = 'REMOVE_BOOK_FROM_CART'
const CLEAR_CART = 'CLEAR_CART'
const QTY_UP = 'QTY_UP'
const QTY_DOWN = 'QTY_DOWN'

const initialState = {
  items: {} as any | Object,
  totalCount: 0,
  totalPrice: 0
}

type InitialStateType = typeof initialState

const getTotalPrice = (arr: Array<BookType>): number => {
  return +arr.reduce((sum: number, obj: BookType) => sum + obj.price, 0).toFixed(2)
}

const _get = (obj: any, path: string): number => {
  const [firtsKey, ...keys] = path.split('.')
  return keys.reduce((val: any, key: string) => {
    return val[key]
  }, obj[firtsKey])
}

const getTotalSum = (obj: Object, path: string): number => {
  return Object.values(obj).reduce((sum, obj): number => {
    const value = _get(obj, path)
    return sum + value
  }, 0)
}

const cart = (state = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case ADD_BOOK_TO_CART: {
      const currentBooksItems = !state.items[action.payload.id]
        ? [action.payload]
        : [...state.items[action.payload.id].items, action.payload]

      const newItems = {
        ...state.items,
        [action.payload.id]: {
          ...state.items[action.payload.id],
          items: currentBooksItems,
          totalPrice: getTotalPrice(currentBooksItems)
        }
      }

      const totalCount = getTotalSum(newItems, 'items.length')
      const totalPrice = +getTotalSum(newItems, 'totalPrice').toFixed(2)
      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice
      }
    }
    case CLEAR_CART:
      return {
        ...state,
        items: {},
        totalCount: 0,
        totalPrice: 0
      }
    case REMOVE_BOOK_FROM_CART: {
      const newItems = {
        ...state.items
      }
      delete newItems[action.payload]

      const totalCount = getTotalSum(newItems, 'items.length')
      const totalPrice = +getTotalSum(newItems, 'totalPrice').toFixed(2)

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice
      }
    }
    case QTY_UP: {
      const newObjItems = [...state.items[action.payload].items, state.items[action.payload].items[0]]
      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems)
        }
      }
      const totalCount = getTotalSum(newItems, 'items.length')
      const totalPrice = +getTotalSum(newItems, 'totalPrice').toFixed(2)
      return {
        ...state,
        items: newItems, 
        totalCount,
        totalPrice
      }
    }
    case QTY_DOWN: {
      const oldItems = state.items[action.payload].items
      const newObjItems = oldItems.length > 1 ? state.items[action.payload].items.slice(1) : oldItems
      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems)
        }
      }
      const totalCount = getTotalSum(newItems, 'items.length')
      const totalPrice = +getTotalSum(newItems, 'totalPrice').toFixed(2)
      
      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice
      }
    }
    default:
      return state
  }
}

export const addBookToCart = (obj: BookType): AddBookToCartType => ({ type: ADD_BOOK_TO_CART, payload: obj })
export const removeBookFromCart = (id: number): RemoveBookFromCartType => ({ type: REMOVE_BOOK_FROM_CART, payload: id })
export const clearCart = () => ({ type: CLEAR_CART })
export const qtyUp = (id: number) => ({type: QTY_UP, payload: id})
export const qtyDown = (id: number) => ({type: QTY_DOWN, payload: id})

type AddBookToCartType = {
  type: typeof ADD_BOOK_TO_CART
  payload: BookType
}
type RemoveBookFromCartType = {
  type: typeof REMOVE_BOOK_FROM_CART
  payload: number
}
type ClearCartType = {
  type: typeof CLEAR_CART
}
type QtyUpType = {
  type: typeof QTY_UP
  payload: number
}
type QtyDownType = {
  type: typeof QTY_DOWN
  payload: number
}
type ActionTypes = AddBookToCartType | RemoveBookFromCartType | ClearCartType | QtyUpType | QtyDownType

export default cart