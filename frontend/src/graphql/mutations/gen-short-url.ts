import { gql } from "@apollo/client";

import type { GeneratedURL } from "@/types";

export type CreateShortUrlVariables = {
  givenURL: string;
  uniqueHash: string;
  userId?: string;
};

export type CreateShortUrlResponse = {
  generateUniqueURL: GeneratedURL;
};

// Adjust the field names to match your backend schema if needed.
export const CREATE_SHORT_URL_MUTATION = gql`
  mutation CreateShortUrl($givenURL: String!,$uniqueHash:String!, $userId:String) {
    generateUniqueURL(input: {givenURL: $givenURL, uniqueHash: $uniqueHash, userId:$userId}){
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





export type DeleteURLVariables = {
  userId: string;
  urlId: string;
};

export type DeleteURLResponse = {
  deleteURLbyId: {
    message: string;
    isDeleted: boolean;
  };
};

export const DELETE_URL_BY_ID_MUTATION = gql`
  mutation DeleteURLbyId($userId: String!, $urlId: String!) {
    deleteURLbyId(input: { userId: $userId, urlId: $urlId }) {
      message
      isDeleted
    }
  }
`;


export type DeleteMultipleURLVariables = {
  userId: string;
  urlsId: string[];
};

export type DeleteMultipleURLResponse = {
  deleteMultipleURLbyId: {
    message: string;
    isDeleted: boolean;
  };
};

export const DELETE_MULTIPLE_URL_BY_ID_MUTATION = gql`
  mutation DeleteMultipleURLbyId($userId: String!, $urlsId: [String!]!) {
    deleteMultipleURLbyId(input: { userId: $userId, urlsId: $urlsId }) {
      message
      isDeleted
    }
  }
`;