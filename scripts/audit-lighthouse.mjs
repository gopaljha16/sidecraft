import { mkdir, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { platform, release } from "node:os";
import lighthouse from "lighthouse";
import desktopConfig from "lighthouse/core/config/desktop-config.js";
import { launch } from "chrome-launcher";

const origin = new URL(process.argv[2] || "http://127.0.0.1:3000");
if (!["http:", "https:"].includes(origin.protocol) || origin.username || origin.password) {
  throw new Error("Use a website origin without embedded credentials.");
}
const defaultPaths = [
  "/",
  "/services/carousel-design",
  "/work",
  "/insights/brief-a-linkedin-carousel-designer",
];
const paths = process.argv.length > 3 ? process.argv.slice(3) : defaultPaths;
if (paths.some((path) => !defaultPaths.includes(path))) {
  throw new Error("Choose a homepage, service, work, or initial article route.");
}
const local = ["localhost", "127.0.0.1", "[::1]"].includes(origin.hostname);
const output = join(
  process.cwd(),
  "docs",
  "qa",
  "lighthouse",
  new Date().toISOString().replace(/[:.]/g, "-"),
);
await mkdir(output, { recursive: true });
const summary = {
  context: local
    ? "Local production-build lab audit; deployed results and field Core Web Vitals remain unverified."
    : "Deployed URL lab audit; this does not measure field Core Web Vitals.",
  baseUrl: origin.origin,
  system: `${platform()} ${release()}`,
  node: process.version,
  createdAt: new Date().toISOString(),
  results: [],
};
const chrome = await launch({
  chromePath: process.env.CHROME_PATH || undefined,
  chromeFlags: ["--headless=new", "--disable-gpu", "--no-first-run"],
});
try {
  for (const formFactor of ["mobile", "desktop"]) {
    for (const path of paths) {
      const url = new URL(path, origin.origin).toString();
      const result = await lighthouse(
        url,
        {
          port: chrome.port,
          output: ["json", "html"],
          logLevel: "error",
          onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
        },
        formFactor === "desktop" ? desktopConfig : undefined,
      );
      if (!result || result.lhr.runtimeError)
        throw new Error(
          result?.lhr.runtimeError?.message || "Lighthouse did not produce a result.",
        );
      const name = `${formFactor}-${path === "/" ? "home" : path.slice(1).replaceAll("/", "-")}`;
      const reports = Array.isArray(result.report)
        ? result.report
        : [JSON.stringify(result.lhr), result.report];
      await writeFile(join(output, `${name}.json`), reports[0]);
      await writeFile(join(output, `${name}.html`), reports[1]);
      const scores = Object.fromEntries(
        Object.entries(result.lhr.categories).map(([key, value]) => [
          key,
          value.score === null ? null : Math.round(value.score * 100),
        ]),
      );
      const failed = Object.values(result.lhr.audits)
        .filter(
          (audit) =>
            audit.score !== null &&
            audit.score < 1 &&
            ["binary", "numeric"].includes(audit.scoreDisplayMode),
        )
        .map(({ id, title, displayValue }) => ({ id, title, displayValue }));
      summary.results.push({
        url,
        formFactor,
        lighthouseVersion: result.lhr.lighthouseVersion,
        fetchTime: result.lhr.fetchTime,
        userAgent: result.lhr.userAgent,
        scores,
        metrics: {
          lcp: result.lhr.audits["largest-contentful-paint"]?.numericValue,
          cls: result.lhr.audits["cumulative-layout-shift"]?.numericValue,
          tbt: result.lhr.audits["total-blocking-time"]?.numericValue,
        },
        settings: result.lhr.configSettings,
        failed,
      });
      await writeFile(join(output, "summary.json"), JSON.stringify(summary, null, 2));
      console.log(
        JSON.stringify({
          path,
          formFactor,
          scores,
          report: relative(process.cwd(), join(output, `${name}.html`)),
        }),
      );
    }
  }
} finally {
  await chrome.kill();
}
console.log(`Reports saved in ${relative(process.cwd(), output)}`);
