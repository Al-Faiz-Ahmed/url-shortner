import type { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";

import FallbackComponent from "@/components/error/Fallback";

type Props = {
  children: ReactNode;
};

export function ErrorBoundaryProvider({ children }: Props) {
  return (
    <ErrorBoundary FallbackComponent={FallbackComponent}>{children}</ErrorBoundary>
  );
}

export default ErrorBoundaryProvider;

