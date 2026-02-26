
 import gql from "graphql-tag";
 import { DateTimeResolver, DateTimeTypeDefinition } from 'graphql-scalars'

export const  genUrlTypeDefs = gql`

  ${DateTimeTypeDefinition}
  
  type GeneratedUrl {
    id: ID!
    givenURL: String!
    generatedURL: String!
    uniqueHash: String!
    isBlock: Boolean!
    totalVisitors: Int!
    userId: String!    
    createdAt: DateTime!
    updatedAt: DateTime!
    expirationDate: DateTime!
  }

  type UniqueHashAvailability {
    uniqueHash: String!
    available: Boolean!
    message: String!
  }
  type DeleteURLRes {
    message: String!
    isDeleted: Boolean!
  }

  input genUniqueUrlInput {
    givenURL: String!
    uniqueHash: String!
    userId: String
  }

  input deleteURLInput {
    userId: String!
    urlId: String!
  }
  
  input deleteMultipleURLInput {
    userId: String!
    urlsId: [String!]!
  }

`;