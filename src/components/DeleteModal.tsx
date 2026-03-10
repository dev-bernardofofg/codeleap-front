import Modal from './Modal';

interface DeleteModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteModal({ onConfirm, onCancel }: DeleteModalProps) {
  return (
    <Modal>
      <h2 className="font-bold text-xl mb-8">Are you sure you want to delete this item?</h2>
      <div className="flex justify-end gap-4">
        <button
          onClick={onCancel}
          className="px-6 py-2 border border-gray-400 rounded-lg text-sm font-semibold hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-6 py-2 bg-danger text-white rounded-lg text-sm font-semibold hover:opacity-80 transition"
        >
          Delete
        </button>
      </div>
    </Modal>
  );
}
