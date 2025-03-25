/*
  Warnings:

  - You are about to drop the column `electricityKwh` on the `Record` table. All the data in the column will be lost.
  - You are about to drop the column `gasM3` on the `Record` table. All the data in the column will be lost.
  - You are about to drop the column `priceElectricity` on the `Record` table. All the data in the column will be lost.
  - You are about to drop the column `priceGas` on the `Record` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Record" DROP COLUMN "electricityKwh",
DROP COLUMN "gasM3",
DROP COLUMN "priceElectricity",
DROP COLUMN "priceGas",
ADD COLUMN     "nightPrice" DECIMAL(65,30),
ADD COLUMN     "nightUsage" INTEGER,
ADD COLUMN     "price" DECIMAL(65,30),
ADD COLUMN     "usage" INTEGER,
ALTER COLUMN "type" DROP DEFAULT;
