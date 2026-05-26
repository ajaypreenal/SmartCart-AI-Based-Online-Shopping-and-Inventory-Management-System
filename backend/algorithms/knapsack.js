export const knapsack = (items, capacity) => {
  const n = items.length;
  const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    const { price, value } = items[i - 1];
    for (let w = 0; w <= capacity; w++) {
      if (price > w) dp[i][w] = dp[i - 1][w];
      else dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - price] + value);
    }
  }

  // backtrack to retrieve selected items
  const selected = [];
  let w = capacity;
  for (let i = n; i > 0; i--) {
    if (dp[i][w] !== dp[i - 1][w]) {
      selected.push(items[i - 1]._id);
      w -= items[i - 1].price;
    }
  }
  return selected;
};
