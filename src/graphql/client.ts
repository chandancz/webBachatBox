import { GraphQLClient, RequestDocument, Variables } from 'graphql-request';
const endpoint = 'http://localhost:3000/graphql';
const rawClient = new GraphQLClient(endpoint);

export const graphqlRequest = async <T>(
  document: RequestDocument,
  variables?: Variables
): Promise<T> => {
  const token = localStorage.getItem('token');

  try {
    const response = await rawClient.request<T>(document, variables, {
      Authorization: token ? `Bearer ${token}` : '',
    });

    return response;
  } catch (error: any) {
    if (error?.response?.errors?.length) {
      const gqlErrors = error.response.errors;
      const firstError = gqlErrors[0];
      const message = firstError.message || 'GraphQL Error';
      const code = firstError.extensions?.code || 'UNKNOWN_GRAPHQL_ERROR';
      const statusCode = firstError.extensions?.originalError?.statusCode || null;
      console.error(`[GraphQL Error] Code: ${code}, Message: ${message}, Status: ${statusCode}`);
      // alert(message)
      // throw new Error(message); 
    }

    if (error?.response?.status === 401) {
      console.warn('Unauthorized. Clearing token...');
      // localStorage.removeItem('token');
      // Optionally: redirect to login page
      // window.location.href = '/login';
      throw new Error('Unauthorized. Please log in again.');
    }

    console.error('[Network/Error]', error);
    throw new Error('Something went wrong. Please try again.');
  }
};
