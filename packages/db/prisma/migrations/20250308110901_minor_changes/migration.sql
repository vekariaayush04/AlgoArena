/*
  Warnings:

  - A unique constraint covering the columns `[judge0Id]` on the table `Language` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "DefaultCode" DROP CONSTRAINT "DefaultCode_languageId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Language_judge0Id_key" ON "Language"("judge0Id");

-- AddForeignKey
ALTER TABLE "DefaultCode" ADD CONSTRAINT "DefaultCode_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("judge0Id") ON DELETE CASCADE ON UPDATE CASCADE;
