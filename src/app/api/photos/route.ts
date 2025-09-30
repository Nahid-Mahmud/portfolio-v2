import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "src", "data", "photos.json");

interface Photo {
  url: string;
  alt: string;
}

export async function GET() {
  try {
    const data = fs.readFileSync(dataFilePath, "utf8");
    const photos: Photo[] = JSON.parse(data);
    return NextResponse.json(photos);
  } catch {
    return NextResponse.json({ error: "Failed to read photos" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { url, alt }: Photo = await request.json();
    if (!url || !alt) {
      return NextResponse.json({ error: "URL and alt are required" }, { status: 400 });
    }
    const data = fs.readFileSync(dataFilePath, "utf8");
    const photos: Photo[] = JSON.parse(data);
    photos.push({ url, alt });
    fs.writeFileSync(dataFilePath, JSON.stringify(photos, null, 2));
    return NextResponse.json({ message: "Photo added successfully" });
  } catch {
    return NextResponse.json({ error: "Failed to add photo" }, { status: 500 });
  }
}
