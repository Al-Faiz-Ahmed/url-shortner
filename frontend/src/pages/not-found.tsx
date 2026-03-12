import { Link, useRouteError } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const error = useRouteError() as { status?: number };
  const is404 = error?.status === 404;

  return (
    <main className="min-h-dvh flex items-center justify-center bg-background text-foreground px-4">
      <Card className="text-center space-y-4">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {is404 ? "404 Not found" : "Something went wrong"}
        </p>

        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          {is404
            ? "We couldn't find that short link"
            : "We couldn't resolve this link right now."}
        </h1>

        <p className="text-sm text-muted-foreground">
          {is404
            ? "Short link not found or blocked by provider."
            : "Please try again in a moment or check the URL and try once more."}
        </p>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="mr-1.5 size-4" />
              Back to home
            </Link>
          </Button>

          
        </div>
      </Card>
    </main>
  );
}