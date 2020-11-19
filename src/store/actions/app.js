import { appTypes } from './types'

const setAction = (payload) => ({
  type: appTypes.setAction,
  payload,
})

const setDS = (payload) => ({
  type: appTypes.setDS,
  payload,
})

const setAlgorithm = (payload) => ({
  type: appTypes.setAlgorithm,
  payload,
})

const setInApp = (path, data) => ({
  type: appTypes.set,
  payload: {
    path,
    data,
  },
})

export {
  setAction,
  setDS,
  setAlgorithm,
  setInApp,
}
