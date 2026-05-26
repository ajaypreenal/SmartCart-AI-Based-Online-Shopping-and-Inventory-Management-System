import { useEffect, useState } from "react";
import { ShoppingCart, Moon, Sun, LogOut } from "lucide-react";
import { useCart } from "../context/CartContext";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const { cart, setIsCartOpen } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  // Don't show header on login page
  if (location.pathname === '/') return null;

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b-0">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary-500 p-2 rounded-lg relative cursor-pointer" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart className="w-6 h-6 text-white" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-gray-900">
                {cart.length}
              </span>
            )}
          </div>
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
            SmartCart
          </h1>
        </div>
        
        <nav className="hidden md:flex gap-6 font-medium text-text-muted dark:text-dark-text-muted">
          <NavLink 
            to="/marketplace" 
            className={({ isActive }) => `transition ${isActive ? 'text-primary-600 dark:text-primary-400 font-bold' : 'hover:text-primary-600 dark:hover:text-primary-400'}`}
          >
            Marketplace
          </NavLink>
          <NavLink 
            to="/categories" 
            className={({ isActive }) => `transition ${isActive ? 'text-primary-600 dark:text-primary-400 font-bold' : 'hover:text-primary-600 dark:hover:text-primary-400'}`}
          >
            Categories
          </NavLink>
          <NavLink 
            to="/analytics" 
            className={({ isActive }) => `transition ${isActive ? 'text-primary-600 dark:text-primary-400 font-bold' : 'hover:text-primary-600 dark:hover:text-primary-400'}`}
          >
            DAA Analytics
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-full hover:bg-primary-100 dark:hover:bg-dark-surface transition"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun className="w-5 h-5 text-accent-400" /> : <Moon className="w-5 h-5 text-primary-600" />}
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-full hover:bg-red-100 text-red-500 transition ml-2"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
