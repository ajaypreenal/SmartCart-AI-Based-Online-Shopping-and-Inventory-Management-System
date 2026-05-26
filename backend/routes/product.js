import express from 'express';
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  autocomplete,
  budgetOptimiser,
  routeOptimisation,
  initTrie,
} from '../controllers/productController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/autocomplete', autocomplete);
router.post('/budget-optimiser', budgetOptimiser);

router.post('/', protect, adminOnly, createProduct);
router.put('/:id', protect, adminOnly, updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);
router.post('/route-optimisation', routeOptimisation);

router.get('/init-trie', protect, adminOnly, async (req, res) => {
  await initTrie();
  res.json({ message: 'Trie rebuilt' });
});

export default router;
