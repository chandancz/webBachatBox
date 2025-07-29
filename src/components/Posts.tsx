// src/components/Posts.tsx
import { fetchPosts } from '@/graphql/service/post.service';
import { useQuery } from '@tanstack/react-query';
export default function Posts() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts
  });

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;
  return (
    <ul>
        <h1>test post get </h1>
      {/* {data?.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))} */}
    </ul>
  );
}
