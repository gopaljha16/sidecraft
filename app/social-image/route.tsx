import { ImageResponse } from "next/og";
import { getProject } from "@/lib/projects";
import { getInsight } from "@/lib/insights";

export const runtime = "nodejs";

export function GET(request: Request) {
  const path = new URL(request.url).searchParams.get("path") || "/";
  const project = path.startsWith("/work/") ? getProject(path.slice(6)) : undefined;
  const article = path.startsWith("/insights/") ? getInsight(path.slice(10)) : undefined;
  const title =
    project?.title ||
    article?.title ||
    (path === "/services/carousel-design"
      ? "Your expertise. Worth saving."
      : path === "/work"
        ? "Different ideas. Distinct visual worlds."
        : path === "/insights"
          ? "Better briefs. More useful stories."
          : path === "/privacy"
            ? "A considered approach to your information."
            : "Make your ideas impossible to scroll past.");
  const label = project
    ? "SELF-INITIATED CAROUSEL CONCEPT"
    : article
      ? "FROM THE STUDIO NOTEBOOK"
      : "PREMIUM CAROUSEL DESIGN";
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#f7f7f2",
        color: "#151619",
        padding: 64,
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24 }}>
        <span style={{ color: "#5365f8", fontWeight: 700 }}>slidecraft / STUDIO</span>
        <span style={{ fontSize: 15, letterSpacing: 2 }}>{label}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 44 }}>
        <div
          style={{
            display: "flex",
            width: 780,
            fontSize: title.length > 60 ? 56 : 76,
            lineHeight: 1.08,
            letterSpacing: -3,
            fontWeight: 700,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            width: 230,
            height: 288,
            padding: 25,
            background: "#162544",
            borderRadius: 10,
            flexDirection: "column",
            justifyContent: "space-between",
            transform: "rotate(6deg)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", color: "#f7f7f2", fontSize: 15 }}>
            <span>SMALL FORMAT.</span>
            <span>BIG PRESENCE.</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 130 }}>
            {[45, 75, 105, 130].map((height, index) => (
              <div
                key={height}
                style={{ width: 32, height, background: index === 3 ? "#c8ef78" : "#8694ff" }}
              />
            ))}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #e4e3dd",
          paddingTop: 22,
          fontSize: 18,
        }}
      >
        <span>Research. Story. Design.</span>
        <span>slidecraft.gopaldev.in</span>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      headers: { "Cache-Control": "public, max-age=86400, s-maxage=604800" },
    },
  );
}
