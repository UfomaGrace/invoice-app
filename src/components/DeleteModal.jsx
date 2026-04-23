import { X } from 'lucide-react';

export default function DeleteModal({ isOpen, onClose, onConfirm, invoiceId }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-[#1e1b4b] rounded-3xl w-full max-w-md p-8 text-center">
        
        <h3 className="text-2xl font-bold dark:text-white mb-4">Confirm Deletion</h3>
        
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Are you sure you want to delete invoice #{invoiceId}? <br />
          This action cannot be undone.
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={onClose}
            className="px-8 py-3 text-gray-600 dark:text-gray-400 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl transition-colors"
          >
            Cancel
          </button>
          
          <button
            onClick={onConfirm}
            className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-2xl transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}