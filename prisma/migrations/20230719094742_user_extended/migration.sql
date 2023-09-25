-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL DEFAULT 'admin@admin.com',
    "shippingAddress" TEXT NOT NULL DEFAULT 'Orange Street 24/3',
    "shippingCity" TEXT NOT NULL DEFAULT 'New York City',
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "registredAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("id", "lastname", "name", "registredAt", "username") SELECT "id", "lastname", "name", "registredAt", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
