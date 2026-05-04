-- AlterTable
ALTER TABLE "MembershipPurchase" ADD COLUMN     "additionalPlanIds" INTEGER[] DEFAULT ARRAY[]::INTEGER[];
