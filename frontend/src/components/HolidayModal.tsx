import React from 'react';
import { Dialog } from '@headlessui/react';
import { Holiday } from '../types/holiday';

interface HolidayModalProps {
  holiday: Holiday;
  onClose: () => void;
}

const HolidayModal: React.FC<HolidayModalProps> = ({ holiday, onClose }) => {
  return (
    <Dialog
      open={true}
      onClose={onClose}
      className="fixed inset-0 z-10 overflow-y-auto"
    >
      <div className="min-h-screen px-4 text-center">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="inline-block w-full max-w-md p-6 my-8 text-left align-middle bg-white shadow-xl rounded-lg">
          <Dialog.Title
            as="h3"
            className="text-lg font-medium text-gray-900"
          >
            {holiday.name}
          </Dialog.Title>

          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Date: {holiday.date.iso}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Type: {holiday.type[0]}
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
              className="px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 rounded hover:bg-blue-200"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default HolidayModal;