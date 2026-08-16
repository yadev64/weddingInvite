import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    return NextResponse.json(
      { error: "Cloudinary is not configured" },
      { status: 503 },
    );
  }

  try {
    const result = await cloudinary.search
      .expression("folder:curated")
      .max_results(100)
      .execute();

    interface MomentResource {
  public_id: string;
  context?: { custom?: Record<string, string> };
}

const items = (result.resources ?? []).map((r: MomentResource) => ({
      id: r.public_id,
      url: cloudinary.url(r.public_id, {
        fetch_format: "auto",
        quality: "auto",
        crop: "fill",
        gravity: "auto",
        width: 900,
      }),
      thumb: cloudinary.url(r.public_id, {
        fetch_format: "auto",
        quality: "auto",
        crop: "fill",
        gravity: "auto",
        width: 500,
        height: 500,
      }),
      name: r.context?.custom?.guest_name ?? "",
    }));

    return NextResponse.json({ items });
  } catch (err) {
    console.error("Failed to fetch curated moments:", err);
    return NextResponse.json(
      { error: "Failed to load moments" },
      { status: 500 },
    );
  }
}