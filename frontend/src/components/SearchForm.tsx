import React, { useState } from 'react';
import axios from 'axios';
import { Holiday } from '../types/holidays';

interface SearchFormProps {
  setHolidays: (holidays: Holiday[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const COUNTRIES: Record<string, string> = {
  US: 'United States',
  GB: 'United Kingdom',
  CA: 'Canada',
  AU: 'Australia',
  IN: 'India',
  FR: 'France',
  DE: 'Germany',
  IT: 'Italy',
  ES: 'Spain',
  JP: 'Japan'
};

const MONTHS = [
  { value: '', label: 'All Months' },
  { value: '1', label: 'January' },
  { value: '2', label: 'February' },
  { value: '3', label: 'March' },
  { value: '4', label: 'April' },
  { value: '5', label: 'May' },
  { value: '6', label: 'June' },
  { value: '7', label: 'July' },
  { value: '8', label: 'August' },
  { value: '9', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' }
];

const SearchForm: React.FC<SearchFormProps> = ({ setHolidays, setLoading, setError }) => {
  const [country, setCountry] = useState<string>('US');
  const [year, setYear] = useState<string>('2024');
  const [month, setMonth] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let url = `${import.meta.env.VITE_API_URL}/holidays/`;
      if (searchQuery) {
        url = `${import.meta.env.VITE_API_URL}/holidays/search/`;
      }

      const params = {
        country,
        year,
        month,
        ...(searchQuery && { q: searchQuery }),
      };

      const response = await axios.get(url, { params });
      setHolidays(response.data.response.holidays);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch holidays');
      setHolidays([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSearch} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="w-full p-2 border rounded"
        >
          {Object.entries(COUNTRIES).map(([code, name]) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full p-2 border rounded"
        >
          {[2023, 2024, 2025].map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="w-full p-2 border rounded"
        >
          {MONTHS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search holidays..."
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Search Holidays
      </button>
    </form>
  );
};

export default SearchForm;