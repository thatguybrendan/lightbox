import type { Conversation } from "@prisma/client";

export type NewConversation = Omit<Conversation, "id" | "repId">;
