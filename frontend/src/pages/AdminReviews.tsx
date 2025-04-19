import React, { useState, useEffect } from 'react';
import { getReviews, deleteReview } from '../services/reviewService';
import { Loader2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface Review {
  _id: string;
  name: string;
  email: string;
  rating: number;
  comment: string;
  photos?: string[];
  createdAt: string;
  profilePhoto?: string;
}

const AdminReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewMore = (review: Review) => {
    setSelectedReview(review);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedReview(null);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviews();
        setReviews(data);
      } catch (error) {
        toast.error('Failed to fetch reviews');
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await deleteReview(id);
        setReviews(reviews.filter(review => review._id !== id));
        toast.success('Review deleted successfully');
      } catch (error) {
        toast.error('Failed to delete review');
        console.error('Error deleting review:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Reviews</h1>

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="hidden md:table w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Comment</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reviews.map((review) => (
              <tr key={review._id}>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{review.name}</div>
                  <div className="text-sm text-gray-500">{review.email}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927..." />
                      </svg>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 max-w-xs truncate">{review.comment}</td>
                <td className="px-6 py-4">{new Date(review.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleDelete(review._id)} className="text-red-600 hover:text-red-900">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
            
          </tbody>
        </table>
        { reviews.length <= 0 && (
                  <>
                    <div className="text-center text-gray-500">
                      <h3 className="text-lg font-semibold">No reviews found</h3>
                    </div>

                  </>
                )}
        {/* Mobile Card View */}
        <div className="md:hidden space-y-4 p-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="border rounded-lg p-4 shadow-sm bg-white min-h-[154px] flex flex-col justify-between"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-base font-semibold">{review.name}</h4>
                  <p className="text-sm text-gray-500">{review.email}</p>
                </div>
                <button
                  onClick={() => handleDelete(review._id)}
                  className="text-red-600"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>

              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927..." />
                  </svg>
                ))}
              </div>

              <p className="text-sm text-gray-700 line-clamp-3">{review.comment}</p>

              <button
                onClick={() => handleViewMore(review)}
                className="text-sm text-orange-600 underline mt-2 text-left"
              >
                View More
              </button>

              <div className="text-xs text-gray-500 text-right mt-1">
                {new Date(review.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>

        {showModal && selectedReview && (
          <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6 relative shadow-xl">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                  <img
                    src={selectedReview.profilePhoto || '/default-avatar.png'}
                    alt={selectedReview.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{selectedReview.name}</h4>
                  <p className="text-sm text-gray-500">{selectedReview.email}</p>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-4 w-4 ${i < selectedReview.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927..." />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-4 text-sm leading-relaxed">{selectedReview.comment}</p>

              {selectedReview.photos && selectedReview.photos.length > 0 && (
                <div className="mt-4">
                  <img
                    src={selectedReview.photos[0]}
                    alt="Review Photo"
                    className="rounded-md w-full object-contain max-h-60"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>

  );
};

export default AdminReviews; 