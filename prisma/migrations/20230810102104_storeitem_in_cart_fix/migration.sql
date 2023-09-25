-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_StoreitemInCart" (
    "storeitemId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    PRIMARY KEY ("storeitemId", "userId"),
    CONSTRAINT "StoreitemInCart_storeitemId_fkey" FOREIGN KEY ("storeitemId") REFERENCES "Storeitem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StoreitemInCart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_StoreitemInCart" ("quantity", "storeitemId", "userId") SELECT "quantity", "storeitemId", "userId" FROM "StoreitemInCart";
DROP TABLE "StoreitemInCart";
ALTER TABLE "new_StoreitemInCart" RENAME TO "StoreitemInCart";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
