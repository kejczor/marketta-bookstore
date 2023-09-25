-- AlterTable
ALTER TABLE "Storeitem" ADD COLUMN "userId" TEXT;

-- CreateTable
CREATE TABLE "_StoreitemToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_StoreitemToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Storeitem" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_StoreitemToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "shippingAddress" TEXT NOT NULL,
    "shippingCity" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "registredAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("email", "id", "lastname", "name", "password", "registredAt", "shippingAddress", "shippingCity", "username") SELECT "email", "id", "lastname", "name", "password", "registredAt", "shippingAddress", "shippingCity", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_StoreitemToUser_AB_unique" ON "_StoreitemToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_StoreitemToUser_B_index" ON "_StoreitemToUser"("B");
