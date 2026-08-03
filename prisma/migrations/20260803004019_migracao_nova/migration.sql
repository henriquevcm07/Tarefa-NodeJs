/*
  Warnings:

  - A unique constraint covering the columns `[taskId,userId]` on the table `TaskUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TaskUser_taskId_userId_key" ON "TaskUser"("taskId", "userId");
