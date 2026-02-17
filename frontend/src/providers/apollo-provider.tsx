import type { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client/react";
import apolloClient from "@/app/apollo/client"


type Props = {
  children: Readonly<ReactNode>;
};

export function ApolloProviderBase({ children }: Props) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}

export default ApolloProviderBase;

