import { matrixTypes } from './types'

const setMatrixSquare = (pos, type) => ({
  type: matrixTypes.setSquare,
  payload: {
    pos,
    type,
  },
})

const resetMatrix = () => ({
  type: matrixTypes.resetMatrix,
})

const clearVisited = () => ({
  type: matrixTypes.clearVisited,
})

export {
  setMatrixSquare,
  resetMatrix,
  clearVisited,
}
