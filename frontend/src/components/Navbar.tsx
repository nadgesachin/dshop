import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout, isAdmin } = useAuth();
  
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
      <div className="max-w-7.5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logo}
              alt="Shiv Mobile Logo"
              className="w-10 h-10 rounded-full bg-white p-1 object-contain shadow-sm"
            />
            <span className="text-white font-bold text-xl tracking-wide">Shiv Mobile</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-5 font-semibold text-[16px]">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-xl transition duration-200 ${location.pathname === item.path
                  ? 'bg-white text-orange-500 shadow-sm'
                  : 'text-white hover:bg-white hover:text-orange-500'
                  }`}
              >
                {item.name}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={closeMenu}
                    className="text-white hover:bg-white hover:text-orange-500 px-4 py-2 rounded-md"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <Link
                    to="/profile"
                    onClick={closeMenu}
                    className="text-white hover:bg-white hover:text-orange-500 px-4 py-2 rounded-md"
                  >
                    Profile
                  </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-xl text-white hover:bg-white hover:text-orange-500 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="p-2 rounded-full text-white hover:bg-white hover:text-orange-500 transition"
              >
                <User className="h-6 w-6" />
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:bg-white hover:text-orange-500 p-2 rounded-md transition"
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
              className={`block px-4 py-2 rounded-lg text-base font-medium transition ${location.pathname === item.path
                ? 'bg-white text-orange-500'
                : 'text-white hover:bg-white hover:text-orange-500'
                }`}
            >
              {item.name}
            </Link>
          ))}

          <div className="flex flex-col items-start gap-2 mt-4 ml-[8px]">
            {isAuthenticated ? (
              <>
                { isAdmin && (
                  <Link
                    to="/admin"
                    onClick={closeMenu}
                    className="text-white hover:bg-white hover:text-orange-500 px-4 py-2 rounded-md"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <Link
                    to="/profile"
                    onClick={closeMenu}
                    className="text-white hover:bg-white hover:text-orange-500 px-4 py-2 rounded-md"
                  >
                    Profile
                  </Link>
                <button
                  onClick={handleLogout}
                  className="text-white hover:bg-white hover:text-orange-500 px-4 py-2 rounded-md"
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
