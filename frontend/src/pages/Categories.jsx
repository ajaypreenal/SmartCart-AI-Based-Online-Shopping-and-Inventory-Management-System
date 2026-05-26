import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { Loader2, Tags } from "lucide-react";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We fetch categories (we don't have a direct category route, so we fetch all products and extract unique categories)
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`http://localhost:5000/api/products`);
        const allProducts = data.products || data || [];
        
        // Extract unique categories from populated product data
        const uniqueCatsMap = new Map();
        allProducts.forEach(p => {
          if (p.category && p.category._id) {
            uniqueCatsMap.set(p.category._id, p.category);
          } else if (p.category) {
            // fallback if it's just a string/id
            uniqueCatsMap.set(p.category, { _id: p.category, name: p.category });
          }
        });
        
        const formattedCats = Array.from(uniqueCatsMap.values());
        
        setCategories(formattedCats);
        
        if (formattedCats.length > 0) {
          setSelectedCategory(formattedCats[0]._id);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;
    
    const fetchProductsByCategory = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`http://localhost:5000/api/products`);
        const allProducts = data.products || data || [];
        // Filter by category
        const filtered = allProducts.filter(p => 
          (p.category && p.category._id === selectedCategory) || 
          (p.category === selectedCategory)
        );
        setProducts(filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [selectedCategory]);

  return (
    <div className="w-full relative z-10 animate-fade-in-up container mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-8 border-b border-primary-200 dark:border-primary-800 pb-4">
        <Tags className="w-8 h-8 text-primary-500" />
        <h1 className="text-4xl font-black text-text-main dark:text-dark-text-main">Browse Categories</h1>
      </div>

      <div className="flex flex-wrap gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => setSelectedCategory(cat._id)}
            className={`px-6 py-3 rounded-xl font-bold transition-all shadow-md ${
              selectedCategory === cat._id
                ? "bg-primary-600 text-white shadow-primary-600/30 scale-105"
                : "bg-surface dark:bg-dark-surface text-text-muted hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <section className="animate-fade-in-up">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-primary-500 animate-spin mb-4" />
            <p className="text-text-muted font-medium">Loading products...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 glass-panel rounded-2xl max-w-2xl mx-auto">
            <div className="text-5xl mb-4">📭</div>
            <h3 className="text-xl font-bold mb-2">No products in this category</h3>
          </div>
        )}
      </section>
    </div>
  );
}
