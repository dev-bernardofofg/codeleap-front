import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPostsPage, createPost, updatePost, deletePost } from '../api/posts';

const POSTS_KEY = ['posts'];
const PAGE_SIZE = 10;

export function usePosts(username: string) {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: POSTS_KEY,
    queryFn: ({ pageParam }) => fetchPostsPage(pageParam as number, PAGE_SIZE),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      return parseInt(url.searchParams.get('offset') ?? '0', 10);
    },
    enabled: !!username,
  });

  const posts = data?.pages.flatMap((page) => page.results) ?? [];

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
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error: error ? 'Failed to load posts. Please try again.' : null,
    handleCreate: (title: string, content: string) =>
      createMutation.mutateAsync({ title, content }),
    handleUpdate: (id: number, title: string, content: string) =>
      updateMutation.mutateAsync({ id, title, content }),
    handleDelete: (id: number) => deleteMutation.mutateAsync(id),
  };
}
