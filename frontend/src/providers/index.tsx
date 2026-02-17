import type { ReactNode } from "react";
import ErrorBoundaryProvider from "./error-bndry-provider";
import ApolloProviderBase from "./apollo-provider";

const Providers = ({ children }: { children: Readonly<ReactNode> }) => {
  return (
    <ErrorBoundaryProvider>
      <ApolloProviderBase>{children}</ApolloProviderBase>
    </ErrorBoundaryProvider>
  );
};

export default Providers;
