import gql from "graphql-tag";

export const userMutationDefs = gql`
  extend type Mutation {
    _empty: String!
  }
`;
