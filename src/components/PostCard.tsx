import type { Post } from '../types/post';
import { timeAgo } from '../utils/timeAgo';
import { TrashIcon, EditIcon, HeartIcon } from './icons';

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
              <TrashIcon />
            </button>
            <button
              onClick={() => onEdit(post)}
              aria-label="Edit post"
              className="text-white hover:opacity-70 transition-opacity"
            >
              <EditIcon />
            </button>
          </div>
        )}
      </div>

      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <span className="font-bold text-gray-800">@{post.username}</span>
          <span className="text-sm text-gray-500">{timeAgo(post.created_datetime)}</span>
        </div>

        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap mb-4">
          {post.content}
        </p>

        <button
          onClick={() => onLike(post.id)}
          aria-label={isLiked ? 'Unlike post' : 'Like post'}
          className={`flex items-center gap-1.5 text-sm transition-colors
            ${isLiked ? 'text-danger' : 'text-gray-400 hover:text-danger'}`}
        >
          <HeartIcon filled={isLiked} className="transition-transform active:scale-125" />
          <span>{isLiked ? 'Liked' : 'Like'}</span>
        </button>
      </div>
    </div>
  );
}
