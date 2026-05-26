export const dijkstra = (graph, start) => {
  const distances = {};
  const previous = {};
  const visited = new Set();

  for (const node in graph) {
    distances[node] = Infinity;
    previous[node] = null;
  }
  distances[start] = 0;

  while (Object.keys(distances).length) {
    const current = Object.entries(distances)
      .filter(([node]) => !visited.has(node))
      .sort((a, b) => a[1] - b[1])[0]?.[0];

    if (!current) break;
    visited.add(current);

    for (const neighbor of graph[current] || []) {
      const alt = distances[current] + neighbor.weight;
      if (alt < distances[neighbor.to]) {
        distances[neighbor.to] = alt;
        previous[neighbor.to] = current;
      }
    }

    delete distances[current];
  }
  return { distances, previous };
};
