import { ShortUrlForm } from "@/components/forms/short-url-form";
import GeneratedUrlSection from "@/components/common/urls-section";
import Footer from "@/components/layout/footer";

export function Home() {
  return (
    <div className="pt-16">

      <section className="w-full max-w-2xl mx-auto gap-8 bg-red pt-4">
        <div className="space-y-4 text-center mb-6 md:mb-8">
          <p className="text-foreground text-lg sm:text-xl md:text-2xl">
            Get rid of your LOOOOOONG url !
          </p>
          <h1 className="font-short-stack text-5xl md:text-6xl text-primary-400">
            Tini Tiny
          </h1>
        </div>
        <ShortUrlForm />

        <GeneratedUrlSection />
      </section>

      <Footer />
    </div>
  );
}
