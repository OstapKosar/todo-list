/*
  Warnings:

  - Changed the type of `urgency` on the `project_tasks` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `importance` on the `project_tasks` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "project_tasks" DROP COLUMN "urgency",
ADD COLUMN     "urgency" BOOLEAN NOT NULL,
DROP COLUMN "importance",
ADD COLUMN     "importance" BOOLEAN NOT NULL;
