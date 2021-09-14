import AsyncStorage from '@react-native-async-storage/async-storage';
import * as actionTypes from '../actionTypes'
import { baseUrl } from '../shared/baseUrl'

export const usersLoading = () => ({
    type: actionTypes.USERS_LOADING
});

export const usersFailed = (errmess) => ({
    type: actionTypes.USERS_FAILED,
    payload: errmess
});

export const addUsers = (users) => ({
    type: actionTypes.ADD_USERS,
    payload: users
});

export const fetchUsers = () => (dispatch) => {
    dispatch(usersLoading(true))
    return fetch(baseUrl + 'users')
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
        .then(users => dispatch(addUsers(users)))
        .catch(error => dispatch(usersFailed(error.message)))
}

export const deleteUser = (userId) => (dispatch) => {
    const bearer = 'Bearer ' + AsyncStorage.getItem('token')
    return fetch(baseUrl + 'users/' + userId, {
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
        .then(response => dispatch(addUsers(response)))
        .catch(error => dispatch(usersFailed(error)))
}
