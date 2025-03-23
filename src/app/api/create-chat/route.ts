// import {json} from "stream/consumers"

import { auth } from "@clerk/nextjs/server";
import { createChat } from "@/db";

export async function POST(req: Request) {
  try {
    const { title, model } = await req.json();
    const { userId } = await auth();

    if (!userId) {
      console.log("No user ID found");
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401
      });
    }

    // 创建一个chat
    console.log(`Creating chat with title: ${title}, model: ${model}, userId: ${userId}`);
    const newChat = await createChat(title, userId, model);

    if (!newChat || !newChat.id) {
      console.error("Failed to create chat or no ID returned");
      return new Response(JSON.stringify({ error: "Failed to create chat" }), {
        status: 500
      });
    }

    console.log(`Chat created successfully with ID: ${newChat.id}`);
    return new Response(JSON.stringify({ id: newChat.id }), { status: 200 });
  } catch (error) {
    console.error("Error creating chat:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500
    });
  }
}
