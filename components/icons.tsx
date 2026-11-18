export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h16m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BrandMark() {
  return (
    <svg
      className="w-[29px] shrink-0 text-brand max-[360px]:w-6"
      width="35"
      height="35"
      viewBox="0 0 35 35"
      fill="none"
      aria-hidden="true"
    >
      <rect x="3" y="10" width="19" height="23" rx="2" fill="currentColor" opacity=".35" />
      <rect x="9" y="5" width="19" height="23" rx="2" fill="currentColor" opacity=".65" />
      <rect x="15" y="0" width="19" height="23" rx="2" fill="currentColor" />
    </svg>
  );
}

export function ThemeIcon({ dark }: { dark: boolean }) {
  return dark ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20.5 14.1A8.6 8.6 0 0 1 9.9 3.5 8.6 8.6 0 1 0 20.5 14.1Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="3.6" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M12 2.5v2.1M12 19.4v2.1M21.5 12h-2.1M4.6 12H2.5M18.7 5.3l-1.5 1.5M6.8 17.2l-1.5 1.5M18.7 18.7l-1.5-1.5M6.8 6.8 5.3 5.3"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
