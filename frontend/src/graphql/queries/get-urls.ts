import { gql } from "@apollo/client";

import type { GeneratedURL } from "@/types";

export type GetUrlsVariables = {
  userId: string;
};

export type GetUrlsResponse = {
  getAllUrl: GeneratedURL[];
};

// Adjust the field names to match your backend schema if needed.
export const GET_URL_BY_ID_QUERY = gql`
  query GetUrlById($userId: String!) {
    getAllUrl(userId: $userId) {
      id
      createdAt
      expirationDate
      generatedURL
      givenURL
      isBlock
      totalVisitors
      uniqueHash
      updatedAt
      userId
    }
  }
`;
