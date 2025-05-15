import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Home, LayoutDashboard, Users, Info } from "lucide-react";
import WalletConnect from "../WalletConnect";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/about", label: "About", icon: Info },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/90 dark:bg-aptos-dark/90 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-aptos-primary to-aptos-accent flex items-center justify-center transform transition-transform group-hover:scale-105">
              <span className="text-white font-bold text-lg">IP</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-aptos-primary to-aptos-accent bg-clip-text text-transparent">
              InvestPro
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    "flex items-center space-x-1 text-sm font-medium transition-colors hover:text-aptos-primary",
                    location.pathname === link.to
                      ? "text-aptos-primary"
                      : "text-gray-600 dark:text-gray-300"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Wallet Connect */}
          <div className="hidden md:block">
            <WalletConnect />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden transition-all duration-300 ease-in-out",
          isMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        )}
      >
        <div className="px-4 py-4 space-y-3 bg-white dark:bg-aptos-dark border-t border-gray-200 dark:border-gray-800">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  location.pathname === link.to
                    ? "bg-aptos-primary/10 text-aptos-primary"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
                onClick={toggleMenu}
              >
                <Icon className="h-4 w-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <WalletConnect />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
