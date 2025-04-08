import React, { useState } from 'react';
import { Search, Filter, Star } from 'lucide-react';

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'cctv', name: 'CCTV Cameras' },
    { id: 'cpu', name: 'Computer CPUs' },
    { id: 'monitor', name: 'Monitors' },
    { id: 'speaker', name: 'Speakers' },
    { id: 'printer', name: 'Printers' },
  ];

  const products = [
    {
      id: 1,
      name: '4K CCTV Camera',
      category: 'cctv',
      price: '₹5,999',
      image: '/images/cctv.jpg',
      rating: 4.9,
      description: 'High-resolution 4K CCTV camera with night vision',
    },
    {
      id: 2,
      name: 'Gaming CPU',
      category: 'cpu',
      price: '₹25,999',
      image: '/images/cpu.jpg',
      rating: 4.8,
      description: 'High-performance gaming CPU with RGB lighting',
    },
    {
      id: 3,
      name: '27" 4K Monitor',
      category: 'monitor',
      price: '₹12,999',
      image: '/images/monitor.jpg',
      rating: 4.7,
      description: 'Ultra HD monitor with HDR support',
    },
    // Add more products as needed
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Our Products</h1>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                className="appearance-none pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <span className="text-sm text-gray-500 uppercase">
                  {categories.find((c) => c.id === product.category)?.name}
                </span>
                <h3 className="text-xl font-semibold mt-2">{product.name}</h3>
                <p className="text-gray-600 mt-2">{product.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <p className="text-orange-500 font-bold">{product.price}</p>
                  <div className="flex items-center">
                    <Star className="text-yellow-400" />
                    <span className="text-gray-600 ml-1">{product.rating}</span>
                  </div>
                </div>
                <button className="w-full mt-4 bg-gradient-to-r from-orange-400 to-purple-400 text-white py-2 rounded-lg hover:opacity-90 transition duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products; 