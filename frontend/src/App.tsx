import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import AdminReviews from './pages/AdminReviews';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { ProtectedRoute } from './components/ProtectedRoute';
import './index.css';
import AdminPromotions from './pages/AdminPromotions';
import ManageProducts from './pages/ManageProducts';
import ManageReviews from './pages/ManageReviews';
import UserManager from './pages/AdminUsers';
import Profile from './pages/Profile';
import QRCodePage from './pages/QRCode';
import AdminSubscriber from './pages/AdminSubscriber';

const AppContent: React.FC = () => {
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
      .blur-background::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(1px);
        z-index: 40;
        pointer-events: none;
      }
    `;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/admin" element={<AdminDashboard />} /> */}
          {/* <Route path="/admin/reviews" element={<AdminReviews />} /> */}
          {/* <Route path="/admin/images" element={<ImageUpload />} /> */}
          {/* <Route path="/admin/promotions" element={<AdminPromotions />} /> */}
          {/* <Route path="/admin/products" element={<ManageProducts />} /> */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reviews"
            element={
              <ProtectedRoute>
                <AdminReviews />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/promotions"
            element={
              <ProtectedRoute>
                <AdminPromotions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute>
                <ManageProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reviews"
            element={
              <ProtectedRoute>
                <ManageReviews />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <UserManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/qrcode"
            element={
              <ProtectedRoute>
                <QRCodePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/subscriber"
            element={
              <ProtectedRoute>
                <AdminSubscriber />
              </ProtectedRoute>
            }
          />
          {/* Redirect any unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <Toaster position="bottom-right" />
    </div>
  );
};

const App: React.FC = () => {
  return <AppContent />;
};

export default App;