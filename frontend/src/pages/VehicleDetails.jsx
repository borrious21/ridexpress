import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Check, X, Shield, Clock, Fuel, Settings, Users } from 'lucide-react';
import { cars } from '../data/cars';
import Reviews from '../components/Reviews';

const VehicleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = cars.find(c => c.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!car) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold mb-4">Car not found</h2>
        <button onClick={() => navigate('/')} className="text-blue-600 hover:underline">
          Go back to fleet
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors font-medium">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Fleet
          </Link>
          <div className="font-bold text-xl tracking-tight text-gray-900">
            Ride<span className="text-blue-600">Xpress</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Image and Specs */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Showcase */}
            <div className="bg-white rounded-3xl p-8 flex items-center justify-center min-h-[400px] shadow-sm border border-gray-100 relative group">
              <div className="absolute top-6 left-6 px-4 py-1.5 bg-gray-100 text-gray-800 text-sm font-bold uppercase tracking-wider rounded-lg">
                {car.brand}
              </div>
              <img 
                src={car.image} 
                alt={car.name} 
                className="w-full max-w-2xl object-contain drop-shadow-2xl transform transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Description & Specs */}
            <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About this {car.name}</h2>
              <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                {car.description}
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-6">Technical Specifications</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl">
                  <Fuel className="w-8 h-8 text-blue-500 mb-3" />
                  <span className="text-sm font-medium text-gray-900 text-center">{car.fuel}</span>
                  <span className="text-xs text-gray-500 mt-1">Fuel Type</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl">
                  <Settings className="w-8 h-8 text-blue-500 mb-3" />
                  <span className="text-sm font-medium text-gray-900 text-center">{car.transmission}</span>
                  <span className="text-xs text-gray-500 mt-1">Transmission</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl">
                  <Users className="w-8 h-8 text-blue-500 mb-3" />
                  <span className="text-sm font-medium text-gray-900 text-center">{car.specs[3]}</span>
                  <span className="text-xs text-gray-500 mt-1">Capacity</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl">
                  <Shield className="w-8 h-8 text-blue-500 mb-3" />
                  <span className="text-sm font-medium text-gray-900 text-center">{car.specs[2]}</span>
                  <span className="text-xs text-gray-500 mt-1">Drivetrain</span>
                </div>
              </div>
              
              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {car.specs.map((spec, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>

            {/* Reviews Section */}
            <Reviews carId={car.id} />
          </div>

          {/* Right Column: Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 sticky top-24">
              <div className="mb-2">
                <h1 className="text-3xl font-extrabold text-gray-900">{car.name}</h1>
                <p className="text-blue-600 font-medium">{car.brand}</p>
              </div>

              <div className="flex items-center justify-between py-6 border-b border-gray-100 mb-6">
                <div>
                  <p className="text-sm text-gray-500 font-medium mb-1">Rental Price</p>
                  <p className="text-4xl font-black text-gray-900">${car.pricePerDay}<span className="text-lg text-gray-500 font-normal">/day</span></p>
                </div>
                <div className={`flex items-center px-4 py-2 rounded-full font-bold text-sm ${car.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {car.available ? (
                    <><Check className="w-4 h-4 mr-1.5" /> Available</>
                  ) : (
                    <><X className="w-4 h-4 mr-1.5" /> Not Available</>
                  )}
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <Clock className="w-5 h-5 mr-3 text-blue-500" />
                  <span className="text-sm">Instant confirmation</span>
                </div>
                <div className="flex items-center text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <Shield className="w-5 h-5 mr-3 text-blue-500" />
                  <span className="text-sm">Free cancellation up to 24h</span>
                </div>
              </div>

              <button 
                className={`w-full py-4 rounded-xl font-bold text-lg shadow-md transition-all duration-300 transform active:scale-95 ${
                  car.available 
                    ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-200' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                }`}
                disabled={!car.available}
              >
                {car.available ? 'Proceed to Booking' : 'Currently Unavailable'}
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
