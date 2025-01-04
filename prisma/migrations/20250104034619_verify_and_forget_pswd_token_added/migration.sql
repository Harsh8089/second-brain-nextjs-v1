-- AlterTable
ALTER TABLE "User" ADD COLUMN     "forgetPasswordToken" TEXT,
ADD COLUMN     "forgetPasswordTokenExpiry" TIMESTAMP(3),
ADD COLUMN     "verificationToken" TEXT,
ADD COLUMN     "verificationTokenExpiry" TIMESTAMP(3);
