import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { initialReviews } from '../data/cars';

const Reviews = ({ carId }) => {
  const [reviews, setReviews] = useState(initialReviews.filter(r => r.carId === carId));
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;

    const reviewToAdd = {
      id: Date.now(),
      carId,
      name: newReview.name,
      rating: Number(newReview.rating),
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0]
    };

    setReviews([reviewToAdd, ...reviews]);
    setNewReview({ name: '', rating: 5, comment: '' });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h3>
      
      {/* Summary */}
      <div className="flex items-center gap-4 mb-8 p-4 bg-gray-50 rounded-xl">
        <div className="text-4xl font-black text-gray-900">{averageRating}</div>
        <div>
          <div className="flex items-center gap-1 mb-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star} 
                className={`w-5 h-5 ${star <= Math.round(averageRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <p className="text-sm text-gray-500">Based on {reviews.length} reviews</p>
        </div>
      </div>

      {/* Add Review Form */}
      <div className="mb-10 pb-10 border-b border-gray-100">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Write a Review</h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
              <input 
                type="text" 
                value={newReview.name}
                onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
              <select 
                value={newReview.rating}
                onChange={(e) => setNewReview({...newReview, rating: e.target.value})}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
              >
                <option value="5">5 Stars - Excellent</option>
                <option value="4">4 Stars - Very Good</option>
                <option value="3">3 Stars - Average</option>
                <option value="2">2 Stars - Poor</option>
                <option value="1">1 Star - Terrible</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
            <textarea 
              value={newReview.comment}
              onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              rows="3"
              placeholder="Tell us about your experience..."
              required
            ></textarea>
          </div>
          <button 
            type="submit"
            className="px-6 py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors shadow-sm"
          >
            Submit Review
          </button>
        </form>
      </div>

      {/* Review List */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No reviews yet. Be the first to review this car!</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="border border-gray-100 rounded-xl p-5 hover:shadow-sm transition-shadow bg-white">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h5 className="font-semibold text-gray-900">{review.name}</h5>
                  <p className="text-xs text-gray-500">{review.date}</p>
                </div>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`w-4 h-4 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} 
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Reviews;
