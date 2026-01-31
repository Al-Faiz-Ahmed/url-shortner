-- AlterTable
ALTER TABLE "generated_urls" ADD COLUMN     "expiration_date" TIMESTAMP(3) NOT NULL DEFAULT (now() + interval '7 days');
