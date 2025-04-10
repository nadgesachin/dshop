import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
    setIsMenuOpen(false);
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="bg-gradient-to-r from-orange-400 to-purple-400 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={logo}
              alt="Shiv Mobile Logo"
              className="w-10 h-10 object-contain rounded-full bg-white p-1"
            />
            <span className="text-white font-bold text-xl">Shiv Mobile</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 items-center">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === item.path
                    ? 'bg-white text-orange-500'
                    : 'text-white hover:bg-white hover:text-orange-500'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/cart"
              className="text-white hover:bg-white hover:text-orange-500 p-2 rounded-md"
            >
              <ShoppingCart className="h-6 w-6" />
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/admin"
                  className="text-white hover:bg-white hover:text-orange-500 p-2 rounded-md"
                >
                  Admin Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white hover:bg-white hover:text-orange-500 p-2 rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-white hover:bg-white hover:text-orange-500 p-2 rounded-md"
              >
                <User className="h-6 w-6" />
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:bg-white hover:text-orange-500 p-2 rounded-md focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gradient-to-r from-orange-400 to-purple-400 px-4 pt-4 pb-6 space-y-2 shadow-md transition-all duration-300">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={closeMenu}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === item.path
                  ? 'bg-white text-orange-500'
                  : 'text-white hover:bg-white hover:text-orange-500'
              }`}
            >
              {item.name}
            </Link>
          ))}

          <div className="flex items-center gap-4 mt-4">
            <Link
              to="/cart"
              onClick={closeMenu}
              className="text-white hover:bg-white hover:text-orange-500 p-2 rounded-md"
            >
              <ShoppingCart className="h-6 w-6" />
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/admin"
                  onClick={closeMenu}
                  className="text-white hover:bg-white hover:text-orange-500 p-2 rounded-md"
                >
                  Admin Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white hover:bg-white hover:text-orange-500 p-2 rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={closeMenu}
                className="text-white hover:bg-white hover:text-orange-500 p-2 rounded-md"
              >
                <User className="h-6 w-6" />
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
