import React, { useState } from 'react';
import axios from 'axios';
import { Holiday } from '../types/holidays';
import '../styles/components/SearchForm.css';

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
      const baseUrl = import.meta.env.VITE_API_URL;
      if (!baseUrl) {
        throw new Error('API URL not configured');
      }

      let url = `${baseUrl}/holidays/`;
      if (searchQuery) {
        url = `${baseUrl}/holidays/search/`;
      }

      const params = {
        country,
        year,
        ...(month && { month }),
        ...(searchQuery && { q: searchQuery }),
      };

      const response = await axios.get(url, { params });
      if (!response.data.response?.holidays) {
        throw new Error('Invalid response format');
      }
      setHolidays(response.data.response.holidays);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.error || error.message);
      } else {
        setError(error instanceof Error ? error.message : 'Failed to fetch holidays');
      }
      setHolidays([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-form">
      <div className="search-form-grid">
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="form-input"
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
          className="form-input"
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
          className="form-input"
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
          className="form-input"
        />
      </div>

      <button
        type="submit"
        className="search-button"
      >
        Search Holidays
      </button>
    </form>
  );
};

export default SearchForm;