import { SocialLinks } from "@/components/shared/SocialLinks";
import { cn } from "@/lib/utils";

type HeaderProps = {
  className?: string;
};

/**
 * Top navigation header with app title and social links.
 */
export function Header({ className }: HeaderProps) {
  return (
    <header
      className={cn(
        "w-full",
        "text-sm text-muted-foreground",
        className,
      )}
    >
      <SocialLinks />
    </header>
  );
}

