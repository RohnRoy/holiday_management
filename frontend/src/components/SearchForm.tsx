import React, { useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';
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

const HOLIDAY_TYPES = [
  { value: '', label: 'All Types' },
  { value: 'national', label: 'National' },
  { value: 'religious', label: 'Religious' },
  { value: 'observance', label: 'Observance' },
];

const SearchForm: React.FC<SearchFormProps> = ({ setHolidays, setLoading, setError }) => {
  const [country, setCountry] = useState<string>('US');
  const [year, setYear] = useState<string>('2024');
  const [month, setMonth] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoadingState] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [type, setType] = useState<string>('');

  const debouncedSearch = useMemo(
    () =>
      debounce(async (searchParams) => {
        try {
          setLoading(true);
          setError(null);
          
          const baseUrl = import.meta.env.VITE_API_URL;
          if (!baseUrl) throw new Error('API URL not configured');

          const url = searchParams.q ? 
            `${baseUrl}/holidays/search/` : 
            `${baseUrl}/holidays/`;

          const response = await axios.get(url, { params: searchParams });
          
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
      }, 300),
    [setHolidays, setLoading, setError]
  );

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const params = {
      country,
      year,
      ...(month && { month }),
      ...(searchQuery && { q: searchQuery }),
      ...(startDate && { start_date: startDate }),
      ...(endDate && { end_date: endDate }),
      ...(type && { type }),
    };
    debouncedSearch(params);
  }, [country, year, month, searchQuery, startDate, endDate, type, debouncedSearch]);

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

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="form-input"
        >
          {HOLIDAY_TYPES.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="form-input"
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="form-input"
        />
      </div>

      <button
        type="submit"
        className="search-button"
        disabled={loading}
      >
        {loading ? 'Searching...' : 'Search Holidays'}
      </button>
    </form>
  );
};

export default React.memo(SearchForm);