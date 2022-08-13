/*
  Warnings:

  - You are about to drop the `player_scores` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `players` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "player_scores" DROP CONSTRAINT "fk_player";

-- DropTable
DROP TABLE "player_scores";

-- DropTable
DROP TABLE "players";

-- CreateTable
CREATE TABLE "users" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "name" STRING NOT NULL,
    "email" STRING NOT NULL,
    "phone" STRING NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "histRecord" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "title" STRING NOT NULL,
    "content" STRING NOT NULL,
    "comment" STRING NOT NULL,

    CONSTRAINT "histRecord_pkey" PRIMARY KEY ("id")
);
