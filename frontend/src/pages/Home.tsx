import { Header } from "@/components/layout/header";
import { ShortUrlForm } from "@/components/forms/short-url-form";
import GeneratedUrlSection from "@/components/common/urls-sectiont";

export function Home() {
  return (
    <div>
      <Header />

      <section className="flex flex-col items-center gap-8 text-center bg-red">
        <div className="space-y-4 text-center mb-6 md:mb-8">
          <p className="text-foreground text-xl md:text-2xl">
            Get rid of your LOOOOOONG url !
          </p>
          <h1 className="font-short-stack text-5xl md:text-6xl text-primary-400">
            Tini Tiny
          </h1>
        </div>
        <ShortUrlForm />

        <GeneratedUrlSection />

        
      </section>
    </div>
  );
}
