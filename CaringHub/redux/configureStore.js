import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { Auth } from './Reducers/auth'
import { Projects } from './Reducers/projects'
import { Volunteers } from './Reducers/volunteers'
import { Organizations } from './Reducers/organizations'
import { Causes } from './Reducers/causes'
import { HelpRequests } from './Reducers/helpRequests'
import { Applications } from './Reducers/applications'
import { Users } from './Reducers/users'
import { Skills } from './Reducers/skills'
import { Registration } from './Reducers/registration'
import { NetRequest } from './Reducers/NetRequest'

export const __store__ = () => {
  const store = createStore(
    combineReducers({
      auth: Auth,
      Projects,
      Volunteers,
      Organizations,
      Applications,
      HelpRequests,
      Users,
      Skills,
      Causes,
      Registration,
      NetRequest
    }),
    // to log state and changes to state by actions
    applyMiddleware(thunk, logger)
  )
  return store
}
