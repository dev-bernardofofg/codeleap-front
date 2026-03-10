import { useState, useCallback } from 'react';
import type { Post } from './types/post';
import { STORAGE_KEYS } from './constants';
import { usePosts } from './hooks/usePosts';
import { useLikes } from './hooks/useLikes';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';
import SignupModal from './components/SignupModal';
import Header from './components/Header';
import CreatePost from './components/CreatePost';
import PostCard from './components/PostCard';
import DeleteModal from './components/DeleteModal';
import EditModal from './components/EditModal';
import { SearchIcon, CloseIcon } from './components/icons';

export default function App() {
  const [username, setUsername] = useState<string>(
    () => localStorage.getItem(STORAGE_KEYS.username) || ''
  );
  const [search, setSearch] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<Post | null>(null);
  const [editTarget, setEditTarget] = useState<Post | null>(null);

  const {
    posts,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
    handleCreate,
    handleDelete,
    handleUpdate,
  } = usePosts(username);

  const { isLiked, toggleLike } = useLikes();

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const sentinelRef = useIntersectionObserver(loadMore, !!hasNextPage);

  function handleLogin(name: string) {
    localStorage.setItem(STORAGE_KEYS.username, name);
    setUsername(name);
  }

  function handleLogout() {
    localStorage.removeItem(STORAGE_KEYS.username);
    setUsername('');
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    await handleDelete(deleteTarget.id);
    setDeleteTarget(null);
  }

  async function confirmEdit(title: string, content: string) {
    if (!editTarget) return;
    await handleUpdate(editTarget.id, title, content);
    setEditTarget(null);
  }

  const filteredPosts = search.trim()
    ? posts.filter(
        (p) =>
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.username.toLowerCase().includes(search.toLowerCase()) ||
          p.content.toLowerCase().includes(search.toLowerCase())
      )
    : posts;

  if (!username) {
    return <SignupModal onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-app-bg">
      <div className="max-w-[800px] mx-auto">
        <Header username={username} onLogout={handleLogout} />

        <main className="p-4 sm:p-6">
          <CreatePost onSubmit={handleCreate} />

          <div className="relative mb-6">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search posts by title, author or content..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-xl pl-9 pr-10 py-2.5 text-sm outline-none focus:border-primary transition shadow-sm"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
              >
                <CloseIcon />
              </button>
            )}
          </div>

          {isLoading && (
            <div className="text-center py-12 text-gray-500">Loading posts...</div>
          )}

          {error && (
            <div className="text-center py-6 text-danger">{error}</div>
          )}

          {!isLoading && filteredPosts.length === 0 && !error && (
            <div className="text-center py-12 text-gray-500">
              {search ? 'No posts match your search.' : 'No posts yet. Be the first to share something!'}
            </div>
          )}

          {filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              isOwner={post.username === username}
              isLiked={isLiked(post.id)}
              onDelete={setDeleteTarget}
              onEdit={setEditTarget}
              onLike={toggleLike}
            />
          ))}

          <div ref={sentinelRef} />

          {isFetchingNextPage && (
            <div className="text-center py-6 text-gray-500 text-sm">Loading more...</div>
          )}
        </main>
      </div>

      {deleteTarget && (
        <DeleteModal onConfirm={confirmDelete} onCancel={() => setDeleteTarget(null)} />
      )}

      {editTarget && (
        <EditModal
          post={editTarget}
          onSave={confirmEdit}
          onCancel={() => setEditTarget(null)}
        />
      )}
    </div>
  );
}
