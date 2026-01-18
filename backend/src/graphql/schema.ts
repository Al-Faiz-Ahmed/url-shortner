import { gql } from 'graphql-tag'
import { moduleTypeDefs } from './modules'

const typeDefs = gql`
  type Query
  type Mutation
`

export const schemaTypeDefs = [
  typeDefs,
  ...moduleTypeDefs,
]
