export default (matrix) => {
  const matrixCopy = []
  const p = []
  for (let i = 0; i < matrix.length; i++) { // super complex way of copying the matrix
    matrixCopy[i] = []
    p[i] = []
    for (let j = 0; j < matrix[0].length; j++) {
      matrixCopy[i][j] = matrix[i][j] === 'path' || matrix[i][j] === 'visited' ? 'unvisited' : matrix[i][j]
      p[i][j] = ''
    }
  }
  return [matrixCopy, p]
}
