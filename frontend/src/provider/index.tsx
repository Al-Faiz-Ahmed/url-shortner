import type {ReactNode} from "react";
import {ApolloProvider} from "@apollo/client/react"
import client from "@/config/apollo-client";

const Provider = ({children}: { children: Readonly<ReactNode> }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Provider;
