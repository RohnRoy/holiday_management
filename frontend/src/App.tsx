import { useState } from 'react';
import SearchForm from './components/SearchForm';
import HolidayList from './components/HolidayList';
import HolidayModal from './components/HolidayModal';
import { Holiday } from './types/holiday';

function App() {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [selectedHoliday, setSelectedHoliday] = useState<Holiday | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Holiday Management App
        </h1>
        <SearchForm 
          setHolidays={setHolidays} 
          setLoading={setLoading}
          setError={setError}
        />
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded mt-4">
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