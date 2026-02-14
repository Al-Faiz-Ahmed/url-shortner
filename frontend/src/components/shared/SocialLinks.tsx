import { ExternalLink, Github } from "lucide-react";

import socialLinks from "@/data/socialLinks.json";
import { Button } from "@/components/ui/button";
import type { JSX } from "react";

type SocialLink = (typeof socialLinks)[number];

const iconMap: Record<SocialLink["icon"], JSX.Element> = {
  "external-link": <ExternalLink className="size-4" aria-hidden="true" />,
  github: <Github className="size-4" aria-hidden="true" />,
};

export function SocialLinks() {
  return (
    <nav aria-label="Social links" className="flex items-center gap-2 ">
      {socialLinks.map((link) => (
        <Button
          key={link.name}
          asChild
          variant="ghost"
          size="sm"
          className="text-xs md:text-sm text-white hover:text-foreground"
        >
          <a
            href={link.url}
            target="_blank"
            rel="noreferrer"
            aria-label={link.name}
          >
            <span className="inline-flex items-center gap-1 text-white">
              {iconMap[link.icon]}
              <span>{link.name}</span>
            </span>
          </a>
        </Button>
      ))}
    </nav>
  );
}

