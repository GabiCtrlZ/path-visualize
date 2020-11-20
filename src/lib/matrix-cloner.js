/* eslint-disable prefer-destructuring */
export default (matrix, weighted = false) => {
  const matrixCopy = []
  const p = []
  for (let i = 0; i < matrix.length; i++) { // super complex way of copying the matrix
    matrixCopy[i] = []
    p[i] = []
    for (let j = 0; j < matrix[0].length; j++) {
      matrixCopy[i][j] = matrix[i][j].split(':')[0]
      p[i][j] = weighted ? [0, 0, Infinity] : ''
    }
  }
  return [matrixCopy, p]
}
