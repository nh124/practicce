/*
  Warnings:

  - You are about to drop the column `ownerClerkId` on the `Listing` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Listing` DROP FOREIGN KEY `Listing_ownerId_ownerClerkId_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_sellerId_fkey`;

-- DropIndex
DROP INDEX `User_id_userId_idx` ON `User`;

-- DropIndex
DROP INDEX `User_id_userId_key` ON `User`;

-- AlterTable
ALTER TABLE `Listing` DROP COLUMN `ownerClerkId`,
    MODIFY `ownerId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    MODIFY `sellerId` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`userId`);

-- CreateIndex
CREATE INDEX `User_userId_idx` ON `User`(`userId`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_sellerId_fkey` FOREIGN KEY (`sellerId`) REFERENCES `User`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Listing` ADD CONSTRAINT `Listing_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `User` RENAME INDEX `User_userId_key` TO `unique_userId_constraint`;
