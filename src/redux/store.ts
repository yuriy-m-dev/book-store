import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import books from './reducers/books'
import thunk from 'redux-thunk'
import category from './reducers/category'
import sort from './reducers/sort'
import cart from './reducers/cart'

const rootReducer = combineReducers({
  books,
  category,
  sort,
  cart
})

export type AppStateType = ReturnType<typeof rootReducer>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export default store