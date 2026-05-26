export const quickSort = (arr, compare) => {
  if (arr.length <= 1) return arr;
  const pivot = arr[arr.length >> 1];
  const left = [];
  const right = [];
  const equal = [];
  for (const item of arr) {
    const cmp = compare(item, pivot);
    if (cmp < 0) left.push(item);
    else if (cmp > 0) right.push(item);
    else equal.push(item);
  }
  return [...quickSort(left, compare), ...equal, ...quickSort(right, compare)];
};
