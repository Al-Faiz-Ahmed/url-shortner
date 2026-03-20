import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-dvh flex flex-col items-center  bg-background text-foreground px-4 pt-24">
      <div className="space-y-4 text-center mb-6 md:mb-8 scale-75 opacity-80">
          <p className="text-foreground text-lg sm:text-xl md:text-2xl">
            Get rid of your LOOOOOONG url !
          </p>
          <h1 className="font-short-stack text-5xl md:text-6xl text-primary-400">
            Tini Tiny
          </h1>
        </div>
      <Card className="text-center space-y-4 border border-muted-foreground/20">
        <p className="text-xs font-sans font-medium uppercase tracking-[0.2em] text-muted-foreground">
          404 Not found
        </p>

        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          We couldn't resolve this link right now.
        </h1>

        <p className="text-sm text-muted-foreground">
          Link may be broken OR blocked by the provider.
        </p>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="mr-1.5 size-4" />
              Back to homes
            </Link>
          </Button>
        </div>
      </Card>
    </main>
  );
}
