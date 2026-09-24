import { NextResponse } from "next/server";
import { highlightCode } from "@/lib/code/highlight";

export async function POST(req: Request) {
  try {
    const { code, language = "tsx", highlight } = await req.json();

    if (typeof code !== "string") {
      return NextResponse.json({ error: "Code is required" }, { status: 400 });
    }

    const html = await highlightCode(code, language, highlight);

    return NextResponse.json({ html });
  } catch (error) {
    console.error("Failed to highlight code:", error);
    return NextResponse.json(
      { error: "Highlighting failed" },
      { status: 500 }
    );
  }
}
