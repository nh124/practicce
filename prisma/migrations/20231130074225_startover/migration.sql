/*
  Warnings:

  - You are about to drop the column `userId` on the `listing` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id,userId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ownerClerkId` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `Listing` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `listing` DROP FOREIGN KEY `Listing_userId_fkey`;

-- DropIndex
DROP INDEX `Listing_id_userId_idx` ON `listing`;

-- AlterTable
ALTER TABLE `listing` DROP COLUMN `userId`,
    ADD COLUMN `ownerClerkId` VARCHAR(191) NOT NULL,
    ADD COLUMN `ownerId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `role`;

-- CreateIndex
CREATE INDEX `Listing_id_ownerId_idx` ON `Listing`(`id`, `ownerId`);

-- CreateIndex
CREATE UNIQUE INDEX `User_id_userId_key` ON `User`(`id`, `userId`);

-- AddForeignKey
ALTER TABLE `Listing` ADD CONSTRAINT `Listing_ownerId_ownerClerkId_fkey` FOREIGN KEY (`ownerId`, `ownerClerkId`) REFERENCES `User`(`id`, `userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
