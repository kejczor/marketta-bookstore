/*
  Warnings:

  - You are about to drop the column `editedAt` on the `Opinion` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Opinion` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Opinion" (
    "title" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "storeitemId" TEXT NOT NULL,
    "rate" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Opinion_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Opinion_storeitemId_fkey" FOREIGN KEY ("storeitemId") REFERENCES "Storeitem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Opinion" ("authorId", "createdAt", "description", "rate", "storeitemId", "title") SELECT "authorId", "createdAt", "description", "rate", "storeitemId", "title" FROM "Opinion";
DROP TABLE "Opinion";
ALTER TABLE "new_Opinion" RENAME TO "Opinion";
CREATE UNIQUE INDEX "Opinion_authorId_storeitemId_key" ON "Opinion"("authorId", "storeitemId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
