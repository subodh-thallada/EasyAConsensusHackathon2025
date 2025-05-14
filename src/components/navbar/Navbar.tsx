
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 w-full bg-white/80 dark:bg-aptos-dark/80 backdrop-blur-md z-50 py-4 px-6 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-aptos-primary to-aptos-accent flex items-center justify-center">
            <span className="text-white font-bold">A</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-aptos-primary to-aptos-accent bg-clip-text text-transparent">
            AptosTradeFlow
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium hover:text-aptos-primary transition-colors">
            Home
          </Link>
          <Link to="/dashboard" className="text-sm font-medium hover:text-aptos-primary transition-colors">
            Dashboard
          </Link>
          <div className="relative group">
            <button className="flex items-center text-sm font-medium hover:text-aptos-primary transition-colors">
              Copy Traders <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-aptos-dark ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <Link to="/traders" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
                Browse Traders
              </Link>
              <Link to="/leaderboard" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
                Leaderboard
              </Link>
            </div>
          </div>
          <Link to="/about" className="text-sm font-medium hover:text-aptos-primary transition-colors">
            About
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login">
            <Button variant="ghost" className="text-sm">Log in</Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-aptos-primary hover:bg-aptos-secondary text-white text-sm">
              Sign up
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-6 py-4 space-y-4 bg-white dark:bg-aptos-dark border-t">
          <Link 
            to="/" 
            className="block text-sm font-medium hover:text-aptos-primary"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link 
            to="/dashboard" 
            className="block text-sm font-medium hover:text-aptos-primary"
            onClick={toggleMenu}
          >
            Dashboard
          </Link>
          <Link 
            to="/traders" 
            className="block text-sm font-medium hover:text-aptos-primary"
            onClick={toggleMenu}
          >
            Copy Traders
          </Link>
          <Link 
            to="/about" 
            className="block text-sm font-medium hover:text-aptos-primary"
            onClick={toggleMenu}
          >
            About
          </Link>
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-col space-y-3">
            <Link to="/login" onClick={toggleMenu}>
              <Button variant="ghost" className="w-full justify-center">
                Log in
              </Button>
            </Link>
            <Link to="/signup" onClick={toggleMenu}>
              <Button className="w-full justify-center bg-aptos-primary hover:bg-aptos-secondary">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
