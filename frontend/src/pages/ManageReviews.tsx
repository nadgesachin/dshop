import { useState, useEffect } from 'react';
import { Star, Trash2, CheckCircle2, Ban } from 'lucide-react';
import { getReviews } from '@/services/reviewService';
import toast from 'react-hot-toast';

interface Review {
  _id: string;
  name: string;
  product: string;
  comment: string;
  rating: number;
  photos?: string[];
  createdAt: string;
}


const ManageReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
        try {
            const res = await getReviews();
            console.log("res",res);
            setReviews(res);
            toast.success('Reviews fetched successfully');
        } catch (error) {
            setReviews([]);
            console.error('Error fetching reviews:', error);
            toast.error('Error fetching reviews');
        }
    };
    fetchReviews();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Manage Reviews</h1>
          <p className="text-lg text-gray-600 mt-2">Review, approve, or remove customer reviews</p>
        </div>

        {reviews.length === 0 ? (
          <p className="text-center text-gray-500">No reviews found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col justify-between h-full"
              >
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={review.photos?.[0]}
                    alt={review.name}
                    className="h-12 w-12 rounded-full object-cover shadow"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{review.name}</h3>
                    <p className="text-sm text-gray-500">Product: {review.product}</p>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{review.comment}</p>

                <div className="flex justify-end space-x-3">
                  <button className="flex items-center gap-1 px-3 py-1 text-sm rounded-md text-green-600 hover:bg-green-50">
                    <CheckCircle2 className="h-4 w-4" /> Approve
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1 text-sm rounded-md text-yellow-600 hover:bg-yellow-50">
                    <Ban className="h-4 w-4" /> Reject
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1 text-sm rounded-md text-red-600 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageReviews;
