const {
  REACT_APP_DEVELOPMENT: NODE_ENV,
} = process.env

const LANGS = {
  he: 'he',
  en: 'en',
}

const MAIN_TABS = {
  studentTable: 'studentTable',
  test: 'test',
}

const MARKER = {
  length: 10,
  stroke: 1.7,
}

const GRAPH_RATIOS = {
  width: 0.45,
  height: 0.7,
}

const hexagonSide = 25
const SQUARE_SIDE = 33

const HEXAGON = {
  width: 2 * Math.sqrt((3 * (hexagonSide ** 2)) / 4),
  height: 2 * hexagonSide,
}

const ACTIONS = {
  wall: 'Wall',
  unvisited: 'Eraser',
  weight: 'Weight',
  start: 'Start',
  end: 'Goal',
}

const DATA_STRACTURES = {
  matrix: 'Matrix',
  graph: 'Graph',
}

const PLAYGROUND_MEASUREMENTS = {
  width: window.innerWidth - 48 - 386,
  height: window.innerHeight - 64 - 48,
  matrixHeight: Math.floor((window.innerHeight - 64 - 48) / (SQUARE_SIDE * 4)),
  matrixWidth: Math.floor((window.innerWidth - 48 - 386) / (SQUARE_SIDE * 4)),
}

const ALGORITHMS = {
  BFS: 'Breadth-First Search',
  // Dijkstra: 'Dijkstra',
  // 'A*': 'A-Star',
  'Greedy-BFS': 'Greedy-BFS',
  DFS: 'Depth-First Search',
}

const COLORS = [
  '#7cb9e8',
  '#c9ffe5',
  '#eedfcd',
  '#f19bbb',
  '#f9d15b',
  '#cd9575',
  '#7fffd5',
  '#d0ff16',
  '#ff9866',
  '#f5c2c2',
  '#9f8170',
  '#c76875',
  '#a2a2d1',
  '#f0dc82',
  '#a3c1ad',
  '#64a0a0',
  '#42775d',
  '#e66771',
  '#c5cbe1',
  '#917896',
]

export {
  LANGS,
  COLORS,
  NODE_ENV,
  GRAPH_RATIOS,
  MAIN_TABS,
  MARKER,
  HEXAGON,
  ACTIONS,
  DATA_STRACTURES,
  ALGORITHMS,
  PLAYGROUND_MEASUREMENTS,
  SQUARE_SIDE,
}
