import type { Post } from '../api/posts';
import { timeAgo } from '../utils/timeAgo';

interface PostCardProps {
  post: Post;
  isOwner: boolean;
  isLiked: boolean;
  onDelete: (post: Post) => void;
  onEdit: (post: Post) => void;
  onLike: (postId: number) => void;
}

export default function PostCard({ post, isOwner, isLiked, onDelete, onEdit, onLike }: PostCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden mb-6 shadow-sm animate-fade-in-up">
      {/* Card Header */}
      <div className="bg-primary px-6 py-4 flex items-center justify-between">
        <h3 className="text-white font-bold text-lg leading-tight pr-4 line-clamp-1">
          {post.title}
        </h3>

        {isOwner && (
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => onDelete(post)}
              aria-label="Delete post"
              className="text-white hover:opacity-70 transition-opacity"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14H6L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4h6v2" />
              </svg>
            </button>

            <button
              onClick={() => onEdit(post)}
              aria-label="Edit post"
              className="text-white hover:opacity-70 transition-opacity"
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

        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap mb-4">
          {post.content}
        </p>

        {/* Like button */}
        <button
          onClick={() => onLike(post.id)}
          aria-label={isLiked ? 'Unlike post' : 'Like post'}
          className={`flex items-center gap-1.5 text-sm transition-colors
            ${isLiked ? 'text-danger' : 'text-gray-400 hover:text-danger'}`}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={isLiked ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform active:scale-125"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <span>{isLiked ? 'Liked' : 'Like'}</span>
        </button>
      </div>
    </div>
  );
}
