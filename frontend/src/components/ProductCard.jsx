import { Star, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart, setIsCartOpen } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    setIsCartOpen(true);
  };

  return (
    <div className="group glass-panel rounded-2xl p-5 hover:-translate-y-1 transition-all duration-300 hover:shadow-2xl flex flex-col h-full">
      <div className="relative w-full h-48 bg-primary-100 dark:bg-primary-900/30 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
        {/* Placeholder for product image */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-200/50 to-transparent dark:from-primary-800/50 mix-blend-overlay"></div>
        <ShoppingBag className="w-16 h-16 text-primary-300 dark:text-primary-700 opacity-50 group-hover:scale-110 transition-transform duration-500" />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-white/80 dark:bg-black/50 backdrop-blur-md px-2 py-1 rounded text-xs font-semibold text-primary-700 dark:text-primary-300">
          Stock: {product.stock}
        </div>
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between items-start gap-2 mb-2">
          <h2 className="font-bold text-lg leading-tight line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {product.name}
          </h2>
          <div className="flex items-center gap-1 bg-accent-100 dark:bg-accent-900/40 text-accent-700 dark:text-accent-400 px-2 py-0.5 rounded-full text-sm font-medium shrink-0">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{product.rating}</span>
          </div>
        </div>
        
        <p className="text-sm text-text-muted dark:text-dark-text-muted line-clamp-2 mb-4">
          {product.description}
        </p>
      </div>

      <div className="flex justify-between items-end mt-auto pt-4 border-t border-primary-100 dark:border-primary-800/30">
        <div>
          <span className="text-xs text-text-muted dark:text-dark-text-muted">Price</span>
          <p className="text-2xl font-black text-primary-700 dark:text-primary-300">₹{product.price.toLocaleString()}</p>
        </div>
        <button 
          onClick={handleAddToCart}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-primary-600/30 hover:shadow-primary-600/50"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
