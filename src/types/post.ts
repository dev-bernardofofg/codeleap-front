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
