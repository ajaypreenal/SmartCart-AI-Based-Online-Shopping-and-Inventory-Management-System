export const dijkstra = (graph, start) => {
  const distances = {};
  const previous = {};
  const unvisited = new Set();

  for (const node in graph) {
    distances[node] = Infinity;
    previous[node] = null;
    unvisited.add(node);
  }
  
  if (!graph[start]) return { distances: {}, previous: {} };
  
  distances[start] = 0;

  while (unvisited.size > 0) {
    // Find the unvisited node with the smallest distance
    let current = null;
    let minDistance = Infinity;
    for (const node of unvisited) {
      if (distances[node] < minDistance) {
        current = node;
        minDistance = distances[node];
      }
    }

    if (current === null) break; // All remaining unvisited nodes are unreachable

    unvisited.delete(current);

    for (const neighbor of graph[current] || []) {
      const alt = distances[current] + neighbor.weight;
      if (alt < distances[neighbor.to]) {
        distances[neighbor.to] = alt;
        previous[neighbor.to] = current;
      }
    }
  }

  return { distances, previous };
};
