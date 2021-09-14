import SyncStorage from 'sync-storage';
import * as actionTypes from '../actionTypes'
import { baseUrl } from '../shared/baseUrl'
import { netRequest, receivedResponse, receiveError } from './NetActions';

export const appsLoading = () => ({
    type: actionTypes.APPS_LOADING
});

export const appsFailed = (errmess) => ({
    type: actionTypes.APPS_FAILED,
    payload: errmess
});

export const addApps = (apps) => ({
    type: actionTypes.ADD_APPS,
    payload: apps
});

export const addAppItem = (app) => ({
    type: actionTypes.ADD_APP_ITEM,
    payload: app
});

export const fetchApplications = () => (dispatch) => {
    dispatch(appsLoading(true))
    return fetch(baseUrl + 'applications')
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
        .then(apps => dispatch(addApps(apps)))
        .catch(error => dispatch(appsFailed(error.message)))
}

export const postApplication = (formData) => (dispatch) => {
    dispatch(netRequest(formData))
    const bearer = 'Bearer ' + SyncStorage.get('token')
    return fetch(baseUrl + 'applications', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type':'application/json',
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
        .then(response => {
            dispatch(addAppItem(response.app))
            dispatch(receivedResponse())
        })
        .catch(error => dispatch(receiveError(error.message)))
}

export const deleteApplication = (appId) => (dispatch) => {
    const bearer = 'Bearer ' + SyncStorage.get('token')
    return fetch(baseUrl + 'applications/' + appId, {
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
        .then(response => dispatch(addApps(response)))
        .catch(error => dispatch(appsFailed(error)))
}

