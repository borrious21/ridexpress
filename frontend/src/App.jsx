import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CarList from './pages/CarList';
import VehicleDetails from './pages/VehicleDetails';

function App() {
  return (
    <Router>
      <div className="font-montserrat text-gray-900 bg-gray-50 min-h-screen">
        {/* Simple Navbar */}
        <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl leading-none">R</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-900">
                Ride<span className="text-blue-600">Xpress</span>
              </span>
            </div>
            <div className="flex gap-4">
              <span className="text-sm font-medium text-gray-500 hidden sm:block">Intern Project</span>
              <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Salin Limbu</span>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<CarList />} />
          <Route path="/car/:id" element={<VehicleDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
