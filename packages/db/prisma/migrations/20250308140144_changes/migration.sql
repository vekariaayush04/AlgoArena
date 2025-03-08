/*
  Warnings:

  - A unique constraint covering the columns `[judge0SubmissionId]` on the table `TestCase` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `index` to the `TestCase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TestCase" ADD COLUMN     "index" INTEGER NOT NULL,
ALTER COLUMN "judge0SubmissionId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "TestCase_judge0SubmissionId_key" ON "TestCase"("judge0SubmissionId");
