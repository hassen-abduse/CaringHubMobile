import AsyncStorage from '@react-native-async-storage/async-storage';
import * as actionTypes from '../actionTypes'
import { baseUrl } from '../shared/baseUrl'

export const volsLoading = () => ({
    type: actionTypes.VOLUNTEERS_LOADING
});

export const volsFailed = (errmess) => ({
    type: actionTypes.VOLUNTEERS_FAILED,
    payload: errmess
});

export const addVols = (vols) => ({
    type: actionTypes.ADD_VOLUNTEERS,
    payload: vols
});

export const fetchVolunteers = () => (dispatch) => {
    dispatch(volsLoading(true))
    return fetch(baseUrl + 'volunteers')
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
        .then(volunteers => dispatch(addVols(volunteers)))
        .catch(error => dispatch(volsFailed(error.message)))
}

export const deleteVolunteer = (volId) => (dispatch) => {
    const bearer = 'Bearer ' + AsyncStorage.getItem('token')
    return fetch(baseUrl + 'volunteers/' + volId, {
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
        .then(response => dispatch(addVols(response)))
        .catch(error => dispatch(volsFailed(error)))
}
