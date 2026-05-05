-- CreateTable: PlanCategoryItem (stores admin-managed plan categories)
CREATE TABLE "PlanCategoryItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PlanCategoryItem_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "PlanCategoryItem_name_key" ON "PlanCategoryItem"("name");

-- AlterTable: Change MembershipPlan.category from enum to text
ALTER TABLE "MembershipPlan" ALTER COLUMN "category" TYPE TEXT USING category::text;

-- Set a default for category column
ALTER TABLE "MembershipPlan" ALTER COLUMN "category" SET DEFAULT 'MEMBERSHIP';

-- Drop old enum (now unused)
DROP TYPE IF EXISTS "PlanCategory";

-- Seed the three default categories
INSERT INTO "PlanCategoryItem" ("name", "label", "order", "updatedAt") VALUES
  ('MEMBERSHIP', 'Membership Plans', 0, NOW()),
  ('SHORT_TERM', 'Short-Term / Passes', 1, NOW()),
  ('ADDITIONAL', 'Additional Packages', 2, NOW());
