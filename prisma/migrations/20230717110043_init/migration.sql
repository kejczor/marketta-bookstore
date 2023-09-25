-- CreateTable
CREATE TABLE "Storeitem" (
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

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "registredAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Opinion" (
    "title" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "storeitemId" TEXT NOT NULL,
    "rate" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "editedAt" DATETIME NOT NULL,
    CONSTRAINT "Opinion_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Opinion_storeitemId_fkey" FOREIGN KEY ("storeitemId") REFERENCES "Storeitem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Opinion_authorId_storeitemId_key" ON "Opinion"("authorId", "storeitemId");
