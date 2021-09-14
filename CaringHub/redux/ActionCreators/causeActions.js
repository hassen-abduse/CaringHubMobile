import AsyncStorage from '@react-native-async-storage/async-storage';
import * as actionTypes from '../actionTypes'
import { baseUrl } from '../shared/baseUrl'
import { netRequest, receivedResponse, receiveError } from './NetActions';

export const causesLoading = () => ({
    type: actionTypes.CAUSES_LOADING
});

export const causesFailed = (errmess) => ({
    type: actionTypes.CAUSES_FAILED,
    payload: errmess
});

export const addCauses = (causes) => ({
    type: actionTypes.ADD_CAUSES,
    payload: causes
});

export const addCauseItem = (cause) => ({
    type: actionTypes.ADD_CAUSE_ITEM,
    payload: cause
});

export const fetchCauses = () => (dispatch) => {
    dispatch(causesLoading(true))
    return fetch(baseUrl + 'causes')
        .then(response => {
            if (response.ok) {
                return response
            } else {
                const error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response
                throw error
            }
        },
            error => {
                const errMess = new Error(error.message)
                throw errMess
            })
        .then(response => response.json())
        .then(causes => dispatch(addCauses(causes)))
        .catch(error => dispatch(causesFailed(error.message)))
}

export const postCause = (formData) => (dispatch) => {
    dispatch(netRequest(formData))
    //const bearer = 'Bearer ' + AsyncStorage.getItem('token')
    return fetch(baseUrl + 'causes', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            //'Authorization': bearer
            'Content-Type': 'application/json'
        }

    })
        .then(response => {
            if (response.ok) {
                return response
            }
            else {
                const error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response
                throw error
            }
        },
            error => {
                const errMess = new Error(error.message)
                throw errMess
            })
        .then(response => response.json())
        .then(response => {

            dispatch(addCauseItem(response))
            dispatch(receivedResponse(response))}
        )
        .catch(error => dispatch(receiveError(error.message)))
}

export const deleteCause = (causeId) => (dispatch) => {
    const bearer = 'Bearer ' + AsyncStorage.getItem('token')
    return fetch(baseUrl + 'causes/' + causeId, {
        method: 'DELETE',
        headers: {
            'Authorization': bearer
        }
    })
        .then(response => {
            if (response.ok) {
                return response
            } else {
                const error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response
                throw error
            }
        }, error => {
            throw error
        })
        .then(response => response.json())
        .then(response => dispatch(addCauses(response)))
        .catch(error => dispatch(causesFailed(error)))
}