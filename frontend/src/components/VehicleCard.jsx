import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const VehicleCard = ({ car }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center w-full border border-gray-100 relative group overflow-hidden">
      
      {/* Availability Badge */}
      <div className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full z-10 ${
        car.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
      }`}>
        {car.available ? 'Available' : 'Booked'}
      </div>

      <div className="w-full h-48 mb-4 relative flex justify-center items-center overflow-hidden rounded-lg bg-gray-50/50 p-4">
        {/* Only images that exist locally or URLs */}
        <img 
          src={car.image} 
          alt={car.name}
          className="w-full h-full object-contain transform transition-transform duration-500 group-hover:scale-110 drop-shadow-md" 
        />
      </div>

      <div className="w-full text-left">
        <div className="flex justify-between items-start mb-1">
          <div>
            <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-1">{car.brand}</p>
            <h2 className="text-xl font-bold text-gray-800">{car.name}</h2>
          </div>
        </div>

        <div className="flex items-center gap-1 mb-3">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium text-gray-700">{car.rating}</span>
          <span className="text-sm text-gray-400">({car.reviewsCount} reviews)</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <span className="bg-gray-100 px-2 py-1 rounded-md">{car.fuel}</span>
          <span className="text-gray-300">•</span>
          <span className="bg-gray-100 px-2 py-1 rounded-md">{car.transmission}</span>
        </div>

        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
          <div>
            <p className="text-sm text-gray-500">Price</p>
            <p className="text-lg font-bold text-gray-900">${car.pricePerDay}<span className="text-sm font-normal text-gray-500">/day</span></p>
          </div>
          
          <Link to={`/car/${car.id}`}>
            <button className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all duration-300 transform active:scale-95">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
