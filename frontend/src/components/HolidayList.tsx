import React from 'react';
import { Holiday } from '../types/holidays';
import '../styles/components/HolidayList.css';

interface HolidayListProps {
  holidays: Holiday[];
  loading: boolean;
  onHolidayClick: (holiday: Holiday) => void;
}

const HolidayList: React.FC<HolidayListProps> = ({ holidays, loading, onHolidayClick }) => {
  if (loading) {
    return (
      <div className="mt-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading holidays...</p>
      </div>
    );
  }

  if (!Array.isArray(holidays) || !holidays.length) {
    return (
      <div className="mt-8 text-center text-gray-500">
        No holidays found. Try adjusting your search criteria.
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {holidays.map((holiday) => (
        <div
          key={`${holiday.name}-${holiday.date.iso}`}
          className="bg-white rounded shadow p-6 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onHolidayClick(holiday)}
        >
          <h3 className="text-lg font-semibold text-gray-900">
            {holiday.name}
          </h3>
          <p className="text-gray-500">{holiday.date.iso}</p>
          <p className="text-sm text-gray-600 mt-2">
            Type: {holiday.type[0]}
          </p>
        </div>
      ))}
    </div>
  );
};

export default HolidayList;