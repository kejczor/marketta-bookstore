/*
  Warnings:

  - You are about to drop the `_StoreitemToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `userId` on the `Storeitem` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "_StoreitemToUser_B_index";

-- DropIndex
DROP INDEX "_StoreitemToUser_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_StoreitemToUser";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "StoreitemInCart" (
    "storeitemId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    PRIMARY KEY ("storeitemId", "userId"),
    CONSTRAINT "StoreitemInCart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Storeitem" (
    "type" TEXT NOT NULL,
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "pages" INTEGER NOT NULL,
    "publisher" TEXT NOT NULL,
    "publicationYear" INTEGER NOT NULL,
    "binding" TEXT NOT NULL,
    "imgURL" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "avargeRate" REAL NOT NULL
);
INSERT INTO "new_Storeitem" ("author", "avargeRate", "binding", "description", "id", "imgURL", "pages", "price", "publicationYear", "publisher", "title", "type") SELECT "author", "avargeRate", "binding", "description", "id", "imgURL", "pages", "price", "publicationYear", "publisher", "title", "type" FROM "Storeitem";
DROP TABLE "Storeitem";
ALTER TABLE "new_Storeitem" RENAME TO "Storeitem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
