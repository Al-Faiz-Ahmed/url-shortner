export function SocialLinks() {
  return (
    <nav
      aria-label="Social links"
      className="flex items-center gap-4 justify-center "
    >
      <a
        href="https://al-faiz.website"
        target="_blank"
        referrerPolicy="no-referrer"
        rel="noreferrer"
        className="relative"
        aria-label="Open the Author Al Faiz Portfolio Website (opens in a new tab)"
      >
        <img
          src="/al-faiz.svg"
          className="w-28 object-contain aspect-90/30"
          fetchPriority="high"
          alt=""
          aria-hidden
        />
        <span
          className="absolute top-0.5 left-0.5 size-1.5 rounded-full animate-pulse animation-duration-[3400ms] bg-green-400 shadow-[0_0_0_3px_oklch(44.8%_0.119_151.328)]"
          aria-hidden
        />
      </a>
      <a
        href="https://github.com/Al-Faiz-Ahmed/url-shortner"
        target="_blank"
        referrerPolicy="no-referrer"
        rel="noreferrer"
        className="relative"
        aria-label="Open the url-shortner project on GitHub (opens in a new tab)"
      >
        <span
          className="absolute top-0.5 left-0.5 size-1.5 rounded-full  animate-pulse animation-duration-[3200ms] bg-green-400 shadow-[0_0_0_3px_oklch(44.8%_0.119_151.328)]"
          aria-hidden
        />
        <img
          src="/github.svg"
          className="w-28 object-contain aspect-90/30"
          fetchPriority="high"
          alt=""
          aria-hidden
        />
      </a>
    </nav>
  );
}
