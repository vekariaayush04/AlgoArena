/*
  Warnings:

  - You are about to drop the column `endDate` on the `Contest` table. All the data in the column will be lost.
  - Added the required column `startTime` to the `Contest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contest" DROP COLUMN "endDate",
ADD COLUMN     "startTime" TEXT NOT NULL;
