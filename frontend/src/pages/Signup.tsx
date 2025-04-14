import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Calendar, Image, X, EyeOff, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import { signupUser } from '../services/signupService';
import { uploadImage } from '../services/upload';

export const Signup = () => {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(()=>{
    const admin = localStorage.getItem('admin');
    if(admin === 'admin'){
      setIsAdmin(true);
    }
  },[])
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    photo: string | null;
    dob: string;
    password: string;
    repassword: string;
    role: string;
  }>({
    name: '',
    email: '',
    photo: null,
    dob: '',
    password: '',
    repassword: '',
    role: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.repassword) {
      toast.error("Passwords don't match!");
      return;
    }

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        photo: formData.photo,
        dob: formData.dob,
        password: formData.password,
        role: 'user'
      };
      if (formData.photo) payload.photo = formData.photo;
      await signupUser(payload);
      toast.success('Account created successfully!');
      navigate('/login');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      if (!file) return;
      setIsUploading(true);
      const formData = new FormData();
      formData.append('photo', file as File);
      const response = await uploadImage(formData);
      console.log("response ",response);
      setFormData(prev => ({ ...prev, photo: response.profilePhotoUrl }));
      setProfilePhotoUrl(response.profilePhotoUrl);
      setIsUploading(false);
    } catch (error: any) {
      setIsUploading(false);
      toast.error(error.message);
    }
    finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Create an Account</h2>
          <p className="mt-2 text-sm text-gray-600">Join Shiv Mobile and explore amazing deals</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Role */}
            {isAdmin && (
              <div>
                <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <div className="relative">
                  <User className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" />
                  <select
                    id="product"
                    name="product"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                    required
                  >
                    <option value="">Select a Role</option>
                    <option key='user' value='user'>
                      User
                    </option>
                    <option key='admin' value='admin'>
                      Admin
                    </option>
                  </select>
                </div>
              </div>
            )}
            {/* Name */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="name"
                required
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                required
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Photo URL */}
            <div className="relative">
              <Image className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleImageUpload(file);
                  }
                }}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              
            </div>
            {profilePhotoUrl && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600">Selected file:</p>
                  <ul className="mt-2 space-y-1 text-sm text-gray-500">
                    <li key={0} className="flex items-center justify-between">
                      <span className="truncate">{profilePhotoUrl}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setProfilePhotoUrl(null);
                        }}
                        className="ml-2 text-red-500 hover:text-red-700 text-lg"
                      >
                        ×
                      </button>
                    </li>
                  </ul>
                </div>
              )}

            {/* DOB */}
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                name="dob"
                required
                value={formData.dob}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Re-enter Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="repassword"
                required
                placeholder="Re-enter Password"
                value={formData.repassword}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 text-white font-medium rounded-lg bg-gradient-to-r from-orange-400 to-purple-500 hover:opacity-90 transition duration-300"
          >
            Sign Up
          </button>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-orange-500 font-medium hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>

      {isUploading && (
        <div className="fixed inset-0 z-[99999] bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-2xl px-8 py-10 w-full max-w-sm relative animate-fade-in">
            {/* Close Button */}
            <button
              onClick={() => setIsUploading(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Loader Visual */}
            <div className="flex flex-col items-center gap-6 mt-2">
              <div className="relative w-24 h-24">
                <svg className="w-full h-full animate-spin-slow -rotate-90" viewBox="0 0 36 36">
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    stroke="rgba(229, 231, 235, 1)"  // Tailwind gray-200
                    strokeWidth="4"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    stroke="rgba(249, 115, 22, 1)"  // Tailwind orange-500
                    strokeWidth="4"
                    strokeDasharray="90"
                    strokeLinecap="round"
                    className="animate-dash"
                  />
                </svg>
              </div>
              <p className="text-gray-600 font-medium text-base tracking-wide">Uploading... hang tight</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



