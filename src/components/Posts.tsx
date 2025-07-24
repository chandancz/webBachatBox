// src/components/Posts.tsx
import { useQuery } from '@tanstack/react-query';
import { graphqlClient } from '../graphql/client';
import { GET_POSTS } from '../graphql/queries';

export type User = {
  id: string;
  name: string;
  email: string;
  age: number | null;
  password: string | null;
};

export type GetUsersDataResponse = {
  getUsersData: {
    data: User[];
    total: number;
    limit: number;
    page: number;
    totalPages: number;
  };
};

export default function Posts() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await graphqlClient.request<{ getUsersData: GetUsersDataResponse }>(GET_POSTS);
      console.log(response.getUsersData,'===>>response')
      return response.getUsersData;
    },
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
