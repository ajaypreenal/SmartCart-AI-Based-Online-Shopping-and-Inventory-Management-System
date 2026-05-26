import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import Controls from "./components/Controls";
import DAAStats from "./components/DAAStats";
import CartDrawer from "./components/CartDrawer";
import { Loader2 } from "lucide-react";

export default function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [stats, setStats] = useState(null);
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProducts = async (query = "", sortBy = "") => {
    try {
      setLoading(true);
      const url = `http://localhost:5000/api/products?search=${query}${
        sortBy ? `&sortBy=${sortBy}` : ""
      }`;
      const { data } = await axios.get(url);
      if (data.products) {
        setProducts(data.products);
        setStats({
          linear: data.linearResultCount,
          binary: data.binaryResultCount,
          note: data.note
        });
      } else {
        setProducts(data);
        setStats(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts("", sort);
  }, [sort]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts(search, sort);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <CartDrawer />
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-primary-50 via-background to-accent-50 dark:from-primary-900/20 dark:via-dark-background dark:to-accent-900/10 opacity-70"></div>
      
      {/* Decorative Orbs */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary-400/20 blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent-400/20 blur-[120px] pointer-events-none"></div>

      <Header />

      <main className="flex-1 w-full relative z-10">
        {/* Hero Section */}
        <section className="pt-20 pb-24 px-4 text-center">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 text-sm font-semibold tracking-wide uppercase animate-fade-in-up">
            DAA Mini Project
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tight text-text-main dark:text-dark-text-main animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Next-Gen Campus <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-500">Marketplace</span>
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-text-muted dark:text-dark-text-muted mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Experience lightning-fast searches and algorithmic sorting powered by classic Data Structures & Algorithms.
          </p>
        </section>

        {/* Controls Container */}
        <div className="px-4">
          <Controls 
            search={search} 
            setSearch={setSearch} 
            sort={sort} 
            setSort={setSort} 
            handleSearch={handleSearch} 
          />
          <DAAStats stats={stats} />
        </div>

        {/* Product Grid */}
        <section className="container mx-auto px-4 py-16 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-10 h-10 text-primary-500 animate-spin mb-4" />
              <p className="text-text-muted font-medium">Running algorithms...</p>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 glass-panel rounded-2xl max-w-2xl mx-auto">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2">No products found</h3>
              <p className="text-text-muted">Try adjusting your search terms or filters.</p>
            </div>
          )}
        </section>
      </main>

      <footer className="relative z-10 py-6 border-t border-primary-200 dark:border-primary-800/30 bg-surface/50 dark:bg-dark-surface/50 backdrop-blur-md">
        <div className="container mx-auto px-4 text-center text-sm font-medium text-text-muted dark:text-dark-text-muted">
          SmartCart DAA Project © 2026
        </div>
      </footer>
    </div>
  );
}
