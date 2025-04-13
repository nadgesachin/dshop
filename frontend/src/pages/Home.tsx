import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, MapPin, Phone, Mail, Clock, User, MessageSquare, ShoppingBag, Bell, X } from 'lucide-react';
import { submitReview, getReviews, Review, fetchReviews } from '../services/reviewService';
import { getAllProducts } from '../services/productService';
import toast from 'react-hot-toast';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useAuth } from '../contexts/AuthContext';
import { signupUser, getUser } from '@/services/signupService';
import { uploadImage } from '@/services/upload';

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const handleViewMore = (review: any) => setSelectedReview(review);
  const closeModal = () => setSelectedReview(null);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    email: '',
    rating: 0,
    product: '',
    comment: '',
    profilePhoto: null,
    photos: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);
  const [email, setEmail] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string | null>(null);
  const [photosUrl, setPhotosUrl] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { isAuthenticated } = useAuth();
  const [allReviews, setAllReviews] = useState<Review[]>([]);
  const [reviewsPerPage] = useState(5); // Number of reviews per page
  const [showAllReviewsModal, setShowAllReviewsModal] = useState(false);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getAllProducts();
      console.log("products", products);
      setProducts(products);
    };
    fetchProducts();
  }, []);

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

  // const products = [
  //   {
  //     id: 1,
  //     name: 'iPhone 14 Pro Max',
  //     price: '₹129,999',
  //     image: 'https://images.unsplash.com/photo-1678652172431-1880a5c1e86a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  //     rating: 4.8,
  //     reviews: 120
  //   },
  //   {
  //     id: 2,
  //     name: 'MacBook Pro M2',
  //     price: '₹199,999',
  //     image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  //     rating: 4.9,
  //     reviews: 85
  //   },
  //   {
  //     id: 3,
  //     name: 'Samsung Galaxy S23 Ultra',
  //     price: '₹124,999',
  //     image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  //     rating: 4.7,
  //     reviews: 95
  //   },
  //   {
  //     id: 4,
  //     name: 'Sony WH-1000XM5',
  //     price: '₹29,990',
  //     image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  //     rating: 4.9,
  //     reviews: 150
  //   },
  //   {
  //     id: 5,
  //     name: 'Apple Watch Series 8',
  //     price: '₹45,900',
  //     image: 'https://images.unsplash.com/photo-1655720828018-edd2daec9349?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  //     rating: 4.6,
  //     reviews: 75
  //   },
  //   {
  //     id: 6,
  //     name: 'iPad Pro M2',
  //     price: '₹89,900',
  //     image: 'https://images.unsplash.com/photo-1629131726699-1ecedb164b6a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  //     rating: 4.8,
  //     reviews: 60
  //   }
  // ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,

    // 👇 Custom dot appearance
    customPaging: () => (
      <div className="w-4 h-4 bg-gray-300 rounded-full transition hover:bg-orange-500" />
    ),
    appendDots: (dots: any) => (
      <div>
        <ul className="flex justify-center gap-2 mt-3">{dots}</ul>
      </div>
    ),
  };

  const settingsProduct = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1, // Change this to 1 for smaller screens
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 768, // Adjust for tablet and mobile
        settings: {
          slidesToShow: 1, // Show 1 product on smaller screens
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2, // Show 2 products on larger screens
        },
      },
    ],
  };

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

  const productSliderRef = useRef<Slider | null>(null);

  const nextProductSlide = () => {
    productSliderRef.current?.slickNext();
  };

  const prevProductSlide = () => {
    productSliderRef.current?.slickPrev();
  };
  // Fetch reviews on component mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const fetchedReviews = await getReviews();
        setReviews(fetchedReviews || []);
        setAllReviews(fetchedReviews || []); // Store all reviews for pagination
      } catch (error) {
        console.error('Error fetching reviews:', error);
        toast.error("Error fetching reviews");
        setReviews([]);
      }
    };
    fetchReviews();
  }, []);

  // Handle pagination
  const totalPages = Math.ceil(allReviews.length / reviewsPerPage);
  const handleViewAllReviews = () => {
    setShowAllReviewsModal(true);
  };

  const [currentPageTest, setCurrentPageTest] = useState(1);
  const [currentReviewsTest, setCurrentReviewsTest] = useState<Review[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (showAllReviewsModal) {
      // Initial fetch on modal open
      loadReviews(currentPageTest);
    }
  }, [showAllReviewsModal]);

  const loadReviews = async (page: number, direction = 'down') => {
    setLoadingMore(true);

    const container = scrollContainerRef.current as HTMLElement | null;
    const prevScrollHeight = container?.scrollHeight;

    const res = await fetchReviews(page); // Fetches reviews from API

    console.log("res", res);
    setCurrentReviewsTest(prev =>
      direction === 'up' ? [...res.reviews, ...prev] : [...prev, ...res.reviews]
    );

    setCurrentPageTest(page);

    // Restore scroll position for upward loading
    if (direction === 'up' && container) {
      setTimeout(() => {
        const newScrollHeight = container.scrollHeight;
        container.scrollTop = newScrollHeight - (prevScrollHeight || 0);
      }, 50);
    }

    setLoadingMore(false);
  };

  const handleScroll = async (e: any) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;

    const isBottom = scrollTop + clientHeight >= scrollHeight - 5;
    const isTop = scrollTop <= 5;

    if (isBottom && currentPageTest < totalPages && !loadingMore) {
      await loadReviews(currentPageTest + 1, 'down');
    }

    if (isTop && currentPageTest > 1 && !loadingMore) {
      await loadReviews(currentPageTest - 1, 'up');
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      setIsSubmitting(true);
      let formData: any = {};
      if (!isAuthenticated) {
        // Append user details only if not logged in
        try {
          const user = await signupUser({
            name: reviewForm.name,
            email: reviewForm.email,
            photo: profilePhotoUrl,
            dob: '',
            password: ''
          });
          toast.success('User created successfully');
          localStorage.setItem('token', user.token);
          const userData = await getUser(user.token);
          console.log("userData", userData);
          formData = {
            name: userData.user.name,
            email: userData.user.email,
          }
        } catch (error) {
          console.error('Error creating user:', error);
          toast.error('Error creating user');
          return;
        }
      } else {
        const token = localStorage.getItem('token');
        const userData = await getUser(token);
        formData = {
          name: userData.user.name,
          email: userData.user.email,
        }
      }

      // Append review details
      formData.rating = reviewForm.rating.toString();
      formData.product = reviewForm.product;
      formData.comment = reviewForm.comment;
      formData.photos = [];
      formData.profilePhoto = null;
      // Append files correctly
      if (profilePhotoUrl) {
        formData.profilePhoto = profilePhotoUrl;
      }
      photosUrl.forEach(photo => {
        formData.photos.push(photo);
      });

      console.log("formData", formData);
      const newReview = await submitReview(formData);
      setReviews(prevReviews => [newReview, ...prevReviews]);

      // Reset form
      setReviewForm({
        name: '',
        email: '',
        rating: 0,
        product: '',
        comment: '',
        profilePhoto: null,
        photos: []
      });
      toast.success("Submitted your valuable review");
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error("Error submitting review");
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = async (file: File | File[] | null, type: 'profilePhoto' | 'photos') => {
    if (!file) return;
    try {
      setIsUploading(true);
      const formData = new FormData();
      if (type === 'profilePhoto') {
        formData.append('profilePhoto', file as File);
        const result = await uploadImage(formData);
        setProfilePhotoUrl(result.url);
      } else {
        if (Array.isArray(file)) {
          file.forEach(photo => {
            formData.append('photos', photo);
          });
        } else {
          formData.append('photos', file);
        }
        const result = await uploadImage(formData);
        setPhotosUrl(prevPhotos => [...prevPhotos, result.url]);
      }
      setIsUploading(false);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const hendleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>, type: 'profilePhoto' | 'photos') => {
    if (type === 'profilePhoto') {
      const file = e.target.files?.[0] || null;
      await handleImageUpload(file, 'profilePhoto');
    } else {
      const files = Array.from(e.target.files || []);
      files.forEach(async (file) => {
        await handleImageUpload(file, 'photos');
      });
    }
    e.target.files = null;
  }
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
    if (showAllReviewsModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showAllReviewsModal]);

  useEffect(() => {
    if (selectedReview) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedReview]);


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
                  className={`w-2 h-2 rounded-full transition duration-300 ${index === currentSlide ? 'bg-orange-500 w-4' : 'bg-white/50'
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
          <h2 className="text-3xl font-extrabold text-gray-900">Products</h2>
        </div>

        <div className="relative overflow-hidden">
        <Slider ref={productSliderRef} {...settingsProduct}>
            {products.map((product) => (
              <div key={product._id} className="w-full sm:w-1/2 md:w-1/3 flex-shrink-0 px-4">
                <Link
                  to={`/products/${product._id}`}
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
          </Slider>

        {/* Arrow Buttons (Centered Vertically on Slider) */}
        <div className="absolute inset-y-0 left-0 flex items-center z-10">
          <button
            onClick={prevProductSlide}
            className="ml-2 p-2 rounded-full bg-white hover:bg-gray-100 transition duration-300 shadow-md"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <div className="absolute inset-y-0 right-0 flex items-center z-10">
          <button
            onClick={nextProductSlide}
            className="mr-2 p-2 rounded-full bg-white hover:bg-gray-100 transition duration-300 shadow-md"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-extrabold text-gray-900">What Our Customers Say</h2>
            <p className="mt-4 text-lg text-gray-600">Real feedback from our happy customers</p>
          </div>

          <Slider {...settings}>
            {reviews.map((review) => (
              <div key={review._id} className="px-2">
                <div className="max-w-3xl mx-auto bg-white rounded-lg p-6 shadow-lg transition duration-300 hover:scale-[1.015] h-[210px] flex flex-col justify-between">
                  {/* Top Section */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <img
                        src={review.photos?.[0] || defaultAvatar}
                        alt={`${review.name} profile`}
                        className="w-10 h-10 rounded-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = defaultAvatar;
                        }}
                      />
                      <div>
                        <h3 className="text-lg font-semibold">{review.name}</h3>
                        <p className="text-gray-500 text-sm">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Comment Section */}
                  <div className="text-gray-600 text-md line-clamp-4">{review.comment}</div>

                  {/* View More Button */}
                  <div className="pt-3">
                    <button
                      onClick={() => handleViewMore(review)}
                      className="text-sm text-orange-500 hover:underline"
                    >
                      View More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>

          {/* View All Reviews Button */}
          <div className="text-center mt-6">
            <button
              onClick={handleViewAllReviews}
              className="inline-block px-6 py-3 text-white bg-orange-500 hover:bg-orange-600 rounded-full text-base font-semibold transition"
            >
              View All Reviews
            </button>
          </div>

          {/* Modal for All Reviews */}
          {showAllReviewsModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white max-w-2xl w-full rounded-xl p-6 relative shadow-2xl">
                <button
                  onClick={() => setShowAllReviewsModal(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>

                <h3 className="text-lg font-semibold text-gray-800 mb-4">All Customer Reviews</h3>

                <div
                  ref={scrollContainerRef}
                  onScroll={handleScroll}
                  className="h-[400px] overflow-y-auto space-y-4 pr-2"
                >
                  {currentReviewsTest.map((review, index) => (
                    <div key={`${review._id}-${index}`} className="bg-gray-100 p-4 rounded-lg">
                      <h4 className="font-semibold">{review.name}</h4>
                      <div className="flex mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}

                  {loadingMore && (
                    <div className="text-center text-sm text-gray-500">Loading...</div>
                  )}
                </div>
              </div>
            </div>
          )}
          {/* Modal */}
          {selectedReview && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white max-w-2xl w-full rounded-xl p-6 relative shadow-2xl">
                <button
                  onClick={closeModal}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="flex items-center gap-4 mb-4">
                  <div className="h-14 w-14 rounded-full overflow-hidden bg-gray-100 shadow">
                    <img
                      src={selectedReview.photos?.[0] || defaultAvatar}
                      alt={selectedReview.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{selectedReview.name}</h3>
                    <p className="text-sm text-gray-500">Product: {selectedReview.product}</p>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < selectedReview.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-gray-700 text-base leading-relaxed mb-4">
                  {selectedReview.comment}
                </div>

                {selectedReview.photos?.[0] && (
                  <div className="mt-4">
                    <img
                      src={selectedReview.photos[0]}
                      alt="Review Image"
                      className="rounded-lg w-full object-cover max-h-[300px]"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

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
                  {
                    !isAuthenticated ? (
                      <>
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
                      </>
                    ) : (
                      <>
                      </>
                    )
                  }

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
                          <option key={product.id} value={product.name}>
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
                            className={`h-8 w-8 ${star <= reviewForm.rating
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

                  {
                    !isAuthenticated ? (
                      <>
                        {/* Profile Photo */}
                        <div>
                          <label htmlFor="profilePhoto" className="block text-sm font-medium text-gray-700 mb-1">
                            User Profile Photo (Optional)
                          </label>
                          <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-3 text-center hover:border-orange-400 transition">
                            <input
                              type="file"
                              id="profilePhoto"
                              name="profilePhoto"
                              accept="image/*"
                              onChange={(e) => {
                                hendleChangeImage(e, 'profilePhoto')
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

                          {profilePhotoUrl && (
                            <div className="mt-4">
                              <p className="text-sm text-gray-600">Selected files:</p>
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
                        </div>
                      </>
                    ) : (
                      <>
                      </>
                    )
                  }

                  {/* Review Photos */}
                  <div>
                    <label htmlFor="photos" className="block text-sm font-medium text-gray-700 mb-1">
                      Review Photos (Optional)
                    </label>
                    <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-3 text-center hover:border-orange-400 transition">
                      <input
                        type="file"
                        id="photos"
                        name="photos"
                        multiple
                        accept="image/*"
                        onChange={(e) => {
                          hendleChangeImage(e, 'photos')
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

                    {photosUrl.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-600">Selected files:</p>
                        <ul className="mt-2 space-y-1 text-sm text-gray-500">
                          {photosUrl.map((url, index) => (
                            <li key={index} className="flex items-center justify-between">
                              <span className="truncate">{url}</span>
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

      {/* create model for loading when isLoading is true */}
      {isLoading && (
        <div className="fixed inset-0 z-[99999] bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-2xl px-8 py-10 w-full max-w-sm relative animate-fade-in">
            {/* Close Button */}
            <button
              onClick={() => setIsLoading(false)}
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
              <p className="text-gray-600 font-medium text-base tracking-wide">Loading... Please wait</p>
            </div>
          </div>
        </div>
      )}

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

      {/* Floating Newsletter Button */}
      {
        !isAuthenticated && (
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
        )
      }

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

export default Home; 