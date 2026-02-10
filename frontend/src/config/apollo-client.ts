// src/apollo-client.js
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  CombinedGraphQLErrors,
  CombinedProtocolErrors,
} from "@apollo/client";
import { ErrorLink } from "@apollo/client/link/error";
import { envConfig } from "./env-config";

// 1. Error Handling Link (Production best practice)
const errorLink = new ErrorLink(({ error, operation }) => {
  // Use operation for context: which query/mutation failed and with what variables
  const opName = operation.operationName ?? "Unknown";
  const variables = operation.variables;
  const context = `[${opName}]${Object.keys(variables).length ? ` vars: ${JSON.stringify(variables)}` : ""}`;

  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error] ${context} — Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  } else if (CombinedProtocolErrors.is(error)) {
    error.errors.forEach(({ message, extensions }) =>
      console.log(
        `[Protocol error] ${context} — Message: ${message}, Extensions: ${JSON.stringify(
          extensions,
        )}`,
      ),
    );
  } else {
    console.error(`[Network error] ${context} — ${error}`);
  }
});

// 2. HTTP Link to your Express Server
const httpLink = new HttpLink({
  uri: envConfig.BACKEND_API_URL, // Your Express endpoint
});

// 3. Initialize Apollo Client
const client = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]), // Combine links
  cache: new InMemoryCache(), // This enables the powerful caching
});

export default client;
