
import { useLoaderData, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link2 } from "lucide-react";

type SlugLoaderData = {
  data?: string;
};

export default function SlugPage() {
  const { slug } = useParams();
  const data = useLoaderData() as SlugLoaderData | undefined;

  return (
    <main className="min-h-dvh flex items-center justify-center bg-background text-foreground px-4">
      <Card className="w-full max-w-md p-8 space-y-6 text-center">
        <div className="flex items-center justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-muted text-primary">
            <Link2 className="size-7" />
          </span>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Redirecting
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Taking you to the full link
          </h1>
          <p className="text-sm text-muted-foreground">
            Following{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 text-xs font-mono text-primary">
              /{slug}
            </code>{" "}
            to its destination.
          </p>
        </div>

        <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full w-1/2 rounded-full bg-primary animate-pulse" />
        </div>

        {data?.data && (
          <div className="pt-1 text-xs text-muted-foreground">
            <span>Taking too long? </span>
            <Button
              asChild
              variant="link"
              className="h-auto p-0 text-xs align-baseline"
            >
              <a href={data.data} target="_blank" rel="noreferrer">
                Open it now
              </a>
            </Button>
          </div>
        )}
      </Card>
    </main>
  );
}
