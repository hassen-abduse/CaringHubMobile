import * as actionTypes from '../actionTypes'

export const Skills = (state = {
  isLoading: true,
  errMess: null,
  skills: []
}, action) => {
  switch (action.type) {
    case actionTypes.SKILLS_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        skills: []
      }
    case actionTypes.ADD_SKILLS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        skills: action.payload
      }
    case actionTypes.SKILLS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        skills: []
      }
    case actionTypes.ADD_SKILL_ITEM:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        skills: state.skills.concat(action.payload)
      }
    default:
      return state
  }
}
