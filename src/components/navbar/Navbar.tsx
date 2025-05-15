
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Wallet } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleConnectWallet = () => {
    // Simulate wallet connection
    setIsConnected(true);
  };

  return (
    <nav className="fixed top-0 w-full bg-[#0D1117]/80 backdrop-blur-md z-50 py-4 px-6 shadow-sm border-b border-[#2D333B]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-aptos-primary to-aptos-secondary flex items-center justify-center">
            <span className="text-aptos-dark font-bold">A</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-aptos-primary to-aptos-secondary bg-clip-text text-transparent">
            AptosTradeFlow
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/dashboard" className="text-sm font-medium text-[#C9D1D9] hover:text-white transition-colors">
            Dashboard
          </Link>
          <Link to="/about" className="text-sm font-medium text-[#C9D1D9] hover:text-white transition-colors">
            About
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {!isConnected ? (
            <Button 
              onClick={handleConnectWallet} 
              className="bg-[#161B22] hover:bg-[#2D333B] text-white border border-[#2D333B] hover:border-aptos-primary hover:shadow-[0_0_10px_rgba(0,255,170,0.2)] transition-all duration-300"
            >
              <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
            </Button>
          ) : (
            <Button 
              variant="outline" 
              className="text-white border-[#2D333B] hover:bg-[#2D333B] hover:text-aptos-primary"
            >
              <span className="h-2 w-2 bg-aptos-primary rounded-full mr-2"></span>
              Wallet Connected
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={toggleMenu}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-6 py-4 space-y-4 bg-[#161B22] border-t border-[#2D333B]">
          <Link 
            to="/dashboard" 
            className="block text-sm font-medium text-[#C9D1D9] hover:text-white"
            onClick={toggleMenu}
          >
            Dashboard
          </Link>
          <Link 
            to="/about" 
            className="block text-sm font-medium text-[#C9D1D9] hover:text-white"
            onClick={toggleMenu}
          >
            About
          </Link>
          <div className="pt-4 border-t border-[#2D333B]">
            {!isConnected ? (
              <Button 
                onClick={handleConnectWallet} 
                className="w-full justify-center bg-[#161B22] hover:bg-[#2D333B] text-white border border-[#2D333B] hover:border-aptos-primary"
              >
                <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
              </Button>
            ) : (
              <Button 
                variant="outline" 
                className="w-full justify-center text-white border-[#2D333B] hover:bg-[#2D333B]"
              >
                <span className="h-2 w-2 bg-aptos-primary rounded-full mr-2"></span>
                Wallet Connected
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
