import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CarList from './pages/CarList';
import VehicleDetails from './pages/VehicleDetails';

function App() {
  return (
    <Router>
      <div className="font-montserrat text-gray-900 bg-gray-50 min-h-screen">

        <Routes>
          <Route path="/" element={<CarList />} />
          <Route path="/car/:id" element={<VehicleDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
