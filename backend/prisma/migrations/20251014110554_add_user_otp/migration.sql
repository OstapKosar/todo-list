-- CreateEnum
CREATE TYPE "user_status" AS ENUM ('VERIFIED', 'UNVERIFIED', 'PENDING');

-- CreateEnum
CREATE TYPE "user_otp_type" AS ENUM ('VERIFICATION', 'RESET_PASSWORD');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "status" "user_status" NOT NULL DEFAULT 'UNVERIFIED';

-- CreateTable
CREATE TABLE "user_otps" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "user_otp_type" NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_otps_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_otps" ADD CONSTRAINT "user_otps_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
