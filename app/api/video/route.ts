import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

interface RequestBody {
  prompt: string;
}

export async function POST(req: any) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body: RequestBody = await req.json();
    const { prompt } = body;

    if (!prompt) {
      return new NextResponse("Prompt is required for music generation", {
        status: 400,
      });
    }

    const response = await replicate.run(
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      {
        input: {
          fps: 24,
          width: 1024,
          height: 576,
          prompt: prompt,
          guidance_scale: 17.5,
          negative_prompt: "very blue, dust, noisy, washed out, ugly, distorted, broken",
        },
      }
    );

    return NextResponse.json(response);
  } catch (error) {
    console.error("[MUSIC_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
