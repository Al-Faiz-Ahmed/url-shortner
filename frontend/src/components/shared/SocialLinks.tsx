import { ExternalLink, Github } from "lucide-react";

import socialLinks from "@/data/socialLinks.json";
import { Button } from "@/components/ui/button";
import type { JSX } from "react";

type SocialLink = (typeof socialLinks)[number];

const iconMap: Record<SocialLink["icon"], JSX.Element> = {
  "external-link": <ExternalLink className="size-5 " aria-hidden="true" />,
  github: <Github className="size-5 stroke-0 fill-current" aria-hidden="true" />,
};

export function SocialLinks() {
  return (
    <nav aria-label="Social links" className="flex items-center gap-2 justify-end ">
      {socialLinks.map((link) => (
        <Button
          key={link.name}
          variant={"default"}
          className="bg-foreground rounded-full p-1 h-auto"
          
        >
          <a
            href={link.url}
            target="_blank"
            rel="noreferrer"
            aria-label={link.name}
            className=""
          >
            <span className="inline-flex items-center gap-1 ">
              <span className="bg-background size-7 flex justify-center items-center text-foreground rounded-full">
              {iconMap[link.icon]}
              </span>
              <span>{link.name}</span>
            </span>
          </a>
        </Button>
      ))}
    </nav>
  );
}

