export interface Post {
  id: number;
  username: string;
  created_datetime: string;
  title: string;
  content: string;
}

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Post[];
}

const BASE_URL = 'https://dev.codeleap.co.uk/careers/';

export async function fetchPosts(): Promise<Post[]> {
  const res = await fetch(`${BASE_URL}?limit=100`);
  if (!res.ok) throw new Error('Failed to fetch posts');
  const data: ApiResponse = await res.json();
  return data.results;
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
