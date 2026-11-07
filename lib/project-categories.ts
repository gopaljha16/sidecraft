export const categories = [
  "All",
  "SaaS & Technology",
  "Founder Branding",
  "Education",
  "Marketing",
  "Business & Case Studies",
] as const;
export type Category = (typeof categories)[number];
