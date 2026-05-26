import Product from '../models/Product.js';
import Category from '../models/Category.js';
import { Trie } from '../algorithms/trie.js';
import { mergeSort } from '../algorithms/mergeSort.js';
import { quickSort } from '../algorithms/quickSort.js';
import { knapsack } from '../algorithms/knapsack.js';
import { dijkstra } from '../algorithms/dijkstra.js';

const trie = new Trie();

export const initTrie = async () => {
  const products = await Product.find({}, 'name');
  products.forEach(p => trie.insert(p.name));
};

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    trie.insert(product.name);
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const { search, sortBy, order = 'asc', minPrice, maxPrice, category } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (minPrice) filter.price = { ...filter.price, $gte: Number(minPrice) };
    if (maxPrice) filter.price = { ...filter.price, $lte: Number(maxPrice) };

    let products = await Product.find(filter);
    if (search) {
      const linear = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
      const sortedByName = [...products].sort((a, b) => a.name.localeCompare(b.name));
      const binary = binarySearchName(sortedByName, search.toLowerCase());
      return res.json({
        linearResultCount: linear.length,
        binaryResultCount: binary.length,
        products: linear,
        note: 'Linear vs Binary search counts shown for algorithm analysis'
      });
    }

    if (sortBy) {
      const compare = (a, b) => {
        const valA = a[sortBy];
        const valB = b[sortBy];
        if (valA < valB) return order === 'asc' ? -1 : 1;
        if (valA > valB) return order === 'asc' ? 1 : -1;
        return 0;
      };
      products = sortBy === 'price' ? quickSort(products, compare) : mergeSort(products, compare);
    }

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const binarySearchName = (arr, prefix) => {
  let lo = 0, hi = arr.length - 1, results = [];
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    const name = arr[mid].name.toLowerCase();
    if (name.startsWith(prefix)) {
      let l = mid, r = mid;
      while (l >= 0 && arr[l].name.toLowerCase().startsWith(prefix)) l--;
      while (r < arr.length && arr[r].name.toLowerCase().startsWith(prefix)) r++;
      results = arr.slice(l + 1, r);
      break;
    } else if (name < prefix) {
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  return results;
};

export const autocomplete = (req, res) => {
  const { prefix } = req.query;
  if (!prefix) return res.json([]);
  const suggestions = trie.getWordsWithPrefix(prefix);
  res.json(suggestions.slice(0, 10));
};

export const budgetOptimiser = async (req, res) => {
  try {
    const { budget } = req.body;
    const items = await Product.find({}, 'price rating _id');
    const selectedIds = knapsack(
      items.map(p => ({
        price: p.price,
        value: p.rating,
        _id: p._id,
      })),
      budget
    );
    const selectedProducts = await Product.find({ _id: { $in: selectedIds } });
    res.json(selectedProducts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const routeOptimisation = (req, res) => {
  const { graph, start } = req.body;
  if (!graph || !start) return res.status(400).json({ message: 'graph & start required' });
  const result = dijkstra(graph, start);
  res.json(result);
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    await initTrie();
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    await initTrie();
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};
