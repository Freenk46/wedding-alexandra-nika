import { NextRequest, NextResponse } from "next/server";

const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL ?? "";

export async function POST(request: NextRequest) {
  if (!GOOGLE_SCRIPT_URL) {
    return NextResponse.json({ success: false, error: "not_configured" }, { status: 500 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "invalid_body" }, { status: 400 });
  }

  try {
    const upstream = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "follow",
    });

    const text = await upstream.text();
    let parsed: { result?: string } | null = null;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = null;
    }

    if (upstream.ok && parsed?.result === "success") {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, error: "upstream_failed" },
      { status: 502 }
    );
  } catch {
    return NextResponse.json({ success: false, error: "network_error" }, { status: 502 });
  }
}
