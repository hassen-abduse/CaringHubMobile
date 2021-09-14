import * as actionTypes from '../actionTypes'

export const Applications = (state = {
  isLoading: true,
  errMess: null,
  applications: []
}, action) => {
  switch (action.type) {
    case actionTypes.APPS_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        applications: []
      }
    case actionTypes.ADD_APPS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        applications: action.payload
      }
    case actionTypes.APPS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        applications: []
      }
    case actionTypes.ADD_APP_ITEM:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        applications: state.applications.concat(action.payload)
      }
    default:
      return state
  }
}
