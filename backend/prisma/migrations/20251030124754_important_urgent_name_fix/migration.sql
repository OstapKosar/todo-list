/*
  Warnings:

  - You are about to drop the column `importance` on the `project_tasks` table. All the data in the column will be lost.
  - You are about to drop the column `urgency` on the `project_tasks` table. All the data in the column will be lost.
  - Added the required column `important` to the `project_tasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `urgent` to the `project_tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "project_tasks" DROP COLUMN "importance",
DROP COLUMN "urgency",
ADD COLUMN     "important" BOOLEAN NOT NULL,
ADD COLUMN     "urgent" BOOLEAN NOT NULL;
