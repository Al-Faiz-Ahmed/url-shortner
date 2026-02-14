import type { ReactNode } from "react";
import ErrorBoundaryProvider from "./ErrorBoundaryProvider";
import ApolloProviderBase from "./ApolloProvider";

const Providers = ({ children }: { children: Readonly<ReactNode> }) => {
  return (
    <ErrorBoundaryProvider>
      <ApolloProviderBase>{children}</ApolloProviderBase>
    </ErrorBoundaryProvider>
  );
};

export default Providers;
