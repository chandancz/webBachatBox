// src/graphql/queries.ts
import { gql } from "graphql-request";

export const GET_POSTS = gql`
  query {
    getUsersData(limit: 5, page: 1) {
      data {
        id
        name
        email
        age
        password
      }
      total
      limit
      page
      totalPages
    }
  }
`;
