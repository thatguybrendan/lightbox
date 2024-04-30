-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_repId_fkey";

-- AlterTable
ALTER TABLE "Conversation" ALTER COLUMN "repId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_repId_fkey" FOREIGN KEY ("repId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
