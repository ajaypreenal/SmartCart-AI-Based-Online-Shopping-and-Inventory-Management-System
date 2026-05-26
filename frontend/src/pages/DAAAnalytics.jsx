import React, { useState } from "react";
import axios from "axios";
import { BrainCircuit, Route, DollarSign, Calculator, ArrowRight } from "lucide-react";

export default function DAAAnalytics() {
  const [budget, setBudget] = useState(2000);
  const [knapsackResult, setKnapsackResult] = useState(null);
  const [loadingKnapsack, setLoadingKnapsack] = useState(false);

  const [startNode, setStartNode] = useState('Warehouse');
  const [endNode, setEndNode] = useState('Library');
  const [routeResult, setRouteResult] = useState(null);
  const [loadingRoute, setLoadingRoute] = useState(false);

  const runKnapsack = async () => {
    try {
      setLoadingKnapsack(true);
      const { data } = await axios.post(`http://localhost:5000/api/products/budget-optimiser`, {
        budget: Number(budget)
      });
      setKnapsackResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingKnapsack(false);
    }
  };

  // Mock Campus Graph
  const campusGraph = {
    'Warehouse': [{to: 'Library', weight: 5}, {to: 'Cafeteria', weight: 2}],
    'Library': [{to: 'Warehouse', weight: 5}, {to: 'Dorms', weight: 3}, {to: 'Engineering', weight: 4}],
    'Cafeteria': [{to: 'Warehouse', weight: 2}, {to: 'Dorms', weight: 6}],
    'Dorms': [{to: 'Library', weight: 3}, {to: 'Cafeteria', weight: 6}, {to: 'Engineering', weight: 2}],
    'Engineering': [{to: 'Library', weight: 4}, {to: 'Dorms', weight: 2}]
  };
  const nodes = Object.keys(campusGraph);

  const runDijkstra = async () => {
    try {
      setLoadingRoute(true);
      const { data } = await axios.post(`http://localhost:5000/api/products/route-optimisation`, {
        graph: campusGraph,
        start: startNode
      });
      
      // Reconstruct path
      const path = [];
      let current = endNode;
      while (current) {
        path.unshift(current);
        current = data.previous[current];
      }
      
      setRouteResult({
        path: path.length > 1 || startNode === endNode ? path : [],
        distance: data.distances[endNode]
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingRoute(false);
    }
  };

  return (
    <div className="w-full relative z-10 animate-fade-in-up container mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-8 border-b border-primary-200 dark:border-primary-800 pb-4">
        <BrainCircuit className="w-8 h-8 text-primary-500" />
        <h1 className="text-4xl font-black text-text-main dark:text-dark-text-main">Algorithms in Action</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Knapsack Optimizer */}
        <div className="glass-panel p-8 rounded-3xl flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-100 dark:bg-green-900/40 p-2 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold">Knapsack Budget Optimizer</h2>
          </div>
          <p className="text-text-muted mb-6">
            Uses the <strong>0/1 Knapsack dynamic programming algorithm</strong> to find the combination of products that maximizes total rating without exceeding your specific budget.
          </p>

          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2 text-text-muted">Set Your Budget (₹)</label>
              <input
                type="number"
                className="w-full px-4 py-3 rounded-xl bg-surface/50 dark:bg-dark-surface/50 border border-primary-200 dark:border-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={runKnapsack}
                disabled={loadingKnapsack}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2"
              >
                {loadingKnapsack ? "Calculating..." : <><Calculator className="w-5 h-5"/> Optimize</>}
              </button>
            </div>
          </div>

          {knapsackResult && (
            <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800 rounded-2xl p-6 animate-fade-in-up mt-auto">
              <h3 className="font-bold text-lg mb-4 text-primary-700 dark:text-primary-300">Optimal Purchase Strategy:</h3>
              <div className="space-y-3 mb-4">
                {knapsackResult.selectedProducts.map((p, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-white dark:bg-black/20 p-3 rounded-lg">
                    <span className="font-medium text-sm">{p.name}</span>
                    <span className="font-bold text-accent-600 dark:text-accent-400">₹{p.price}</span>
                  </div>
                ))}
                {knapsackResult.selectedProducts.length === 0 && (
                  <p className="text-text-muted text-sm italic">Budget is too low to buy anything.</p>
                )}
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-primary-200 dark:border-primary-800">
                <span className="text-text-muted font-medium">Total Cost:</span>
                <span className="text-xl font-black text-primary-700 dark:text-primary-300">₹{knapsackResult.totalCost}</span>
              </div>
            </div>
          )}
        </div>

        {/* Dijkstra Route Optimizer */}
        <div className="glass-panel p-8 rounded-3xl flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-100 dark:bg-purple-900/40 p-2 rounded-lg">
              <Route className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold">Delivery Route Optimization</h2>
          </div>
          <p className="text-text-muted mb-6">
            Uses <strong>Dijkstra's Shortest Path algorithm</strong> to determine the most efficient delivery routes from the warehouse to various campus locations.
          </p>

          <div className="flex gap-4 mb-6">
             <div className="flex-1">
              <label className="block text-sm font-medium mb-2 text-text-muted">Start Node</label>
              <select
                className="w-full px-4 py-3 rounded-xl bg-surface/50 dark:bg-dark-surface/50 border border-primary-200 dark:border-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={startNode}
                onChange={(e) => setStartNode(e.target.value)}
              >
                {nodes.map(n => <option key={`start-${n}`} value={n}>{n}</option>)}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2 text-text-muted">End Node</label>
              <select
                className="w-full px-4 py-3 rounded-xl bg-surface/50 dark:bg-dark-surface/50 border border-primary-200 dark:border-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={endNode}
                onChange={(e) => setEndNode(e.target.value)}
              >
                {nodes.map(n => <option key={`end-${n}`} value={n}>{n}</option>)}
              </select>
            </div>
          </div>
          
          <button
            onClick={runDijkstra}
            disabled={loadingRoute}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 mb-6"
          >
            {loadingRoute ? "Routing..." : <><Route className="w-5 h-5"/> Find Shortest Path</>}
          </button>

          {routeResult && (
             <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 rounded-2xl p-6 animate-fade-in-up mt-auto">
               <h3 className="font-bold text-lg mb-4 text-purple-700 dark:text-purple-300">Optimal Path Found:</h3>
               
               {routeResult.path.length > 0 ? (
                 <>
                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    {routeResult.path.map((node, i) => (
                      <React.Fragment key={i}>
                        <div className="bg-white dark:bg-black/30 px-3 py-1 rounded border border-purple-200 dark:border-purple-800 font-medium">
                          {node}
                        </div>
                        {i < routeResult.path.length - 1 && (
                          <ArrowRight className="w-4 h-4 text-purple-400" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-purple-200 dark:border-purple-800">
                    <span className="text-text-muted font-medium">Total Distance:</span>
                    <span className="text-xl font-black text-purple-700 dark:text-purple-300">{routeResult.distance} units</span>
                  </div>
                 </>
               ) : (
                 <p className="text-text-muted">No valid path found.</p>
               )}
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
