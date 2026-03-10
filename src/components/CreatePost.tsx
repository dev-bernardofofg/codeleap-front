import { useState, type FormEvent } from 'react';
import FormField from './FormField';

interface CreatePostProps {
  onSubmit: (title: string, content: string) => Promise<unknown>;
}

export default function CreatePost({ onSubmit }: CreatePostProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setLoading(true);
    try {
      await onSubmit(title.trim(), content.trim());
      setTitle('');
      setContent('');
    } finally {
      setLoading(false);
    }
  }

  const isDisabled = !title.trim() || !content.trim() || loading;

  return (
    <div className="bg-white rounded-2xl p-6 mb-6">
      <h2 className="font-bold text-xl mb-6">What's on your mind?</h2>

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

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isDisabled}
            className="px-6 py-2 rounded-lg text-white text-sm font-semibold transition
              bg-primary hover:bg-blue-500
              disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'CREATE'}
          </button>
        </div>
      </form>
    </div>
  );
}
