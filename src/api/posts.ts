export interface Post {
  id: number;
  username: string;
  created_datetime: string;
  title: string;
  content: string;
}

export interface PostsPage {
  count: number;
  next: string | null;
  previous: string | null;
  results: Post[];
}

const BASE_URL = 'https://dev.codeleap.co.uk/careers/';

export async function fetchPostsPage(offset: number, limit = 10): Promise<PostsPage> {
  const res = await fetch(`${BASE_URL}?limit=${limit}&offset=${offset}`);
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

export async function createPost(
  username: string,
  title: string,
  content: string
): Promise<Post> {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, title, content }),
  });
  if (!res.ok) throw new Error('Failed to create post');
  return res.json();
}

export async function updatePost(
  id: number,
  title: string,
  content: string
): Promise<Post> {
  const res = await fetch(`${BASE_URL}${id}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content }),
  });
  if (!res.ok) throw new Error('Failed to update post');
  return res.json();
}

export async function deletePost(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}${id}/`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete post');
}
