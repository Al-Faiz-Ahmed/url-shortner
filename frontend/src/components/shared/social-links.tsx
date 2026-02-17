export function SocialLinks() {
  return (
    <nav
      aria-label="Social links"
      className="flex items-center gap-3 justify-end pt-2 pr-2"
    >
      <a
        href="https://al-faiz.website"
        target="_blank"
        referrerPolicy="no-referrer"
        rel="noreferrer"
      >
        <img
          src="/al-faiz.svg"
          className="w-24 object-contain aspect-90/30"
          fetchPriority="high"
          alt=""
          />
      </a>
      <a
        href="https://github.com/Al-Faiz-Ahmed/url-shortner"
        target="_blank"
        referrerPolicy="no-referrer"
        rel="noreferrer"
        >
        <img
          src="/github.svg"
          className="w-24 object-contain aspect-90/30"
          fetchPriority="high"
          alt=""
        />
      </a>
    </nav>
  );
}
