/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Queja` table. All the data in the column will be lost.
  - You are about to drop the column `fecha` on the `Queja` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Queja` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Queja` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Queja" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL
);
INSERT INTO "new_Queja" ("descripcion", "id", "titulo") SELECT "descripcion", "id", "titulo" FROM "Queja";
DROP TABLE "Queja";
ALTER TABLE "new_Queja" RENAME TO "Queja";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
