import * as actionTypes from '../actionTypes'

export const Volunteers = (state = {
  isLoading: true,
  errMess: null,
  volunteers: []
}, action) => {
  switch (action.type) {
    case actionTypes.ADD_VOLUNTEERS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        volunteers: action.payload
      }
    case actionTypes.VOLUNTEERS_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        volunteers: []
      }
    case actionTypes.VOLUNTEERS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        volunteers: []
      }
    default:
      return state
  }
}
