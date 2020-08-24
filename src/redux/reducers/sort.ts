const SET_SORT_BY = 'SET_SORT_BY'

const initialState = {
  sortData: [
    { id: 0, name: 'Popular', type: 'rating', order: 'asc' },
    { id: 1, name: 'Price: Low to High', type: 'price', order: 'asc' },
    { id: 2, name: 'Price: High to Low', type: 'price', order: 'desc' },
    { id: 3, name: 'Name', type: 'name', order: 'asc' }
  ] as Array<SortDataType>,
  sortBy: {
    sortType: 'rating',
    sortOrder: 'asc'
  } as SortByType
}

type SortDataType = {
  id: number
  name: string
  type: string
  order: string
}
type SortByType = {
  sortType: string
  sortOrder: string
}
type InitialStateType = typeof initialState

const sort = (state = initialState, action: ActionsType): InitialStateType => {
  switch(action.type) {
    case SET_SORT_BY:
      return {
        ...state,
        sortBy: {
          ...state.sortBy,
          sortType: action.payload.type,
          sortOrder: action.payload.order
        }
      }
    default:
      return state
  }
}

export const setSortBy = (type: string, order: string): SetSortByType => ({type: SET_SORT_BY, payload: {type, order}})
type SetSortByType = {
  type: typeof SET_SORT_BY
  payload: {
    type: string
    order: string
  }
}

type ActionsType = SetSortByType 
export default sort