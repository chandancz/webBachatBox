import { GetUsersDataResponse } from '@/types/post.types';
import { graphqlClient } from '../client';
import { GET_POSTS } from '../queries/post.queries';

export const fetchPosts = async (): Promise<GetUsersDataResponse> => {
  const response = await graphqlClient.request<{ getUsersData: GetUsersDataResponse }>(
    GET_POSTS()
  );
  return response.getUsersData;
};

