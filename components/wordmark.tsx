import Link from "next/link";
import { BrandMark } from "./icons";

export function Wordmark() {
  return (
    <Link
      className="inline-flex items-center gap-2.5 font-heading text-[23px] leading-none font-bold tracking-[-1.4px] max-[360px]:gap-1.5 max-[360px]:text-[21px] md:text-[26px]"
      href="/"
      prefetch={false}
      aria-label="Slidecraft Studio home"
    >
      <BrandMark />
      <span>
        slidecraft{" "}
        <span className="mt-1.5 block font-sans text-[8px] font-medium tracking-[3.4px]">
          STUDIO
        </span>
      </span>
    </Link>
  );
}
