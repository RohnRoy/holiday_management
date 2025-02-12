import React from 'react';

function HolidayList({ holidays, loading, onHolidayClick }) {
  if (loading) {
    return (
      <div className="mt-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
      </div>
    );
  }

  if (!holidays.length) {
    return (
      <div className="mt-8 text-center text-gray-500">
        No holidays found. Try adjusting your search.
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {holidays.map((holiday) => (
        <div
          key={`${holiday.name}-${holiday.date}`}
          className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onHolidayClick(holiday)}
        >
          <h3 className="text-lg font-semibold text-gray-900">
            {holiday.name}
          </h3>
          <p className="text-gray-500">{holiday.date.iso}</p>
          <p className="text-sm text-gray-600 mt-2">
            Type: {holiday.type}
          </p>
        </div>
      ))}
    </div>
  );
}

export default HolidayList;