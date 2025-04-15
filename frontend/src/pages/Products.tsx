import { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import {
  getAllProducts,
} from '@/services/productService';
import toast from 'react-hot-toast';

export interface Product {
  _id?: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  features: string[];
  specifications: Record<string, string>;
  images: {
    public_id: string;
    url: string;
  }[];
  createdAt?: string;
}

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);

  const defaultImage = 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60';

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'cctv', name: 'CCTV Cameras' },
    { id: 'cpu', name: 'Computer CPUs' },
    { id: 'monitor', name: 'Monitors' },
    { id: 'speaker', name: 'Speakers' },
    { id: 'printer', name: 'Printers' },
  ];

  // const products = [
  //   {
  //     id: 1,
  //     name: '4K CCTV Camera',
  //     category: 'cctv',
  //     price: '₹5,999',
  //     image: 'https://images.unsplash.com/photo-1618832515494-62f50e7e5ae8',
  //     rating: 4.9,
  //     description: 'High-resolution 4K CCTV camera with night vision.',
  //   },
  //   {
  //     id: 2,
  //     name: 'Gaming CPU',
  //     category: 'cpu',
  //     price: '₹25,999',
  //     image: 'https://images.unsplash.com/photo-1618401471344-22f7730f246b',
  //     rating: 4.8,
  //     description: 'High-performance gaming CPU with RGB lighting.',
  //   },
  //   {
  //     id: 3,
  //     name: '27" 4K Monitor',
  //     category: 'monitor',
  //     price: '₹12,999',
  //     image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04',
  //     rating: 4.7,
  //     description: 'Ultra HD monitor with HDR support.',
  //   },
  //   {
  //     id: 4,
  //     name: 'Bluetooth Speaker',
  //     category: 'speaker',
  //     price: '₹1,999',
  //     image: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65',
  //     rating: 4.5,
  //     description: 'Portable speaker with rich bass and Bluetooth 5.0.',
  //   },
  //   {
  //     id: 5,
  //     name: 'Inkjet Printer',
  //     category: 'printer',
  //     price: '₹9,499',
  //     image: 'https://images.unsplash.com/photo-1580824454447-53c1b2e5d7fc',
  //     rating: 4.6,
  //     description: 'Fast and cost-effective inkjet printer for home use.',
  //   },
  //   {
  //     id: 6,
  //     name: 'Color Laser Printer',
  //     category: 'printer',
  //     price: '₹15,499',
  //     image: 'https://images.unsplash.com/photo-1616009087620-dcbbf9ae0fcd',
  //     rating: 4.7,
  //     description: 'Professional-quality color laser printer.',
  //   },
  //   {
  //     id: 7,
  //     name: 'Desktop CPU Tower',
  //     category: 'cpu',
  //     price: '₹19,999',
  //     image: 'https://images.unsplash.com/photo-1632426341618-410d5dc245d2',
  //     rating: 4.6,
  //     description: 'Workstation tower with high processing power.',
  //   },
  //   {
  //     id: 8,
  //     name: 'Curved Gaming Monitor',
  //     category: 'monitor',
  //     price: '₹14,499',
  //     image: 'https://images.unsplash.com/photo-1587202372775-98973fd7aa13',
  //     rating: 4.8,
  //     description: 'Curved display for immersive gaming experience.',
  //   },
  // ];

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch {
      toast.error('Failed to fetch products');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
              key={product._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
            >
              <img
                src={product.images?.[0].url || defaultImage}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <span className="text-sm text-gray-500 uppercase">
                  {categories.find((c) => c.id === product.category)?.name}
                </span>
                <h3 className="text-xl font-semibold mt-2 max-w-[200px] truncate whitespace-nowrap">
                  {product.name}
                </h3>
                <p className="text-gray-600 mt-2 max-w-[250px] truncate whitespace-nowrap">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <p className="text-orange-500 font-bold">Rs:{product.price}</p>
                  {/* <div className="flex items-center">
                    <Star className="text-yellow-400" />
                    <span className="text-gray-600 ml-1">{product.rating}</span>
                  </div> */}
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