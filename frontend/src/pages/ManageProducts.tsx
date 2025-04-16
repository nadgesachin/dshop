import { useEffect, useState } from 'react';
import { Trash, Edit, Package } from 'lucide-react';
import toast from 'react-hot-toast';
import { Category, getAllCategories, createCategory } from '@/services/categoryService';
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    updateProduct,
} from '@/services/productService';

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

// const categories = [
//     'CCTV Cameras',
//     'Computer CPUs',
//     'Monitors and parts',
//     'Speakers',
//     'Printers'
// ];

const initialForm = {
    name: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    features: '',
    specifications: '',
    images: [] as File[],
};

const ManageProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [form, setForm] = useState(initialForm);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [existingImages, setExistingImages] = useState<Product['images']>([]);
    const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    // const [hasMore, setHasMore] = useState(true);
    // const [isLoadingProduct, setIsLoadingProduct] = useState(false);
    const limit = 10; // number of products per page

    const handleAddNewCategory = async () => {
        if (!newCategoryName.trim()) {
            return toast.error('Please enter a category name');
        }

        try {
            const response = await createCategory({ name: newCategoryName }); // <- use your backend API here
            const newCat = response;

            setCategories((prev) => [...prev, newCat]);
            setForm((prev) => ({ ...prev, category: newCat.name }));

            toast.success('Category added successfully!');
            setNewCategoryName('');
            setShowNewCategoryInput(false);
            fetchCategories();
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Failed to add category');
        }
    };

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await getAllCategories();
            console.log(response);
            setCategories(response.data.data || []);
        } catch {
            toast.error('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    const fetchProducts = async (pageNumber = 1) => {
        try {
            // setIsLoadingProduct(true);
            const res = await getAllProducts(pageNumber, limit);
            setProducts(res.data);
            setTotalPages(res.totalPages);
        } catch (err) {
            toast.error('Failed to fetch products');
        } finally {
            // setIsLoadingProduct(false);
        }
    };

    useEffect(() => {
        fetchProducts(page);
    }, [page]);


    useEffect(() => {
        fetchCategories();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, files } = e.target as HTMLInputElement;

        if (name === 'images' && files) {
            const imageFiles = Array.from(files) as File[];
            setForm(prev => ({
                ...prev,
                images: imageFiles,
            }));

            const previews = imageFiles.map(file => URL.createObjectURL(file));
            setPreviewImages(previews);
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();

        Object.entries(form).forEach(([key, val]) => {
            if (key === 'images') {
                (val as File[]).forEach(file => formData.append('images', file));
            } else {
                formData.append(key, String(val));
            }
        });

        try {
            if (editingId) {
                await updateProduct(editingId, formData);
                toast.success('Product updated');
            } else {
                await createProduct(formData);
                toast.success('Product added');
            }
            setForm(initialForm);
            setEditingId(null);
            setExistingImages([]);
            setPreviewImages([]);
            fetchProducts(page);
        } catch {
            toast.error('Failed to save product');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (product: any) => {
        setEditingId(product._id);
        setForm({
            name: product.name,
            description: product.description,
            category: product.category,
            price: String(product.price),
            stock: String(product.stock),
            features: product.features?.join(', ') || '',
            specifications: String(product.specifications || {}),
            images: [],
        });
        setExistingImages(product.images); // <- Store current images
        setPreviewImages([]);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;
        try {
            await deleteProduct(id);
            toast.success('Deleted successfully');
            fetchProducts(page);
        } catch {
            toast.error('Delete failed');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-900">Manage Products</h1>
                    <p className="mt-2 text-lg text-gray-600">Add, update, or delete products easily</p>
                </div>
                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-xl mb-12">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                        {editingId ? 'Edit Product' : 'Add New Product'}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Product Name"
                            required
                            className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <select
                            name="category"
                            value={form.category}
                            onChange={(e) => {
                                if (e.target.value === '__add_new__') {
                                    setShowNewCategoryInput(true);
                                } else {
                                    handleChange(e);
                                }
                            }}
                            required
                            className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            <option value="">Select Category</option>
                            <option value="__add_new__">➕ Add New Category</option>
                            {
                                Array.isArray(categories) && categories.map((category) => (
                                    <option key={category._id} value={category.name}>
                                        {category.name}
                                    </option>
                                ))}
                        </select>

                        {showNewCategoryInput && (
                            <div className="mt-2 flex gap-2 items-center">
                                <input
                                    type="text"
                                    placeholder="Enter new category name"
                                    value={newCategoryName}
                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                    className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                />
                                <button
                                    type="button"
                                    onClick={handleAddNewCategory}
                                    className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
                                >
                                    Add
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowNewCategoryInput(false);
                                        setNewCategoryName('');
                                    }}
                                    className="text-sm text-gray-500 hover:underline"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}


                        <input
                            name="price"
                            type="number"
                            value={form.price}
                            onChange={handleChange}
                            placeholder="Price"
                            required
                            className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <input
                            name="stock"
                            type="number"
                            value={form.stock}
                            onChange={handleChange}
                            placeholder="Stock"
                            required
                            className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Description"
                        rows={3}
                        className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                    />

                    <input
                        name="features"
                        value={form.features}
                        onChange={handleChange}
                        placeholder="Features"
                        className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />

                    <input
                        name="specifications"
                        value={form.specifications}
                        onChange={handleChange}
                        placeholder="Specifications"
                        className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />

                    <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Upload Product Images</label>
                        <input
                            type="file"
                            name="images"
                            accept="image/*"
                            multiple
                            onChange={handleChange}
                            className="block w-full text-sm text-gray-500"
                        />
                        {existingImages.length > 0 && (
                            <div className="mt-4">
                                <h4 className="text-sm font-medium text-gray-700 mb-2">Existing Images</h4>
                                <div className="flex gap-2 flex-wrap">
                                    {existingImages.map((img, i) => (
                                        <img
                                            key={i + 1}
                                            src={img.url}
                                            alt="product"
                                            className="w-16 h-16 object-cover rounded border"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {previewImages.length > 0 && (
                            <div className="mt-4">
                                <h4 className="text-sm font-medium text-gray-700 mb-2">Preview New Images</h4>
                                <div className="flex gap-2 flex-wrap">
                                    {previewImages.map((src, i) => (
                                        <img
                                            key={i}
                                            src={src}
                                            alt={`preview-${i}`}
                                            className="w-16 h-16 object-cover rounded border"
                                        />
                                    ))}
                                </div>
                                {form.images.length > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setForm(prev => ({ ...prev, images: [] }));
                                            setPreviewImages([]);
                                        }}
                                        className="mt-2 text-sm text-red-500 hover:underline"
                                    >
                                        Clear Selected Images
                                    </button>
                                )}

                            </div>
                        )}

                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 text-white font-medium rounded-lg bg-gradient-to-r from-orange-500 to-purple-500 hover:opacity-90 transition duration-300"
                    >
                        {editingId ? 'Update Product' : 'Create Product'}
                    </button>
                </form>
                {/* Product List */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                    {/* Header with pagination */}
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                            <Package className="mr-2 text-orange-500" /> All Products
                        </h2>

                        {/* Pagination Controls */}
                        <div className="flex items-center gap-2">
                            <button
                                disabled={page === 1}
                                onClick={() => setPage(prev => prev - 1)}
                                className={`px-3 py-1 rounded border text-sm ${page === 1 ? 'text-gray-400 border-gray-200 cursor-not-allowed' : 'text-gray-700 border-gray-300 hover:bg-gray-100'
                                    }`}
                            >
                                ← Prev
                            </button>
                            <span className="text-sm text-gray-600">
                                Page {page} of {totalPages}
                            </span>
                            <button
                                disabled={page === totalPages}
                                onClick={() => setPage(prev => prev + 1)}
                                className={`px-3 py-1 rounded border text-sm ${page === totalPages ? 'text-gray-400 border-gray-200 cursor-not-allowed' : 'text-gray-700 border-gray-300 hover:bg-gray-100'
                                    }`}
                            >
                                Next →
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    {loading ? (
                        <p className="text-gray-500">Loading products...</p>
                    ) : products.length === 0 ? (
                        <p className="text-gray-500">No products found.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Image</th>
                                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
                                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Price</th>
                                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Stock</th>
                                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((p: any) => (
                                        <tr key={p._id} className="border-t">
                                            <td className="px-4 py-2">
                                                {p.images?.[0]?.url ? (
                                                    <img
                                                        src={p.images[0].url}
                                                        alt={p.name}
                                                        className="h-12 w-12 rounded-lg object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-sm text-gray-400">No image</span>
                                                )}
                                            </td>
                                            <td
                                                title={p.name}
                                                className="px-4 py-2 font-semibold max-w-[120px] truncate text-ellipsis whitespace-nowrap"
                                            >
                                                {p.name}
                                            </td>
                                            <td className="px-4 py-2">₹{p.price}</td>
                                            <td className="px-4 py-2">{p.stock}</td>
                                            <td className="px-1 py-2">
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={() => handleEdit(p)}
                                                        className="text-blue-600 hover:underline"
                                                    >
                                                        <Edit className="inline h-5 w-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(p._id)}
                                                        className="text-red-600 hover:underline"
                                                    >
                                                        <Trash className="inline h-5 w-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageProducts;
