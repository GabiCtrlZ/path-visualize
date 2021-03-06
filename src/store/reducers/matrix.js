import Immutable from 'seamless-immutable'
import { handleActions } from 'redux-actions'

import { matrixTypes } from '../actions/types'
import { PLAYGROUND_MEASUREMENTS } from '../../consts'
import matrixCloner from '../../lib/matrix-cloner'

const { matrixHeight, matrixWidth } = PLAYGROUND_MEASUREMENTS

const initMatrix = () => {
  const temp = (Array.from({ length: matrixHeight },
    () => Array.from({ length: matrixWidth }, () => 'unvisited')))

  temp[Math.floor(matrixHeight / 4)][Math.floor(matrixWidth / 4)] = 'start'
  temp[Math.floor(matrixHeight / 4)][Math.floor(matrixWidth / 4) * 3] = 'end'

  return Immutable(temp)
}

const initialState = initMatrix()

export default handleActions({
  [matrixTypes.setSquare]: (state, { payload: { pos, type } }) => {
    const toSet = type === 'path' || type === 'visited' ? `${state[pos[0]][pos[1]].split(':')[0]}:${type}` : type
    return state.setIn(pos, toSet)
  },
  [matrixTypes.resetMatrix]: (() => initMatrix()),
  [matrixTypes.clearVisited]: ((state) => Immutable(matrixCloner(state)[0])),
}, initialState)
