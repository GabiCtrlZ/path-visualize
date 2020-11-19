import Immutable from 'seamless-immutable'
import { handleActions } from 'redux-actions'

import { appTypes, matrixTypes } from '../actions/types'
import { DATA_STRACTURES, PLAYGROUND_MEASUREMENTS } from '../../consts'

const { matrixHeight, matrixWidth } = PLAYGROUND_MEASUREMENTS

const initialState = Immutable({
  dataStracture: DATA_STRACTURES.matrix,
  action: 'wall',
  algorithm: 'BFS',
  start: [matrixHeight, matrixWidth],
  end: [matrixHeight, matrixWidth * 3],
  isAlgorithmRunning: false,
  isAlgorithmFinished: false,
})

export default handleActions({
  [appTypes.setAction]: (state, { payload }) => state.set('action', payload),
  [appTypes.setDS]: (state, { payload }) => state.set('dataStracture', payload),
  [appTypes.setAlgorithm]: (state, { payload }) => state.set('algorithm', payload),
  [appTypes.set]: (state, { payload: { path, data } }) => state.set(path, data),
  [matrixTypes.resetMatrix]: (state) => state
    .set('start', [matrixHeight, matrixWidth])
    .set('end', [matrixHeight, matrixWidth * 3]),
}, initialState)
