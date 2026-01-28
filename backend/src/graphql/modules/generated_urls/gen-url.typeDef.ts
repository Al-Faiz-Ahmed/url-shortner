
 import gql from "graphql-tag";
 import { DateTimeResolver, DateTimeTypeDefinition } from 'graphql-scalars'

export const  genUrlTypeDefs = gql`

  ${DateTimeTypeDefinition}
  
  type generatedUrl {
    id: ID!
    givenURL: String!
    generatedURL: String!
    uniqueHash: String!
    isBlock: Boolean!
    totalVisitors: Int!
    userId: String!    
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input genUniqueUrlInput {
    givenURL: String!
    uniqueHash: String!
    userId: String
  }

`;