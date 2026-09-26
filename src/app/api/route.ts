import { NextResponse } from "next/server";

// output: "export" (GitHub Pages 정적 빌드)를 위해 강제 static 프리렌더
export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json({ message: "Hello, world!" });
}