export const mergeSort = (arr, compare) => {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid), compare);
  const right = mergeSort(arr.slice(mid), compare);
  return merge(left, right, compare);
};

const merge = (left, right, compare) => {
  const result = [];
  while (left.length && right.length) {
    if (compare(left[0], right[0]) <= 0) result.push(left.shift());
    else result.push(right.shift());
  }
  return result.concat(left, right);
};
