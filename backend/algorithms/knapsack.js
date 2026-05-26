export const knapsack = (items, capacity) => {
  // Clamp capacity to prevent Out Of Memory crashes if user inputs massive budget
  let maxW = Math.min(Math.floor(capacity), 100000); 
  const n = items.length;
  const dp = Array.from({ length: n + 1 }, () => Array(maxW + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    const price = Math.round(items[i - 1].price);
    const value = items[i - 1].value;
    
    for (let w = 0; w <= maxW; w++) {
      if (price > w) {
        dp[i][w] = dp[i - 1][w];
      } else {
        dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - price] + value);
      }
    }
  }

  // backtrack to retrieve selected items
  const selected = [];
  let w = maxW;
  for (let i = n; i > 0; i--) {
    const price = Math.round(items[i - 1].price);
    if (dp[i][w] !== dp[i - 1][w]) {
      selected.push(items[i - 1]._id);
      w -= price;
    }
  }
  return selected;
};
