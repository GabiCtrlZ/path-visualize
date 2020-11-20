import BFS from './bfs'
import DFS from './dfs'
import recursiveDivision from './recursive-division'
import greedyBfs from './greedy-bfs'
import Dijkstra from './dijkstra'
import aStar from './a-star'

export default {
  BFS,
  DFS,
  'A*': aStar,
  Dijkstra,
  recursiveDivision,
  'Greedy-BFS': greedyBfs,
}
