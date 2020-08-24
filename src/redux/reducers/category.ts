const SET_ACTIVE_CATEGORY = 'SET_ACTIVE_CATEGORY'

const initialState = {
  categories: ['Cooking', 'Education', 'Fiction', 'Computers', 'Mathematics', 'Medical', 'Reference', 'Science'] as Array<string>,
  activeCategory: 0
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

export const setActiveCategory = (index: number): SetActiveCategoryType => ({type: SET_ACTIVE_CATEGORY, payload: index})
type SetActiveCategoryType = {
  type: typeof SET_ACTIVE_CATEGORY
  payload: number
}
type ActionsType = SetActiveCategoryType

export default category