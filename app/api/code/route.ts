import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_KEY
});

const openai = new OpenAIApi(configuration);

const instructionMessage: ChatCompletionRequestMessage = {
    role: "system",
    content: "you are a code generator. you must answer only in markdown code snippets"
}

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
            return new NextResponse("Open AI key is not configured", {status: 500})
        }

        if(!messages){
            return new NextResponse("Messages are required", {status: 400});
        }

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo", 
            messages: [instructionMessage, ...messages]
        });


        return NextResponse.json(response.data.choices[0].message);

    } catch (error) {
        console.log("[CODE_ERROR]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}