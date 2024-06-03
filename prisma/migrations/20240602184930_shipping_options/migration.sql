-- CreateTable
CREATE TABLE "ShippingOption" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "daysForDelivery" INTEGER NOT NULL,
    "latestAcceptedOrderHour" INTEGER NOT NULL
);
