import { useState, useEffect, useCallback } from 'react';
import { type Post, fetchPosts, createPost, updatePost, deletePost } from '../api/posts';

export function usePosts(username: string) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPosts();
      setPosts(data);
    } catch {
      setError('Failed to load posts. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (username) loadPosts();
  }, [username, loadPosts]);

  const handleCreate = async (title: string, content: string) => {
    const newPost = await createPost(username, title, content);
    setPosts((prev) => [newPost, ...prev]);
  };

  const handleDelete = async (id: number) => {
    await deletePost(id);
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleUpdate = async (id: number, title: string, content: string) => {
    const updated = await updatePost(id, title, content);
    setPosts((prev) => prev.map((p) => (p.id === id ? updated : p)));
  };

  return { posts, loading, error, handleCreate, handleDelete, handleUpdate };
}
