import React, { useState, useEffect } from 'react';
import { Star, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { submitReview, getReviews, Review } from '../services/reviewService';

const Reviews = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [product, setProduct] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const fetchedReviews = await getReviews();
      setReviews(fetchedReviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Failed to fetch reviews');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('rating', rating.toString());
      formData.append('product', product);
      formData.append('comment', review);
  
      photos.forEach((photo) => {
        formData.append('photos', photo); // backend should accept an array of 'photos'
      });
  
      await submitReview(formData);
      toast.success('Review submitted successfully!');
  
      // Reset form
      setRating(0);
      setReview('');
      setEmail('');
      setName('');
      setProduct('');
      setPhotos([]);
  
      await fetchReviews();
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };  

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files));
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Customer Reviews</h1>

        {/* Review Submission Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">Write a Review</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-800 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 bg-gray-100 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-800 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 bg-gray-100 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-800 mb-2">Product</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 bg-gray-100 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-800 mb-2">Rating</label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-8 w-8 transition duration-150 ${
                        star <= rating ? 'text-yellow-400 fill-current drop-shadow-md' : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-800 mb-2">Your Review</label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 bg-gray-100 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                rows={4}
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-800 mb-2">Photos (optional)</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoChange}
                className="w-full px-4 py-2 border border-gray-300 bg-gray-100 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-orange-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:scale-105 hover:shadow-lg transition duration-300 flex items-center justify-center disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'} <Send className="ml-2" />
            </button>
          </form>
        </div>


        {/* Existing Reviews */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Customer Reviews</h2>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review._id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  {/* Profile Image from review.photos[0] */}
                  <img
                    src={review.photos && review.photos.length > 0 ? review.photos[0] : '/default-avatar.png'}
                    alt={`${review.name} profile`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
            
                  <div>
                    <h3 className="text-lg font-semibold">{review.name}</h3>
                    <p className="text-gray-500 text-sm">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
            
                {/* Rating Stars */}
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            
              {/* Comment */}
              <p className="text-gray-600">{review.comment}</p>
            </div>
            
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews; 