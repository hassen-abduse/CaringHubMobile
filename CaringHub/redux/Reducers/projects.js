import * as actionTypes from '../actionTypes'

export const Projects = (state = {
  isLoading: true,
  errMess: null,
  projects: []
}, action) => {
  switch (action.type) {
    case actionTypes.PROJECTS_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        projects: []
      }
    case actionTypes.ADD_PROJECTS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        projects: action.payload
      }
    case actionTypes.PROJECTS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        projects: []
      }
    case actionTypes.ADD_PROJECT_ITEM:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        projects: state.projects.concat(action.payload)
      }
    default:
      return state
  }
}
