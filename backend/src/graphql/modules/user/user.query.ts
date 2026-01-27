import gql from "graphql-tag";

export const userQueryDefs = gql`
  extend type Query {
    _empty: String!
  }
`;
