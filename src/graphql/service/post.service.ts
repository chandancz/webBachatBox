import { graphqlRequest } from '../client';
import { GET_POSTS } from '../queries/post.queries';

export const fetchPosts = async () => {
  const response = await graphqlRequest<{ getUsersData: any }>(GET_POSTS());
  return response.getUsersData;
};
