import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, User} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import logo from '../assets/logo.png'
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
  };

  return (
    <nav className="bg-gradient-to-r from-orange-400 to-purple-400 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={logo}
              alt="Shiv Mobile Logo"
              className="w-10 h-10 object-contain rounded-full bg-white p-1"
            />
            <span className="text-white font-bold text-xl">Shiv Mobile</span>
          </Link>

          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
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
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:bg-white hover:text-orange-500 p-2 rounded-md"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.path
                    ? 'bg-white text-orange-500'
                    : 'text-white hover:bg-white hover:text-orange-500'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex space-x-4 px-3 py-2">
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
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 