import React from 'react';
import { Dialog } from '@headlessui/react';

function HolidayModal({ holiday, onClose }) {
  return (
    <Dialog
      open={true}
      onClose={onClose}
      className="fixed inset-0 z-10 overflow-y-auto"
    >
      <div className="min-h-screen px-4 text-center">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <Dialog.Title
            as="h3"
            className="text-lg font-medium leading-6 text-gray-900"
          >
            {holiday.name}
          </Dialog.Title>

          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Date: {holiday.date.iso}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Type: {holiday.type}
            </p>
            {holiday.description && (
              <p className="text-sm text-gray-600 mt-4">
                {holiday.description}
              </p>
            )}
          </div>

          <div className="mt-4">
            <button
              type="button"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default HolidayModal;