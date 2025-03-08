/*
  Warnings:

  - You are about to drop the column `description` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Submission` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "description",
DROP COLUMN "title",
ALTER COLUMN "memory" DROP NOT NULL,
ALTER COLUMN "time" DROP NOT NULL;
