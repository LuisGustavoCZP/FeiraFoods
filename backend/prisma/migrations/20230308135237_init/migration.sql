/*
  Warnings:

  - You are about to drop the `_UserToUserRole` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "_UserToUserRole_B_index";

-- DropIndex
DROP INDEX "_UserToUserRole_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_UserToUserRole";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "UserCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_UserCategoryToUserRole" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_UserCategoryToUserRole_A_fkey" FOREIGN KEY ("A") REFERENCES "UserCategory" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_UserCategoryToUserRole_B_fkey" FOREIGN KEY ("B") REFERENCES "UserRole" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "User_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "UserCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("email", "id", "name", "password") SELECT "email", "id", "name", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_UserCategoryToUserRole_AB_unique" ON "_UserCategoryToUserRole"("A", "B");

-- CreateIndex
CREATE INDEX "_UserCategoryToUserRole_B_index" ON "_UserCategoryToUserRole"("B");
