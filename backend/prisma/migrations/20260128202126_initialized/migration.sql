-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "ip_address" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total_shortened_url" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "generated_urls" (
    "id" TEXT NOT NULL,
    "given_url" TEXT NOT NULL,
    "generated_url" TEXT NOT NULL,
    "unique_hash" TEXT NOT NULL,
    "is_block" BOOLEAN NOT NULL DEFAULT false,
    "total_visitors" INTEGER NOT NULL DEFAULT 0,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "generated_urls_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "generated_urls_generated_url_key" ON "generated_urls"("generated_url");

-- CreateIndex
CREATE UNIQUE INDEX "generated_urls_unique_hash_key" ON "generated_urls"("unique_hash");

-- AddForeignKey
ALTER TABLE "generated_urls" ADD CONSTRAINT "generated_urls_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
