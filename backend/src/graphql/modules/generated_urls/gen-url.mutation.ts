import gql from "graphql-tag";

export const genUrlMutationDefs = gql`
  extend type Mutation {
    _empty: String!
    generateUniqueURL (input: genUniqueUrlInput!): GeneratedUrl! 

  }
`;
