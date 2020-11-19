/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-loop-func */
import { get } from 'lodash'
import { setInApp } from '../store/actions/app'
import { setMatrixSquare } from '../store/actions/matrix'
import store from '../store/store'
import matrixCloner from '../lib/matrix-cloner'
import pq from '../lib/priority-queue'

const visitedDelay = 4
const pathDelay = 100

const vectors = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
]

export default async () => {
  const { app: { start, end }, matrix } = store.getState()
  const [ex, ey] = end

  const cf = (p1, p2) => {
    // custom compare function, using euclidian dist

    if (!p1) return true
    if (!p2) return true
    const [x1, y1] = p1
    const [x2, y2] = p2
    return -(((x1 - ex) ** 2) + ((y1 - ey) ** 2)) >= -(((x2 - ex) ** 2) + ((y2 - ey) ** 2))
  }

  const q = pq(start, cf)

  const visited = []
  const queue = []
  const path = []

  const [matrixCopy, p] = matrixCloner(matrix)

  let found = false

  while (q.length && !found) {
    const { app: { isAlgorithmRunning } } = store.getState()
    if (!isAlgorithmRunning) {
      store.dispatch(setInApp('isAlgorithmFinished', true))
      return store.dispatch(setInApp('isAlgorithmRunning', false))
    }
    const [x, y] = q.pop(q)
    visited.push([x, y])

    for (const [vx, vy] of vectors) {
      const nx = x + vx
      const ny = y + vy
      const neighbor = get(matrixCopy, [nx, ny], '')
      if (neighbor === 'unvisited') {
        q.insert(q, [nx, ny])
        p[nx][ny] = [x, y]
        matrixCopy[nx][ny] = 'visited'
        queue.push([nx, ny])
      }
      if (nx === ex && ny === ey) {
        p[nx][ny] = [x, y]
        found = true
      }
    }
  }

  visited.slice(1).forEach((node, i) => {
    setTimeout(() => {
      store.dispatch(setMatrixSquare(node, 'visited'))
    }, i * visitedDelay)
  })

  if (!found) {
    setTimeout(() => {
      store.dispatch(setInApp('isAlgorithmFinished', true))
      store.dispatch(setInApp('isAlgorithmRunning', false))
    }, visited.length * visitedDelay)
    return
  }

  let [sx, sy] = get(p, end, [0, 0])

  while ((sx !== start[0]) || (sy !== start[1])) {
    path.push([sx, sy])
    const parent = get(p, [sx, sy], null)
    if (!parent) break
    sx = parent[0]
    sy = parent[1]
  }
  path.reverse().forEach((node, i) => {
    setTimeout(() => {
      store.dispatch(setMatrixSquare(node, 'path'))
    }, (visited.length * visitedDelay) + (i * pathDelay))
  })

  setTimeout(() => {
    store.dispatch(setInApp('isAlgorithmFinished', true))
    store.dispatch(setInApp('isAlgorithmRunning', false))
  }, (visited.length * visitedDelay) + (path.length * pathDelay))
}
