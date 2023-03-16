/*
  Warnings:

  - You are about to drop the column `level` on the `UserCategory` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_UserCategory" ("id", "name") SELECT "id", "name" FROM "UserCategory";
DROP TABLE "UserCategory";
ALTER TABLE "new_UserCategory" RENAME TO "UserCategory";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
