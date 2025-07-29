import { graphqlRequest } from '../client';
import { AUTH_LOGIN } from '../queries/auth.queries';

export const authLogin = async (email: string): Promise<any> => {
  const response = await graphqlRequest<any>(
    AUTH_LOGIN(email)
  );
  return response;
};