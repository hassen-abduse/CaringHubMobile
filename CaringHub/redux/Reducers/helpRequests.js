import * as actionTypes from '../actionTypes'

export const HelpRequests = (state = {
  isLoading: true,
  errMess: null,
  helpRequests: []
}, action) => {
  switch (action.type) {
    case actionTypes.HELPS_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        helpRequests: []
      }
    case actionTypes.ADD_HELPS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        helpRequests: action.payload
      }
    case actionTypes.HELPS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        helpRequests: []
      }
    case actionTypes.ADD_HELP_ITEM:
      return {
        ...state,
        isLoading:false,
        errMess: null,
        helpRequests: state.helpRequests.concat(action.payload)
      }
    default:
      return state
  }
}
