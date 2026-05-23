import React, { useState } from 'react';
import { cars } from '../data/cars';
import VehicleCard from '../components/VehicleCard';

const CarList = () => {
  const [filter, setFilter] = useState('All');
  
  const brands = ['All', ...new Set(cars.map(car => car.brand))];
  
  const filteredCars = filter === 'All' ? cars : cars.filter(car => car.brand === filter);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Our Premium Fleet</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Choose from our wide selection of luxury and premium vehicles. Experience comfort and performance like never before.
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {brands.map(brand => (
            <button
              key={brand}
              onClick={() => setFilter(brand)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === brand 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-200 transform scale-105' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-200'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>

        {/* Car Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCars.map(car => (
            <VehicleCard key={car.id} car={car} />
          ))}
        </div>
        
        {filteredCars.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No vehicles found for this brand.
          </div>
        )}
      </div>
    </div>
  );
};

export default CarList;
