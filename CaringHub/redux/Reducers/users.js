import * as actionTypes from '../actionTypes'

export const Users = (state = {
  isLoading: true,
  errMess: null,
  users: []
}, action) => {
  switch (action.type) {
    case actionTypes.ADD_USERS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        users: action.payload
      }
    case actionTypes.USERS_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        users: []
      }
    case actionTypes.USERS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        users: []
      }
    default:
      return state
  }
}
