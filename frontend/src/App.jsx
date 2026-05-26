import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import CartDrawer from "./components/CartDrawer";
import Login from "./pages/Login";
import Marketplace from "./pages/Marketplace";
import Categories from "./pages/Categories";
import DAAAnalytics from "./pages/DAAAnalytics";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background dark:bg-dark-background">
      <CartDrawer />
      
      {/* Global Dynamic Background */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-primary-50 via-background to-accent-50 dark:from-primary-900/20 dark:via-dark-background dark:to-accent-900/10 opacity-70"></div>
      
      {/* Global Decorative Orbs */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary-400/20 blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent-400/20 blur-[120px] pointer-events-none"></div>

      <Header />

      <main className="flex-1 w-full relative z-10 flex flex-col">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/analytics" element={<DAAAnalytics />} />
        </Routes>
      </main>

      {/* Conditionally render footer or keep it global (we can use useLocation in a wrapper component, but simple CSS positioning works for now) */}
      <footer className="relative z-10 py-6 border-t border-primary-200 dark:border-primary-800/30 bg-surface/50 dark:bg-dark-surface/50 backdrop-blur-md mt-auto">
        <div className="container mx-auto px-4 text-center text-sm font-medium text-text-muted dark:text-dark-text-muted">
          SmartCart DAA Project © 2026
        </div>
      </footer>
    </div>
  );
}
