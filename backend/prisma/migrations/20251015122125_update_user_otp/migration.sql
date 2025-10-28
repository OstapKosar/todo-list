/*
  Warnings:

  - You are about to drop the column `expiresAt` on the `user_otps` table. All the data in the column will be lost.
  - Added the required column `status` to the `user_otps` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "user_otp_status" AS ENUM ('ACTIVE', 'EXPIRED', 'ARCHIVED');

-- AlterTable
ALTER TABLE "user_otps" DROP COLUMN "expiresAt",
ADD COLUMN     "status" "user_otp_status" NOT NULL;
