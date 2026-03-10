import { useState, type FormEvent } from 'react';
import type { Post } from '../types/post';
import Modal from './Modal';
import FormField from './FormField';

interface EditModalProps {
  post: Post;
  onSave: (title: string, content: string) => Promise<void>;
  onCancel: () => void;
}

export default function EditModal({ post, onSave, onCancel }: EditModalProps) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setLoading(true);
    try {
      await onSave(title.trim(), content.trim());
    } finally {
      setLoading(false);
    }
  }

  const isDisabled = !title.trim() || !content.trim() || loading;

  return (
    <Modal>
      <h2 className="font-bold text-xl mb-6">Edit item</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormField label="Title">
          <input
            type="text"
            placeholder="Hello world"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary transition"
          />
        </FormField>

        <FormField label="Content">
          <textarea
            placeholder="Content here"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary transition resize-none"
          />
        </FormField>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-400 rounded-lg text-sm font-semibold hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isDisabled}
            className="px-6 py-2 bg-success text-white rounded-lg text-sm font-semibold hover:opacity-80 transition
              disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
