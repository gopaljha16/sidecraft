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
