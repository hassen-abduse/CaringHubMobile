import * as actionTypes from '../actionTypes'

export const netRequest = (data) => {
    return {
      type: actionTypes.NET_REQUEST_LOADING,
      data
    }
  }
  
  export const receivedResponse = () => {
    return {
      type: actionTypes.NET_REQUEST_SUCCESS,
      success: true  
    }
  }
  export const receiveError = (message) => {
    return {
      type: actionTypes.NET_REQUEST_FAILED,
      errMess: message
    }
  }