import { useState } from 'react';
import type { Post } from './api/posts';
import { usePosts } from './hooks/usePosts';
import SignupModal from './components/SignupModal';
import Header from './components/Header';
import CreatePost from './components/CreatePost';
import PostCard from './components/PostCard';
import DeleteModal from './components/DeleteModal';
import EditModal from './components/EditModal';

export default function App() {
  const [username, setUsername] = useState<string>(
    () => localStorage.getItem('cl_username') || ''
  );
  const [deleteTarget, setDeleteTarget] = useState<Post | null>(null);
  const [editTarget, setEditTarget] = useState<Post | null>(null);

  const { posts, loading, error, handleCreate, handleDelete, handleUpdate } =
    usePosts(username);

  function handleLogin(name: string) {
    localStorage.setItem('cl_username', name);
    setUsername(name);
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

  if (!username) {
    return <SignupModal onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-app-bg">
      <div className="max-w-[800px] mx-auto">
        <Header />

        <main className="p-6">
          <CreatePost onSubmit={handleCreate} />

          {loading && (
            <div className="text-center py-12 text-gray-500">Loading posts...</div>
          )}

          {error && (
            <div className="text-center py-6 text-danger">{error}</div>
          )}

          {!loading && posts.length === 0 && !error && (
            <div className="text-center py-12 text-gray-500">
              No posts yet. Be the first to share something!
            </div>
          )}

          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              isOwner={post.username === username}
              onDelete={setDeleteTarget}
              onEdit={setEditTarget}
            />
          ))}
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
