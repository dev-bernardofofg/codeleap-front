import { http } from './http';
import type { Post, PostsPage } from '../types/post';
import { PAGE_SIZE } from '../constants';

export const postsService = {
  fetchPage: (offset: number, limit = PAGE_SIZE) =>
    http.get<PostsPage>(`?limit=${limit}&offset=${offset}`),

  create: (username: string, title: string, content: string) =>
    http.post<Post>('', { username, title, content }),

  update: (id: number, title: string, content: string) =>
    http.patch<Post>(`${id}/`, { title, content }),

  delete: (id: number) =>
    http.delete(`${id}/`),
};
