import * as actionTypes from '../actionTypes'

export const Organizations = (state = {
  isLoading: true,
  errMess: null,
  organizations: []
}, action) => {
  switch (action.type) {
    case actionTypes.ADD_ORGS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        organizations: action.payload
      }
    case actionTypes.ORGS_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        organizations: []
      }
    case actionTypes.ORGS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        organizations: []
      }
    default:
      return state
  }
}
