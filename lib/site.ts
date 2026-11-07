const canonical = "https://slidecraft.gopaldev.in";
if (
  process.env.NEXT_PUBLIC_SITE_URL &&
  process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "") !== canonical
) {
  throw new Error(
    "NEXT_PUBLIC_SITE_URL must match the studio canonical: https://slidecraft.gopaldev.in",
  );
}

export const site = {
  name: "Slidecraft Studio",
  url: canonical,
  description:
    "Premium LinkedIn and Instagram carousel design for founders and brands. Clear stories, distinctive design, and monthly content from ₹10,000.",
};
