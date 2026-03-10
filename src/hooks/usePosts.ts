import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPosts, createPost, updatePost, deletePost } from '../api/posts';

const POSTS_KEY = ['posts'];

export function usePosts(username: string) {
  const queryClient = useQueryClient();

  const { data: posts = [], isLoading, error } = useQuery({
    queryKey: POSTS_KEY,
    queryFn: fetchPosts,
    enabled: !!username,
  });

  const createMutation = useMutation({
    mutationFn: ({ title, content }: { title: string; content: string }) =>
      createPost(username, title, content),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: POSTS_KEY }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, title, content }: { id: number; title: string; content: string }) =>
      updatePost(id, title, content),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: POSTS_KEY }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: POSTS_KEY }),
  });

  return {
    posts,
    isLoading,
    error: error ? 'Failed to load posts. Please try again.' : null,
    handleCreate: (title: string, content: string) =>
      createMutation.mutateAsync({ title, content }),
    handleUpdate: (id: number, title: string, content: string) =>
      updateMutation.mutateAsync({ id, title, content }),
    handleDelete: (id: number) => deleteMutation.mutateAsync(id),
  };
}
