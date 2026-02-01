import gql from "graphql-tag";

export const genUrlQueryDefs = gql`
  extend type Query {
    _empty: String!
    getAllUrl(userId: String!):[GeneratedUrl!]
    findUniqueHashRecord(uniqueHash: String!): UniqueHashAvailability!
  }
`;
