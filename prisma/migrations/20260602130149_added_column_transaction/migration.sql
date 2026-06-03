-- AlterTable
ALTER TABLE "Transactions" ADD COLUMN     "moneyChanged" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "moneyPayed" INTEGER NOT NULL DEFAULT 0;
