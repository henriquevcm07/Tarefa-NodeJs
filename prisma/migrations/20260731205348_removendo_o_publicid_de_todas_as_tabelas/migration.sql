/*
  Warnings:

  - You are about to drop the column `publicId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `publicId` on the `Task` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Project_publicId_key";

-- DropIndex
DROP INDEX "Task_publicId_key";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "publicId";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "publicId";
