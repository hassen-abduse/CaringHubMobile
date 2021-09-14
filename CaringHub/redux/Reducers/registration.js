import * as actionTypes from '../actionTypes'

export const Registration = (state = {
  isLoading: false,
  errMess: null,
  success: false,
  profile: null
}, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true,
        profile: action.profile,
        success: false
      }
    case actionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        errMess: null,
        profile: null
      }
    case actionTypes.SIGNUP_FAILURE:
      return {
        ...state,
        isLoading: false,
        errMess: action.message,
        success: false
      }
    default:
      return state
  }
}
