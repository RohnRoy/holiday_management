import React from 'react';
import { useState } from 'react';
import SearchForm from './components/SearchForm';
import HolidayList from './components/HolidayList';
import HolidayModal from './components/HolidayModal';

function App() {
  const [holidays, setHolidays] = useState([]);
  const [selectedHoliday, setSelectedHoliday] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Holiday Management App
        </h1>
        <SearchForm 
          setHolidays={setHolidays} 
          setLoading={setLoading}
          setError={setError}
        />
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-md mt-4">
            {error}
          </div>
        )}
        <HolidayList 
          holidays={holidays}
          loading={loading}
          onHolidayClick={setSelectedHoliday}
        />
        {selectedHoliday && (
          <HolidayModal
            holiday={selectedHoliday}
            onClose={() => setSelectedHoliday(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;