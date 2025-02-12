import React, { useState } from 'react';
import { Holiday } from '../types/holidays';
import '../styles/components/HolidayList.css';

const ITEMS_PER_PAGE = 10;

interface HolidayListProps {
  holidays: Holiday[];
  loading: boolean;
  onHolidayClick: (holiday: Holiday) => void;
}

const HolidayList: React.FC<HolidayListProps> = ({ holidays, loading, onHolidayClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading holidays...</p>
      </div>
    );
  }

  if (!Array.isArray(holidays) || !holidays.length) {
    return (
      <div className="no-holidays">
        No holidays found. Try adjusting your search criteria.
      </div>
    );
  }

  const totalPages = Math.ceil(holidays.length / ITEMS_PER_PAGE);
  const paginatedHolidays = holidays.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="holiday-container">
      <div className="table-responsive">
        <table className="holiday-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {paginatedHolidays.map((holiday) => (
              <tr
                key={`${holiday.name}-${holiday.date.iso}`}
                onClick={() => onHolidayClick(holiday)}
                className="holiday-row"
              >
                <td className="holiday-name">{holiday.name}</td>
                <td className="holiday-date">{holiday.date.iso}</td>
                <td className="holiday-type">{holiday.type[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`pagination-button ${
                currentPage === page ? 'active' : ''
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default HolidayList;