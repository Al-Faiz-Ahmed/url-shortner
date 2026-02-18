import { gql } from "@apollo/client";

import type { User } from "@/types";

export type GetUserVariables = {
  userId?: string;
};

export type GetUserResponse = {
  getUser: User;
};

// Adjust the field names to match your backend schema if needed.
export const GET_USER_QUERY = gql`
  query GetUserById($userId: String) {
    getUser(userId: $userId) {
      id
      totalShortenedURL
    }
  }
`;
