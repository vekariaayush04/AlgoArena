/*
  Warnings:

  - You are about to drop the column `startTime` on the `Contest` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `Contest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contest" DROP COLUMN "startTime",
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL;
