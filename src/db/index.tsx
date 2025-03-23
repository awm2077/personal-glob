import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { and, desc, eq } from "drizzle-orm";
import { chatTable, messages } from "./schema";

// 添加更多连接选项以处理特殊字符和认证问题
const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString, {
  ssl: { rejectUnauthorized: false }, // 允许自签名证书
  max: 10, // 连接池最大连接数
  idle_timeout: 20, // 空闲连接超时时间
  connect_timeout: 10, // 连接超时时间
});
const db = drizzle({ client });

// chat
export const createChat = async (
  title: string,
  userId: string,
  model: string
) => {
  try {
    const [newChat] = await db
      .insert(chatTable)
      .values({
        title,
        userId,
        model,
      })
      .returning();
    return newChat;
  } catch (e) {
    console.log("createChat" + e);
    return null;
  }
};

export const getChat = async (chatId: number, userId: string) => {
  try {
    const chat = await db
      .select()
      .from(chatTable)
      .where(and((eq(chatTable.id, chatId), eq(chatTable.userId, userId))));
    if (chat.length === 0) {
      return null;
    } else {
      return chat[0];
    }
  } catch (e) {
    console.log("getChat" + e);
    return null;
  }
};

export const getChats = async (userId: string) => {
  try {
    const chats = await db
      .select()
      .from(chatTable)
      .where(eq(chatTable.userId, userId))
      .orderBy(desc(chatTable.id));
    return chats;
  } catch (e) {
    console.log("getChats" + e);
    return null;
  }
};

// message
export const createMessage = async (
  chatId: number,
  content: string,
  role: string
) => {
  try {
    const [newMessage] = await db
      .insert(messages)
      .values({
        chatId,
        content,
        role,
      })
      .returning();
    return newMessage;
  } catch (e) {
    console.log("createMessage" + e);
    return null;
  }
};

export const getMessages = async (chatId: number) => {
  try {
    const messagesT = await db
      .select()
      .from(messages)
      .where(eq(messages.chatId, chatId));
    return messagesT;
  } catch (e) {
    console.log("getMessage" + e);
    return null;
  }
};
