import gql from "graphql-tag";

export const userQueryDefs = gql`
  extend type Query {
    getUser (id: String!): User! 
    _empty: String!
  }
`;
