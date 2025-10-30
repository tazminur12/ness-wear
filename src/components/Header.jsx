import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-100' 
        : 'bg-white shadow-lg'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-display text-black leading-tight">
                NESS WEAR
              </span>
              <span className="text-xs text-gray-500 font-medium tracking-wider font-body">
                FASHION STORE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-lg font-semibold font-body transition-all duration-200 ${
                location.pathname === '/' 
                  ? 'bg-purple-100 text-purple-700 shadow-sm' 
                  : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={`px-4 py-2 rounded-lg font-semibold font-body transition-all duration-200 ${
                location.pathname === '/products' 
                  ? 'bg-purple-100 text-purple-700 shadow-sm' 
                  : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
              }`}
            >
              Products
            </Link>
            <Link 
              to="/clothes" 
              className={`px-4 py-2 rounded-lg font-semibold font-body transition-all duration-200 ${
                location.pathname === '/clothes' 
                  ? 'bg-purple-100 text-purple-700 shadow-sm' 
                  : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
              }`}
            >
              Clothes
            </Link>
            <Link 
              to="/shoes" 
              className={`px-4 py-2 rounded-lg font-semibold font-body transition-all duration-200 ${
                location.pathname === '/shoes' 
                  ? 'bg-purple-100 text-purple-700 shadow-sm' 
                  : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
              }`}
            >
              Shoes
            </Link>
            <Link 
              to="/accessories" 
              className={`px-4 py-2 rounded-lg font-semibold font-body transition-all duration-200 ${
                location.pathname === '/accessories' 
                  ? 'bg-purple-100 text-purple-700 shadow-sm' 
                  : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
              }`}
            >
              Accessories
            </Link>

            <Link 
              to="/about" 
              className={`px-4 py-2 rounded-lg font-semibold font-body transition-all duration-200 ${
                location.pathname === '/about' 
                  ? 'bg-purple-100 text-purple-700 shadow-sm' 
                  : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
              }`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`px-4 py-2 rounded-lg font-semibold font-body transition-all duration-200 ${
                location.pathname === '/contact' 
                  ? 'bg-purple-100 text-purple-700 shadow-sm' 
                  : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
              }`}
            >
              Contact
            </Link>
           
          </nav>

          {/* Right Controls */}
          <div className="flex items-center">
            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 group"
            >
              <svg className={`w-6 h-6 transition-transform duration-200 ${isMenuOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="border-t border-gray-100 py-6 bg-white overflow-y-auto">
            <nav className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className={`px-4 py-3 rounded-xl font-semibold font-body transition-all duration-200 ${
                  location.pathname === '/' 
                    ? 'bg-purple-100 text-purple-700 shadow-sm' 
                    : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className={`px-4 py-3 rounded-xl font-semibold font-body transition-all duration-200 ${
                  location.pathname === '/products' 
                    ? 'bg-purple-100 text-purple-700 shadow-sm' 
                    : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                to="/accessories" 
                className={`px-4 py-3 rounded-xl font-semibold font-body transition-all duration-200 ${
                  location.pathname === '/accessories' 
                    ? 'bg-purple-100 text-purple-700 shadow-sm' 
                    : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Accessories
              </Link>
              <Link 
                to="/clothes" 
                className={`px-4 py-3 rounded-xl font-semibold font-body transition-all duration-200 ${
                  location.pathname === '/clothes' 
                    ? 'bg-purple-100 text-purple-700 shadow-sm' 
                    : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Clothes
              </Link>
              <Link 
                to="/shoes" 
                className={`px-4 py-3 rounded-xl font-semibold font-body transition-all duration-200 ${
                  location.pathname === '/shoes' 
                    ? 'bg-purple-100 text-purple-700 shadow-sm' 
                    : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Shoes
              </Link>
              <Link 
                to="/about" 
                className={`px-4 py-3 rounded-xl font-semibold font-body transition-all duration-200 ${
                  location.pathname === '/about' 
                    ? 'bg-purple-100 text-purple-700 shadow-sm' 
                    : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className={`px-4 py-3 rounded-xl font-semibold font-body transition-all duration-200 ${
                  location.pathname === '/contact' 
                    ? 'bg-purple-100 text-purple-700 shadow-sm' 
                    : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
