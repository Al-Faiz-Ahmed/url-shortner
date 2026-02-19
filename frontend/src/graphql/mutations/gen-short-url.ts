import { gql } from "@apollo/client";

import type { GeneratedURL } from "@/types";

export type CreateShortUrlVariables = {
  givenURL: string;
  uniqueHash: string;
  userId?: string;
};

export type CreateShortUrlResponse = {
  createShortUrl: GeneratedURL;
};

// Adjust the field names to match your backend schema if needed.
export const CREATE_SHORT_URL_MUTATION = gql`
  mutation CreateShortUrl($givenURL: String!,$uniqueHash:String!, $userId:String) {
    generateUniqueURL(input: {givenURL: $givenURL, uniqueHash: $uniqueHash, userId:$userId}){
      givenURL
      generatedURL
      createdAt
      isBlock
      id
      expirationDate
    }
  }
`;
