import { Header } from "@/components/layout/Header";
import { ShortUrlForm } from "@/components/forms/ShortUrlForm";

export function Home() {
  return (
    <div>
      <Header />

      <section className="flex flex-col items-center gap-8 text-center">
        <div className="space-y-4 text-center mb-6 md:mb-8">
          <p className="text-foreground text-xl md:text-2xl">
            Get rid of your LOOOOOONG url !
          </p>
          <h1 className="font-short-stack text-5xl md:text-6xl text-primary-400">
            Tini Tiny
          </h1>
        </div>
        <ShortUrlForm />

        <p className="text-md md:text-lg leading-relaxed text-muted-foreground/80 w-fit mx-auto">
          Create your first <span className="text-primary">Tini Tiny{" "}</span>
          URL from here <br /> and share with 8,300,000,000 billion people <br /> around the
          globe.
        </p>
      </section>
    </div>
  );
}
