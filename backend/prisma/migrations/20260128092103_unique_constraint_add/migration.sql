/*
  Warnings:

  - A unique constraint covering the columns `[generated_url]` on the table `generated_urls` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "generated_urls_generated_url_key" ON "generated_urls"("generated_url");
