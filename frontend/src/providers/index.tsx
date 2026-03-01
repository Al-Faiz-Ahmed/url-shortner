import type { ReactNode } from "react";
import ErrorBoundaryProvider from "./error-bndry-provider";
import ApolloProviderBase from "./apollo-provider";
import { Toaster } from "@/components/ui/sonner";
const Providers = ({ children }: { children: Readonly<ReactNode> }) => {
  return (
    <ErrorBoundaryProvider>
      <ApolloProviderBase>
        {children}
        <Toaster />
      </ApolloProviderBase>
    </ErrorBoundaryProvider>
  );
};

export default Providers;
