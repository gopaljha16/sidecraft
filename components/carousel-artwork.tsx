import { Arrow } from "./icons";

export type ArtworkVariant = "saas" | "founder" | "education";

// Original HTML/CSS compositions. Content remains selectable and readable.
export function CarouselArtwork({ variant }: { variant: ArtworkVariant }) {
  return (
    <div className={`artwork artwork-${variant}`}>
      <div className="art-top">
        <span>SLIDECRAFT / IDEAS SERIES</span>
        <span>01 / 07</span>
      </div>
      {variant === "saas" ? (
        <>
          <span className="art-kicker">THE SAAS GROWTH PLAYBOOK</span>
          <h3>
            Great products.
            <br />
            Better <span>growth.</span>
          </h3>
          <p>
            Build a system.
            <br />
            Not another growth hack.
          </p>
          <div className="growth-diagram" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <span>↗</span>
          </div>
        </>
      ) : variant === "founder" ? (
        <>
          <span className="art-kicker">NOTES FROM THE JOURNEY</span>
          <h3>
            Build less.
            <br />
            <em>Mean</em>
            <br />
            more.
          </h3>
          <div className="founder-note">
            <span aria-hidden="true">✳</span>
            <p>
              A founder’s guide to
              <br />
              finding the essential.
            </p>
          </div>
        </>
      ) : (
        <>
          <span className="art-kicker">A FIELD GUIDE TO WHAT’S NEXT</span>
          <h3>
            The future
            <br />
            isn’t artificial.
            <br />
            <span>It’s useful.</span>
          </h3>
          <div className="ai-diagram" aria-hidden="true">
            <span>IDEA</span>
            <b>+</b>
            <span>AI</span>
            <i>↘</i>
            <strong>HUMAN POTENTIAL</strong>
          </div>
          <p>A practical perspective on AI.</p>
        </>
      )}
      <div className="art-bottom">
        <span>
          {variant === "saas"
            ? "LESS FRICTION. MORE MOMENTUM."
            : variant === "founder"
              ? "FOUNDER LESSONS / VOL. 01"
              : "THE FUTURE OF AI / VOL. 01"}
        </span>
        <Arrow />
      </div>
    </div>
  );
}
