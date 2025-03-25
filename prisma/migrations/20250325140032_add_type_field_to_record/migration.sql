-- CreateEnum
CREATE TYPE "RecordType" AS ENUM ('gas', 'electricity');

-- AlterTable
ALTER TABLE "Record" ADD COLUMN     "type" "RecordType" NOT NULL DEFAULT 'electricity';
