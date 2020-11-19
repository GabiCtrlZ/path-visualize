import Immutable from 'seamless-immutable'
import { handleActions } from 'redux-actions'

import { matrixTypes } from '../actions/types'
import { PLAYGROUND_MEASUREMENTS } from '../../consts'
import matrixCloner from '../../lib/matrix-cloner'

const { matrixHeight, matrixWidth } = PLAYGROUND_MEASUREMENTS

const initMatrix = () => {
  const temp = (Array.from({ length: matrixHeight * 4 },
    () => Array.from({ length: matrixWidth * 4 }, () => 'unvisited')))

  temp[matrixHeight][matrixWidth] = 'start'
  temp[matrixHeight][matrixWidth * 3] = 'end'

  return Immutable(temp)
}

const initialState = initMatrix()

export default handleActions({
  [matrixTypes.setSquare]: (state, { payload: { pos, type } }) => state.setIn(pos, type),
  [matrixTypes.resetMatrix]: (() => initMatrix()),
  [matrixTypes.clearVisited]: ((state) => Immutable(matrixCloner(state)[0])),
}, initialState)