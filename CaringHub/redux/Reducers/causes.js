import * as actionTypes from '../actionTypes'

export const Causes = (state = {
  isLoading: true,
  errMess: null,
  causes: []
}, action) => {
  switch (action.type) {
    case actionTypes.CAUSES_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        causes: []
      }
    case actionTypes.ADD_CAUSES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        causes: action.payload
      }
    case actionTypes.CAUSES_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        causes: []
      }
    case actionTypes.ADD_CAUSE_ITEM:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        causes: state.causes.concat(action.payload)
      }
    default:
      return state
  }
}
