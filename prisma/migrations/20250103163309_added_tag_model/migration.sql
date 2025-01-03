/*
  Warnings:

  - Added the required column `link` to the `Content` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Content" ADD COLUMN     "link" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "tag" VARCHAR(255) NOT NULL,
    "contentId" INTEGER NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_contentId_tag_key" ON "Tag"("contentId", "tag");

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
