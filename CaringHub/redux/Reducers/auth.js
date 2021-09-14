import SyncStorage from 'sync-storage';
import * as ActionTypes from '../actionTypes'
import { storeObjectData, storeStringData, getObjectData, getStringData, getMyStringValue } from '../asyncStorage'

// The auth reducer. The starting state sets authentication
// based on a token being in local storage.

export const Auth = (state = {
  isLoading: false,
  isAuthenticated: SyncStorage.get('token') ? true : false,
  token: SyncStorage.get('token'),
  user: SyncStorage.get('creds')
}, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
        user: action.creds,
        errMess:null

      }
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        errMess: null,
        token: action.token,
      }
    case ActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        errMess: action.message
      }
    case ActionTypes.LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: true
      }
    case ActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        token: '',
        user: null

      }
    default:
      return state
  }
}
