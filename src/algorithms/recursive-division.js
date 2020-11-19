/* eslint-disable no-param-reassign */
/* eslint-disable no-await-in-loop */
import { get } from 'lodash'
import { setMatrixSquare } from '../store/actions/matrix'
import store from '../store/store'
import matrixCloner from '../lib/matrix-cloner'
import randomRange from '../lib/random-range'
import { setInApp } from '../store/actions/app'

const wallDelay = 4

const createChambers = async ([sx, sy], [ex, ey], matrix, wall) => {
  const height = ex - sx // 3
  const width = ey - sy // 3

  if ((height) >= 3 && height > width) {
    let horizontal = randomRange(sx + 1, ex - 1)
    let emptyIndex = randomRange(sy, ey)
    if (matrix[horizontal][sy - 1] === 'unvisited' && matrix[horizontal][ey + 1] === 'unvisited') {
      horizontal += 1
    }
    else if (matrix[horizontal][sy - 1] === 'unvisited') {
      emptyIndex = sy
    }
    else if (matrix[horizontal][ey + 1] === 'unvisited') {
      emptyIndex = ey
    }
    for (let i = sy; i <= ey; i++) {
      if (i !== emptyIndex && matrix[horizontal][i] === 'unvisited') {
        matrix[horizontal][i] = 'wall'
        wall.push([horizontal, i])
      }
    }
    createChambers([sx, sy], [horizontal - 1, ey], matrix, wall)
    createChambers([horizontal + 1, sy], [ex, ey], matrix, wall)
  }
  else if (width >= 3) {
    let vertical = randomRange(sy + 1, ey - 1)
    let emptyIndex = randomRange(sx, ex)
    if (matrix[sx - 1][vertical] === 'unvisited' && matrix[ex + 1][vertical] === 'unvisited') {
      vertical += 1
    }
    else if (matrix[sx - 1][vertical] === 'unvisited') {
      emptyIndex = sx
    }
    else if (matrix[ex + 1][vertical] === 'unvisited') {
      emptyIndex = ex
    }
    for (let i = sx; i <= ex; i++) {
      if (i !== emptyIndex && matrix[i][vertical] === 'unvisited') {
        matrix[i][vertical] = 'wall'
        wall.push([i, vertical])
      }
    }
    createChambers([sx, sy], [ex, vertical - 1], matrix, wall)
    createChambers([sx, vertical + 1], [ex, ey], matrix, wall)
  }
}

// maybe I dont need the matrix copy?
export default async (setCreatingMaze) => {
  const { matrix } = store.getState()
  const wall = []

  const [matrixCopy] = matrixCloner(matrix)

  // first we need to make all the bounderis walls
  const height = matrixCopy.length
  const width = get(matrixCopy, '0', []).length

  for (let i = 0; i < height; i++) {
    matrixCopy[i][0] = 'wall'
    matrixCopy[i][width - 1] = 'wall'
    wall.push([i, 0])
    wall.push([i, width - 1])
  }

  for (let i = 0; i < width; i++) {
    matrixCopy[0][i] = 'wall'
    matrixCopy[height - 1][i] = 'wall'
    wall.push([0, i])
    wall.push([height - 1, i])
  }
  createChambers([1, 1], [height - 2, width - 2], matrixCopy, wall)

  wall.forEach((node, i) => {
    setTimeout(() => {
      store.dispatch(setMatrixSquare(node, 'wall'))
    }, i * wallDelay)
  })
  setTimeout(() => {
    store.dispatch(setInApp('isAlgorithmRunning', false))
    setCreatingMaze(false)
  }, wall.length * wallDelay)
}
