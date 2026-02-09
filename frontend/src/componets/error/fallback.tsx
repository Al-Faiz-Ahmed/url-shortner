import type { FallbackProps } from "react-error-boundary";

const FallbackComponent = ({ error, resetErrorBoundary }: FallbackProps) => {
    return (
    <div role="alert">
      <h2>Something went wrong:</h2>
      <pre style={{ color: "red" }}>{(error instanceof Error) ? error.message : "Unknown error" as string}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

export default FallbackComponent;
