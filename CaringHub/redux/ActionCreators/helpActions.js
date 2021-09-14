import AsyncStorage from '@react-native-async-storage/async-storage';
import * as actionTypes from '../actionTypes'
import { baseUrl } from '../shared/baseUrl'

export const helpsLoading = () => ({
    type: actionTypes.HELPS_LOADING
});

export const helpsFailed = (errmess) => ({
    type: actionTypes.HELPS_FAILED,
    payload: errmess
});

export const addHelps = (helps) => ({
    type: actionTypes.ADD_HELPS,
    payload: helps
});

export const addHelpItem = (help) => ({
    type: actionTypes.ADD_HELP_ITEM,
    payload: help
});

export const fetchHelps = () => (dispatch) => {
    dispatch(helpsLoading(true))
    return fetch(baseUrl + 'helps')
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
        .then(helps => dispatch(addHelps(helps)))
        .catch(error => dispatch(helpsFailed(error.message)))
}

export const postHelp = (formData) => (dispatch) => {
    const bearer = 'Bearer ' + AsyncStorage.getItem('token')
    return fetch(baseUrl + 'helps', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Authorization': bearer
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
        .then(response => dispatch(addHelpItem(response)))
        .catch(error => alert('HELP REQUEST COULD NOT BE POSTED: ' + error))
}

export const deleteHelp = (helpId) => (dispatch) => {
    const bearer = 'Bearer ' + AsyncStorage.getItem('token')
    return fetch(baseUrl + 'helps/' + helpId, {
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
        .then(response => dispatch(addHelps(response)))
        .catch(error => dispatch(helpsFailed(error)))
}