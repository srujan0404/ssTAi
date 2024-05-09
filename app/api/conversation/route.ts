import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { Configuration, GeminiApi } from "";

const configuration = new Configuration({
    apiKey: process.env.GEMINI_AI_KEY
});

const gemini = new GeminiApi(configuration);

export async function Post(
    req: Request
){
    try {
        const {userId} = auth();
        const body = await req.json();
        const {messages} = body;

        if(!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        if(!configuration.apiKey){
            return new NextResponse("Gemini AI key is not configured", {status: 500})
        }

        if(!messages){
            return new NextResponse("Messages are required", {status: 400});
        }

        const response = await gemini.createChatCompletion({
            model: "gemini-1.5-pro", 
            messages
        });

        return NextResponse.json(response.data.choices[0].message);

    } catch (error) {
        console.log("[CONVERSATION_ERROR]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}
