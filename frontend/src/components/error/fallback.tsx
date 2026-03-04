import type { FallbackProps } from "react-error-boundary";

export default function FallbackComponent({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <div className="max-w-md w-full rounded-2xl border border-border/40 bg-card/80 px-6 py-8 shadow-xl space-y-4 text-center">
        <h2 className="text-lg md:text-xl font-semibold">
          Something went wrong
        </h2>
        <p className="text-xs md:text-sm text-muted-foreground">
          An unexpected error occurred while rendering the app. You can try
          again, and if the problem persists please refresh the page.
        </p>
        <pre className="max-h-32 overflow-auto rounded-md bg-background/60 px-3 py-2 text-xs text-destructive text-left">
          {(error instanceof Error ? error.message : "Unknown error") as string}
        </pre>
        <button
          type="button"
          onClick={resetErrorBoundary}
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

