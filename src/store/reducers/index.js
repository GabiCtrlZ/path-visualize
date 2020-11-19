import { combineReducers } from 'redux'
import { appTypes } from '../actions/types'
import app from './app'
import matrix from './matrix'

const reducers = combineReducers({
  app,
  matrix,
})

export default (state, action) => {
  if (action.type === appTypes.backToState) return action.state
  return reducers(state, action)
}
