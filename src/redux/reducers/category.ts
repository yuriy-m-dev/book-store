const SET_ACTIVE_CATEGORY = 'SET_ACTIVE_CATEGORY'

const initialState = {
  categories: ['Cooking', 'Education', 'Fiction', 'Computers', 'Mathematics'] as Array<string>,
  activeCategory: null as number | null
}

type InitialStateType = typeof initialState

const category = (state = initialState, action: ActionsType): InitialStateType => {
  switch(action.type) {
    case SET_ACTIVE_CATEGORY:
      return {
        ...state,
        activeCategory: action.payload
      }
    default:
      return state
  }
}

export const setActiveCategory = (index: number | null): SetActiveCategoryType => ({type: SET_ACTIVE_CATEGORY, payload: index})
type SetActiveCategoryType = {
  type: typeof SET_ACTIVE_CATEGORY
  payload: number | null
}
type ActionsType = SetActiveCategoryType

export default category