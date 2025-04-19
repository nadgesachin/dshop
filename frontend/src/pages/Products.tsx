import { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import {
  getAllProducts,
} from '@/services/productService';
import toast from 'react-hot-toast';
import { Category, getAllCategories } from '@/services/categoryService';

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
  const [categories, setCategories] = useState<Category[]>([]);
  // const [page, setPage] = useState(1);
  // const [hasMore, setHasMore] = useState(true);
  // const [isLoadingProduct, setIsLoadingProduct] = useState(false);

  const defaultImage = 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60';

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories();
      console.log(response);
      setCategories(response.data.data || []);
    } catch {
      toast.error('Failed to fetch products');
    } finally {
    }
  };
  const fetchProducts = async (pageNumber: number) => {
    // setIsLoadingProduct(true);
    try {
      const res = await getAllProducts(pageNumber, 20); // API must support page & limit
      setProducts(prev => [...prev, ...res.data]);
      // setHasMore(pageNumber < res.totalPages); // control further fetching
    } catch (err) {
      console.error('Error fetching products', err);
    } finally {
      // setIsLoadingProduct(false);
    }
  };

  useEffect(() => {
    fetchProducts(1); // on initial load + every time page increases
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' ||
      selectedCategory === '' ||
      product.category === selectedCategory;

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
            <div className="relative flex items-center gap-2">
              <div className="relative flex-1">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  className="w-full appearance-none pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Button */}
              {selectedCategory && (
                <button
                  onClick={() => {
                    setSelectedCategory('');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
                >
                  Clear Filters
                </button>

              )}
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
                className="w-full h-60 object-contain bg-white p-2 rounded-lg"
              />

              <div className="p-6">
                <span className="text-sm text-gray-500 uppercase">
                  {categories.find((c) => c._id === product.category)?.name}
                </span>
                <h3 className="text-xl font-semibold mt-2 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-gray-600 mt-2 line-clamp-2">
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
          <p className="text-center text-gray-500 mt-10">Products not found</p>
        ) 
        // : (
        //   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        //     {filteredProducts.map((product) => (
        //       <div key={product._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
        //         <img src={product?.images[0].url} alt={product.name} className="w-full h-60 object-contain bg-white p-2 rounded-lg" />
        //         <div className="p-4">
        //           <h3 className="text-xl font-semibold mt-2 line-clamp-1">
        //             {product.name}
        //           </h3>
        //           <p className="text-gray-600 mt-2 line-clamp-2">
        //             {product.description}
        //           </p>
        //           <div className="mt-2">
        //             <span className="text-xl font-bold">${product.price}</span>
        //           </div>
        //         </div>
        //       </div>
        //     ))}
        //   </div>
        // )
        }
      </div>
    </div>
  );
};

export default Products; 