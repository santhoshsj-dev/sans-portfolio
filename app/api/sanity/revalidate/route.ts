import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type SanityWebhookBody = { _type?: string };

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ message: "Webhook secret is not configured." }, { status: 500 });
  }

  const { body, isValidSignature } = await parseBody<SanityWebhookBody>(request, secret);
  if (!isValidSignature) {
    return NextResponse.json({ message: "Invalid webhook signature." }, { status: 401 });
  }
  if (!body?._type || !["project", "siteContent"].includes(body._type)) {
    return NextResponse.json({ message: "Unsupported document type." }, { status: 400 });
  }

  revalidateTag(`sanity:${body._type}`, "max");
  return NextResponse.json({ revalidated: true, type: body._type });
}
