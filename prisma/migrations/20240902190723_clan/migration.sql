-- CreateEnum
CREATE TYPE "StatusEnum" AS ENUM ('pending', 'accepted', 'blocked');

-- CreateTable
CREATE TABLE "Friendship" (
    "id" TEXT NOT NULL,
    "fromUserId" TEXT NOT NULL,
    "toUserId" TEXT NOT NULL,
    "status" "StatusEnum" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Friendship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "clanLeaderId" TEXT NOT NULL,

    CONSTRAINT "Clan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ClanMembers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Friendship_fromUserId_toUserId_key" ON "Friendship"("fromUserId", "toUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Clan_name_key" ON "Clan"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Clan_clanLeaderId_key" ON "Clan"("clanLeaderId");

-- CreateIndex
CREATE UNIQUE INDEX "_ClanMembers_AB_unique" ON "_ClanMembers"("A", "B");

-- CreateIndex
CREATE INDEX "_ClanMembers_B_index" ON "_ClanMembers"("B");

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clan" ADD CONSTRAINT "Clan_clanLeaderId_fkey" FOREIGN KEY ("clanLeaderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClanMembers" ADD CONSTRAINT "_ClanMembers_A_fkey" FOREIGN KEY ("A") REFERENCES "Clan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClanMembers" ADD CONSTRAINT "_ClanMembers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
