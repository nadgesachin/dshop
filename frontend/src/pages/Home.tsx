import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, Quote, MapPin, Phone, Mail, Clock, User, MessageSquare, ShoppingBag, Bell, X } from 'lucide-react';
import { submitReview, getReviews, Review } from '../services/reviewService';
import toast from 'react-hot-toast';


const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentProductSlide, setCurrentProductSlide] = useState(0);
  const [currentReviewSlide, setCurrentReviewSlide] = useState(0);

  const [reviewForm, setReviewForm] = useState({
    name: '',
    email: '',
    rating: 0,
    product: '',
    comment: '',
    photos: [] as File[]
  });

  const [showNewsletterModal, setShowNewsletterModal] = useState(false);
  const [email, setEmail] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [reviewsError, setReviewsError] = useState<string | null>(null);

  const categories = [
    {
      name: 'Smartphones',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      description: 'Latest smartphones from top brands',
      count: '50+ Products'
    },
    {
      name: 'Laptops',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      description: 'Powerful laptops for work and gaming',
      count: '30+ Products'
    },
    {
      name: 'Accessories',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      description: 'Essential accessories for your devices',
      count: '100+ Products'
    },
    {
      name: 'Audio',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      description: 'Premium audio equipment',
      count: '40+ Products'
    },
    {
      name: 'Smart Home',
      image: 'https://images.unsplash.com/photo-1558002038-1055e3fdf0ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      description: 'Smart home devices and solutions',
      count: '25+ Products'
    },
    {
      name: 'Gaming',
      image: 'https://images.unsplash.com/photo-1542903660-eedba2cda473?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      description: 'Gaming gear and accessories',
      count: '35+ Products'
    }
  ];

  const products = [
    {
      id: 1,
      name: 'iPhone 14 Pro Max',
      price: '₹129,999',
      image: 'https://images.unsplash.com/photo-1678652172431-1880a5c1e86a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.8,
      reviews: 120
    },
    {
      id: 2,
      name: 'MacBook Pro M2',
      price: '₹199,999',
      image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.9,
      reviews: 85
    },
    {
      id: 3,
      name: 'Samsung Galaxy S23 Ultra',
      price: '₹124,999',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.7,
      reviews: 95
    },
    {
      id: 4,
      name: 'Sony WH-1000XM5',
      price: '₹29,990',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.9,
      reviews: 150
    },
    {
      id: 5,
      name: 'Apple Watch Series 8',
      price: '₹45,900',
      image: 'https://images.unsplash.com/photo-1655720828018-edd2daec9349?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.6,
      reviews: 75
    },
    {
      id: 6,
      name: 'iPad Pro M2',
      price: '₹89,900',
      image: 'https://images.unsplash.com/photo-1629131726699-1ecedb164b6a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.8,
      reviews: 60
    }
  ];

  const defaultImage = 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60';
  const defaultAvatar = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60';

  const mockProducts = [
    { id: '1', name: 'iPhone 14 Pro Max' },
    { id: '2', name: 'MacBook Pro M2' },
    { id: '3', name: 'Samsung Galaxy S23 Ultra' },
    { id: '4', name: 'Sony WH-1000XM5' },
    { id: '5', name: 'Apple Watch Series 8' },
    { id: '6', name: 'iPad Pro M2' }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % categories.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + categories.length) % categories.length);
  };

  const nextProductSlide = () => {
    setCurrentProductSlide((prev) => (prev + 1) % Math.ceil(products.length / 3));
  };

  const prevProductSlide = () => {
    setCurrentProductSlide((prev) => (prev - 1 + Math.ceil(products.length / 3)) % Math.ceil(products.length / 3));
  };

  const prevReviewSlide = () => {
    setCurrentReviewSlide((prev) =>
      prev === 0 ? reviews.length - 1 : prev - 1
    );
  };
  
  const nextReviewSlide = () => {
    setCurrentReviewSlide((prev) =>
      prev === reviews.length - 1 ? 0 : prev + 1
    );
  };

  // Fetch reviews on component mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoadingReviews(true);
        const fetchedReviews = await getReviews();
        setReviews(fetchedReviews || []);
        setReviewsError(null);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        toast.error("Error fetching reviews");
        setReviewsError('Failed to load reviews. Please try again later.');
        setReviews([]);
      } finally {
        setIsLoadingReviews(false);
      }
    };
    fetchReviews();
  }, []);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      // Create FormData object
      const formData = new FormData();

      // Append text fields
      formData.append('name', reviewForm.name);
      formData.append('email', reviewForm.email);
      formData.append('rating', reviewForm.rating.toString());
      formData.append('product', reviewForm.product);
      formData.append('comment', reviewForm.comment);

      // Append files
      reviewForm.photos.forEach((file) => {
        formData.append('photos', file);
      });

      console.log('Submitting form data:', {
        name: reviewForm.name,
        email: reviewForm.email,
        rating: reviewForm.rating,
        product: reviewForm.product,
        comment: reviewForm.comment,
        photosCount: reviewForm.photos.length
      });

      const newReview = await submitReview(formData);
      setReviews(prevReviews => [newReview, ...prevReviews]);
      setSubmitSuccess(true);
      
      // Reset form
      setReviewForm({
        name: '',
        email: '',
        rating: 0,
        product: '',
        comment: '',
        photos: []
      });
      toast.success("Submitted your valuable review");
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error("Error submitting review");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would typically send the email to your backend
      console.log('Newsletter subscription:', email);
      
      // Show success toast
      setToastMessage('Thank you for subscribing to our newsletter!');
      toast.success('Thank you for subscribing to our newsletter!');
      setShowToast(true);
      setEmail('');
      setShowNewsletterModal(false);
    } catch (error) {
      // Show error toast
      setToastMessage('Failed to subscribe. Please try again later.');
      toast.error('Failed to subscribe. Please try again later.');      
    } finally {
      setIsSubmitting(false);
    }
  };

  // Auto-hide toast after 5 seconds
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const productTimer = setInterval(nextProductSlide, 4000);
    return () => clearInterval(productTimer);
  }, []);

  useEffect(() => {
    const reviewTimer = setInterval(nextReviewSlide, 8000);
    return () => clearInterval(reviewTimer);
  }, []);

  return (
    <div className="bg-white ">
      {/* Hero Section with Carousel */}
      <div className="relative">
        {/* Welcome Section */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-black/50">
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
              Welcome to Shiv Mobile
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-gray-300 max-w-3xl">
              Your trusted destination for mobile and electronics needs in Silvassa. We offer a wide range of products from top brands at competitive prices.
            </p>
            <div className="mt-6">
              <Link
                to="/products"
                className="inline-block bg-orange-500 border border-transparent rounded-md py-2 px-6 sm:py-3 sm:px-8 font-medium text-white hover:bg-orange-600 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>

        {/* Carousel */}
        {/* Carousel */}
      <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="flex h-full transition-transform duration-500 ease-in-out flex-nowrap"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {categories.map((category) => (
              <div
                key={category.name}
                className="min-w-full flex-shrink-0 h-full"
              >
                <div className="relative h-full">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-12 text-white">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                      {category.name}
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg opacity-90 mb-2">
                      {category.description}
                    </p>
                    <p className="text-sm sm:text-base font-medium">
                      {category.count}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition duration-300"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <div className="flex space-x-2">
            {categories.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition duration-300 ${
                  index === currentSlide ? 'bg-orange-500 w-4' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition duration-300"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
      </div>

      {/* Featured Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Featured Products</h2>
          <div className="flex space-x-4">
            <button
              onClick={prevProductSlide}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition duration-300 shadow-sm hover:shadow-md"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <button
              onClick={nextProductSlide}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition duration-300 shadow-sm hover:shadow-md"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentProductSlide * 100}%)` }}
          >
            {products.map((product) => (
              <div key={product.id} className="w-full sm:w-1/2 md:w-1/3 flex-shrink-0 px-4">
                <Link
                  to={`/products/${product.id}`}
                  className="group block relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white"
                >
                  <div className="aspect-w-1 aspect-h-1 w-full h-64">
                    <img
                      src={product.image || defaultImage}
                      alt={product.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = defaultImage;
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-xl font-bold text-orange-500 mb-3">{product.price}</p>
                    <div className="flex items-center">
                      <div className="flex items-center text-yellow-400">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                      </div>
                      <span className="mx-2 text-gray-300">|</span>
                      <span className="text-sm text-gray-600">{product.reviews} reviews</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">What Our Customers Say</h2>
            <p className="mt-4 text-lg text-gray-600">Read reviews from our satisfied customers</p>
          </div>

          {/* Loading State */}
          {isLoadingReviews && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
              <p className="mt-2 text-gray-600">Loading reviews...</p>
            </div>
          )}

          {/* Error State */}
          {reviewsError && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg text-center">
              {reviewsError}
            </div>
          )}

          {/* Success Message */}
          {submitSuccess && (
            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
              Thank you for your review! It has been submitted successfully.
            </div>
          )}

          <div className="relative overflow-hidden w-full">
          <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ width: `${reviews.length * 100}%`, transform: `translateX(-${currentReviewSlide * 100}%)` }}
            >
              {reviews.map((review) => (
                <div key={review._id} className="min-w-full px-4 flex-shrink-0">
                  <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 transform hover:scale-105 transition duration-300">
                    <div className="flex items-center mb-6">
                      <div className="relative h-16 w-16 rounded-full overflow-hidden">
                        <img
                          src={review.photos?.[0] || defaultAvatar}
                          alt={review.name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = defaultAvatar;
                          }}
                        />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-900">{review.name}</h3>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <Quote className="absolute -top-2 -left-2 h-8 w-8 text-gray-200" />
                      <p className="text-gray-600 text-lg leading-relaxed">{review.comment}</p>
                    </div>
                    <div className="mt-6 text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={prevReviewSlide}
              className="p-2 rounded-full bg-white hover:bg-gray-100 transition duration-300 shadow-sm hover:shadow-md"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <div className="flex space-x-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReviewSlide(index)}
                  className={`w-2 h-2 rounded-full transition duration-300 ${
                    index === currentReviewSlide ? 'bg-orange-500 w-4' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextReviewSlide}
              className="p-2 rounded-full bg-white hover:bg-gray-100 transition duration-300 shadow-sm hover:shadow-md"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Get Review Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Share Your Experience</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Help others by sharing your valuable feedback about our products and services.
            </p>
          </div>

          <div className=" mx-auto">
            <form
              onSubmit={handleReviewSubmit}
              className="bg-white p-10 rounded-3xl shadow-xl transition-transform hover:scale-[1.01] duration-300"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <div className="relative">
                      <User className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={reviewForm.name}
                        onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={reviewForm.email}
                        onChange={(e) => setReviewForm({ ...reviewForm, email: e.target.value })}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  {/* Product */}
                  <div>
                    <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-1">
                      Product Purchased
                    </label>
                    <div className="relative">
                      <ShoppingBag className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" />
                      <select
                        id="product"
                        name="product"
                        value={reviewForm.product}
                        onChange={(e) => setReviewForm({ ...reviewForm, product: e.target.value })}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                        required
                      >
                        <option value="">Select a product</option>
                        {mockProducts.map((product) => (
                          <option key={product.id} value={product.id}>
                            {product.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Rating</label>
                    <div className="flex gap-2 p-3 bg-gray-50 rounded-lg">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                          className="transition-transform hover:scale-110"
                        >
                          <Star
                            className={`h-8 w-8 ${
                              star <= reviewForm.rating
                                ? 'text-yellow-400 fill-current drop-shadow-sm'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Comment */}
                  <div>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Review
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                      <textarea
                        id="comment"
                        name="comment"
                        rows={6}
                        value={reviewForm.comment}
                        onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                        placeholder="Share your detailed experience with this product..."
                        required
                      />
                    </div>
                  </div>

                  {/* File Upload */}
                  <div>
                    <label htmlFor="photos" className="block text-sm font-medium text-gray-700 mb-1">
                      Upload Photos (Optional)
                    </label>
                    <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-400 transition">
                      <input
                        type="file"
                        id="photos"
                        name="photos"
                        multiple
                        accept="image/*"
                        onChange={(e) => {
                          const files = Array.from(e.target.files || []);
                          setReviewForm(prev => ({
                            ...prev,
                            photos: files
                          }));
                        }}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="space-y-2 pointer-events-none">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>

                    {reviewForm.photos.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-600">Selected files:</p>
                        <ul className="mt-2 space-y-1 text-sm text-gray-500">
                          {reviewForm.photos.map((file, index) => (
                            <li key={index} className="flex items-center justify-between">
                              <span className="truncate">{file.name}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  setReviewForm(prev => ({
                                    ...prev,
                                    photos: prev.photos.filter((_, i) => i !== index)
                                  }));
                                }}
                                className="ml-2 text-red-500 hover:text-red-700 text-lg"
                              >
                                ×
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-10 text-center">
                <button
                  type="submit"
                  className="inline-block px-6 py-3 text-white bg-orange-500 hover:bg-orange-600 rounded-full text-base font-semibold transition"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Location Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">Visit Our Store</h2>
            <p className="mt-4 text-lg text-gray-600">Find us at our convenient location in Silvassa</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Map Section */}
          <div className="h-full rounded-2xl overflow-hidden shadow-xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.5863812635165!2d73.1578649!3d20.1565369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be74969dac99969%3A0x5135a11763ae36b2!2sCSC%20CENTER%20SHIV%20MOBILE%20DUDHANI!5e0!3m2!1sen!2sin!4v1712669849146!5m2!1sen!2sin"
            className="w-full h-full rounded-2xl"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          </div>

            {/* Contact Information */}
            <div className="bg-gray-50 rounded-2xl p-8 shadow-xl">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <MapPin className="h-6 w-6 text-orange-500" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Address</h3>
                    <p className="mt-1 text-gray-600">
                      Karchond khadkipada dnh&dd Silvassa-396230
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Phone className="h-6 w-6 text-orange-500" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
                    <p className="mt-1 text-gray-600">9737485262</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Mail className="h-6 w-6 text-orange-500" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                    <p className="mt-1 text-gray-600">shivmobile780@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Clock className="h-6 w-6 text-orange-500" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Business Hours</h3>
                    <p className="mt-1 text-gray-600">
                      Monday - Saturday: 10:00 AM - 8:00 PM<br />
                      Sunday: 11:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href="https://maps.app.goo.gl/B7YkiDgia7Kiqvxk9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-500 hover:bg-orange-600 transition duration-300"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Subscription Section */}
      <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-orange-400 rounded-full opacity-20 transform -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-400 rounded-full opacity-20 transform translate-x-32 translate-y-32"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="text-white text-sm font-medium">Stay Connected</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
              Stay Updated with Our Latest Products
            </h2>
            <p className="text-xl text-orange-100 mb-8">
              Subscribe to our newsletter for exclusive deals, new arrivals, and special offers
            </p>

            <form onSubmit={handleNewsletterSubmit} className="mt-8 sm:flex sm:max-w-md mx-auto">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-orange-300" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-4 py-4 border-0 rounded-lg text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-orange-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <button
                type="submit"
                className="mt-4 sm:mt-0 sm:ml-4 w-full sm:w-auto flex items-center justify-center px-6 py-4 border border-transparent text-base font-medium rounded-lg text-orange-600 bg-white hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-orange-500 transition duration-300 transform hover:scale-105"
              >
                Subscribe Now
              </button>
            </form>

            <div className="mt-8 flex items-center justify-center space-x-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-white/20 rounded-full p-2">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" />
                  </svg>
                </div>
                <span className="ml-2 text-orange-100">Exclusive Deals</span>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-white/20 rounded-full p-2">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" />
                  </svg>
                </div>
                <span className="ml-2 text-orange-100">New Arrivals</span>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-white/20 rounded-full p-2">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" />
                  </svg>
                </div>
                <span className="ml-2 text-orange-100">Special Offers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Floating Newsletter Button */}
      <div className="fixed bottom-6 right-6 z-[99999]">
        <button
          onClick={() => 
            setShowNewsletterModal(true)
          }
          className="flex items-center justify-center w-16 h-16 rounded-full bg-orange-500 text-white shadow-lg hover:bg-orange-600 hover:shadow-xl transform hover:scale-110 transition duration-300"
          aria-label="Subscribe to newsletter"
        >
          <Bell className="h-8 w-8" />
        </button>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-[99999]">
          <div className="bg-white rounded-lg shadow-lg p-4 max-w-sm">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Bell className="h-6 w-6 text-orange-500" />
              </div>
              <div className="ml-3 w-0 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {toastMessage}
                </p>
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <button
                  className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={() => setShowToast(false)}
                >
                  <span className="sr-only">Close</span>
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showNewsletterModal && (
              <div className="fixed inset-0 z-[99999] overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                  <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                  </div>
      
                  <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                    <div className="absolute top-0 right-0 pt-4 pr-4">
                      <button
                        type="button"
                        className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                        onClick={() => setShowNewsletterModal(false)}
                      >
                        <span className="sr-only">Close</span>
                        <X className="h-6 w-6" />
                      </button>
                    </div>
      
                    <div>
                      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-orange-100">
                        <Bell className="h-6 w-6 text-orange-500" />
                      </div>
                      <div className="mt-3 text-center sm:mt-5">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          Subscribe to Our Newsletter
                        </h3>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Stay updated with our latest products and exclusive offers
                          </p>
                        </div>
                      </div>
                    </div>
                    <form onSubmit={handleNewsletterSubmit} className="mt-5 sm:mt-6">
                      <div>
                        <label htmlFor="newsletter-email" className="sr-only">
                          Email address
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="newsletter-email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="shadow-sm focus:ring-orange-500 py-2 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Enter your email"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="mt-5 sm:mt-6">
                        <button
                          type="submit"
                          className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-500 text-base font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:text-sm transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
      )}

      <div className="bg-white py-16">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-12">
             <h2 className="text-3xl font-extrabold text-gray-900">Share our shop with your friends and family</h2>
             <p className="mt-4 text-lg text-gray-600">Help us grow by sharing our shop details</p>
           </div>
 
           <div className="max-w-3xl mx-auto">
             <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
               {/* Shop Header */}
               <div className="relative h-48 bg-gradient-to-r from-orange-500 to-orange-600">
                 <div className="absolute inset-0 bg-black/20"></div>
                 <div className="absolute inset-0 flex items-center justify-center">
                   <h3 className="text-3xl font-bold text-white">Shiv Mobile</h3>
                 </div>
               </div>
 
               {/* Shop Content */}
               <div className="p-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {/* Left Column */}
                   <div className="space-y-6">
                     <div>
                       <h4 className="text-lg font-semibold text-gray-900 mb-2">About Us</h4>
                       <p className="text-gray-600">
                         Your trusted destination for mobile and electronics needs in Silvassa. We offer a wide range of products from top brands at competitive prices.
                       </p>
                     </div>
 
                     <div>
                       <h4 className="text-lg font-semibold text-gray-900 mb-2">Contact Info</h4>
                       <div className="space-y-2">
                         <a 
                           href="https://maps.app.goo.gl/B7YkiDgia7Kiqvxk9"
                           target="_blank"
                           rel="noopener noreferrer"
                           className="flex items-center text-gray-600 hover:text-orange-500 transition duration-300 group"
                         >
                           <MapPin className="h-5 w-5 text-orange-500 mr-2 group-hover:scale-110 transition duration-300" />
                           <span className="group-hover:underline">Karchond khadkipada dnh&dd Silvassa-396230</span>
                         </a>
                         <p className="flex items-center text-gray-600">
                           <Phone className="h-5 w-5 text-orange-500 mr-2" />
                           9737485262
                         </p>
                         <p className="flex items-center text-gray-600">
                           <Mail className="h-5 w-5 text-orange-500 mr-2" />
                           shivmobile780@gmail.com
                         </p>
                       </div>
                     </div>
                   </div>
 
                   {/* Right Column */}
                   <div className="space-y-6">
                     <div>
                       <h4 className="text-lg font-semibold text-gray-900 mb-2">Business Hours</h4>
                       <div className="space-y-2">
                         <p className="flex items-center text-gray-600">
                           <Clock className="h-5 w-5 text-orange-500 mr-2" />
                           Monday - Saturday: 10:00 AM - 8:00 PM
                         </p>
                         <p className="flex items-center text-gray-600">
                           <Clock className="h-5 w-5 text-orange-500 mr-2" />
                           Sunday: 11:00 AM - 6:00 PM
                         </p>
                       </div>
                     </div>
 
                     <div>
                       <h4 className="text-lg font-semibold text-gray-900 mb-2">Share on Social Media</h4>
                       <div className="flex space-x-4">
                         <button
                           onClick={() => {
                             const text = encodeURIComponent("Check out Shiv Mobile - Your trusted destination for mobile and electronics needs in Silvassa! 🏪\n\n📍 KARCHOND khadkipada DNH&DD Silvassa-396230\n📞 9737485262\n\n#ShivMobile #ElectronicsStore #Silvassa");
                             window.open(`https://www.instagram.com/create/story?text=${text}`, '_blank');
                           }}
                           className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:shadow-lg transform hover:scale-110 transition duration-300"
                         >
                           <svg
                            className="h-6 w-6  transition duration-300"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M7.75 2A5.75 5.75 0 002 7.75v8.5A5.75 5.75 0 007.75 22h8.5A5.75 5.75 0 0022 16.25v-8.5A5.75 5.75 0 0016.25 2h-8.5zM4.5 7.75A3.25 3.25 0 017.75 4.5h8.5a3.25 3.25 0 013.25 3.25v8.5a3.25 3.25 0 01-3.25 3.25h-8.5a3.25 3.25 0 01-3.25-3.25v-8.5zm7.5 1.25a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 1.5a3 3 0 110 6 3 3 0 010-6zm5.25-3a.75.75 0 100 1.5.75.75 0 000-1.5z" />
                          </svg>
                         </button>
 
                         <button
                           onClick={() => {
                             const text = encodeURIComponent("Check out Shiv Mobile - Your trusted destination for mobile and electronics needs in Silvassa! 🏪\n\n📍 KARCHOND khadkipada DNH&DD Silvassa-396230\n📞 9737485262\n\n#ShivMobile #ElectronicsStore #Silvassa");
                             window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
                           }}
                           className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white hover:shadow-lg transform hover:scale-110 transition duration-300"
                         >
                           <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                             <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                           </svg>
                         </button>
 
                         <button
                           onClick={() => {
                             const text = encodeURIComponent("Check out Shiv Mobile - Your trusted destination for mobile and electronics needs in Silvassa! 🏪\n\n📍 KARCHOND khadkipada DNH&DD Silvassa-396230\n📞 9737485262\n\n#ShivMobile #ElectronicsStore #Silvassa");
                             window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${text}`, '_blank');
                           }}
                           className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white hover:shadow-lg transform hover:scale-110 transition duration-300"
                         >
                           <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                             <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                           </svg>
                         </button>
 
                         <button
                           onClick={() => {
                             const text = encodeURIComponent("Check out Shiv Mobile - Your trusted destination for mobile and electronics needs in Silvassa! 🏪\n\n📍 KARCHOND khadkipada DNH&DD Silvassa-396230\n📞 9737485262\n\n#ShivMobile #ElectronicsStore #Silvassa");
                             window.open(`https://wa.me/?text=${text}`, '_blank');
                           }}
                           className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white hover:shadow-lg transform hover:scale-110 transition duration-300"
                         >
                           <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                             <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                           </svg>
                         </button>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
    </div>
  );
};

export default Home; 