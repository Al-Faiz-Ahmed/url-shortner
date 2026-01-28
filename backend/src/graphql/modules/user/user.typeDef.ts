import gql from "graphql-tag";

export const userTypeDefs = gql`
  type User {
    id: ID!
    ipAddress: String!
    createdAt: String!
    totalShortenedURL: String!
    generatedUrls: [generatedUrl!]!
  }
`;
