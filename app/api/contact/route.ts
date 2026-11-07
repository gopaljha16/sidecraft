import { getContactConfig } from "@/lib/contact-config";
import { createContactHandler } from "@/lib/contact-handler";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request: Request) {
  return createContactHandler(getContactConfig())(request);
}
