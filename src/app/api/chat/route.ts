import { createMessage } from "@/db";
import { createDeepSeek } from "@ai-sdk/deepseek";
import { auth } from "@clerk/nextjs/server";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const deepseek = createDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: process.env.BASE_URL,
});

export async function POST(req: Request) {
  try {
    const { messages, model, chat_id, chat_user_id } = await req.json();

    const { userId } = await auth();

    if (!userId || userId !== chat_user_id) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    // 确保有消息
    if (!messages || messages.length === 0) {
      return new Response(JSON.stringify({ error: "No messages provided" }), {
        status: 400,
      });
    }

    // 存入用户信息
    const lastMessage = messages[messages.length - 1];
    await createMessage(chat_id, lastMessage.content, lastMessage.role);

    // 使用用户选择的模型，默认为 deepseek-v3
    const modelToUse = model === "deepseek-r1" ? "deepseek-r1" : "deepseek-v3";

    const result = streamText({
      model: deepseek(modelToUse),
      system: "You are a helpful assistant.",
      messages,
      onFinish: async (result) => {
        await createMessage(chat_id, result.text, "assistant");
      },
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
