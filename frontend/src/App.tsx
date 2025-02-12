import { useState } from 'react';
import SearchForm from './components/SearchForm';
import HolidayList from './components/HolidayList';
import HolidayModal from './components/HolidayModal';
import { Holiday } from './types/holidays';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [selectedHoliday, setSelectedHoliday] = useState<Holiday | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <ErrorBoundary>
      <div className="app">
        <div className="container">
          <h1 className="title">Holiday Management App</h1>
          <SearchForm 
            setHolidays={setHolidays} 
            setLoading={setLoading}
            setError={setError}
          />
          {error && (
            <div className="error-message" role="alert">
              <span className="error-icon">⚠️</span>
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
    </ErrorBoundary>
  );
}

export default App;