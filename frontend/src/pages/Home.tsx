import { Header } from "@/components/layout/Header";
import { ShortUrlForm } from "@/components/forms/ShortUrlForm";

export function Home() {
  return (
    <div>
      <Header className="-mt-8 md:-mt-12" />

      {/* <section className="flex flex-col items-center gap-8 text-center">
        <ShortUrlForm />
        <p className="text-xs md:text-sm text-muted-foreground max-w-sm">
          Paste any long URL above and let Tini Tiny handle the rest. No signup,
          no tracking — just clean, tiny links.
        </p>
      </section> */}
    </div>
  );
}

