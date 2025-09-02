import { graphqlRequest } from '../client';
import { AUTH_LOGIN, GET_USER_LIST } from '../queries/auth.queries';

export const authLogin = async (email: string): Promise<any> => {
  const response = await graphqlRequest<any>(
    AUTH_LOGIN(email)
  );
  return response;
};

export const getUserList = async (): Promise<any> => {
  const response = await graphqlRequest<any>(
    GET_USER_LIST()
  );
  return response;
};