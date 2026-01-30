import gql from "graphql-tag";

export const userQueryDefs = gql`
  extend type Query {
    getUser (userId: String!): User! 
    _empty: String!
  }
`;
