import Link from "next/link";
import { BrandMark } from "./icons";

export function Footer() {
  return (
    <footer className="site-footer container">
      <div className="footer-top">
        <Link className="wordmark" href="/" aria-label="Slidecraft Studio home">
          <BrandMark />
          <span>
            slidecraft<span className="wordmark-studio">STUDIO</span>
          </span>
        </Link>
        <p>
          Good ideas deserve
          <br />a better frame.
        </p>
        <nav aria-label="Footer navigation">
          <Link href="/#work">Work</Link>
          <Link href="/#services">Services</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Slidecraft Studio</span>
        <a href="https://gopaldev.in">Explore the developer portfolio ↗</a>
        <span>Independent by design.</span>
      </div>
    </footer>
  );
}
