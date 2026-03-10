import type { Post } from '../api/posts';
import { timeAgo } from '../utils/timeAgo';

interface PostCardProps {
  post: Post;
  isOwner: boolean;
  onDelete: (post: Post) => void;
  onEdit: (post: Post) => void;
}

export default function PostCard({ post, isOwner, onDelete, onEdit }: PostCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden mb-6">
      {/* Card Header */}
      <div className="bg-primary px-6 py-4 flex items-center justify-between">
        <h3 className="text-white font-bold text-lg leading-tight">{post.title}</h3>

        {isOwner && (
          <div className="flex items-center gap-4">
            {/* Delete Icon */}
            <button
              onClick={() => onDelete(post)}
              aria-label="Delete post"
              className="text-white hover:opacity-70 transition"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14H6L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4h6v2" />
              </svg>
            </button>

            {/* Edit Icon */}
            <button
              onClick={() => onEdit(post)}
              aria-label="Edit post"
              className="text-white hover:opacity-70 transition"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <span className="font-bold text-gray-800">@{post.username}</span>
          <span className="text-sm text-gray-500">{timeAgo(post.created_datetime)}</span>
        </div>
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{post.content}</p>
      </div>
    </div>
  );
}
