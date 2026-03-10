import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { postsService } from '../services/posts.service';
import { QUERY_KEYS } from '../constants';

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
    queryKey: QUERY_KEYS.posts,
    queryFn: ({ pageParam }) => postsService.fetchPage(pageParam as number),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      return parseInt(url.searchParams.get('offset') ?? '0', 10);
    },
    enabled: !!username,
  });

  const posts = data?.pages.flatMap((page) => page.results) ?? [];

  const invalidatePosts = () =>
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.posts });

  const createMutation = useMutation({
    mutationFn: ({ title, content }: { title: string; content: string }) =>
      postsService.create(username, title, content),
    onSuccess: invalidatePosts,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, title, content }: { id: number; title: string; content: string }) =>
      postsService.update(id, title, content),
    onSuccess: invalidatePosts,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => postsService.delete(id),
    onSuccess: invalidatePosts,
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
