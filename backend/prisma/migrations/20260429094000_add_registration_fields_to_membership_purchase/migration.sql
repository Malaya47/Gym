ALTER TABLE "MembershipPurchase"
ADD COLUMN "registrationFee" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN "totalAmount" DOUBLE PRECISION,
ADD COLUMN "startDate" TIMESTAMP(3),
ADD COLUMN "emergencyContact" TEXT,
ADD COLUMN "address" TEXT,
ADD COLUMN "acceptedAgreement" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "acceptedTerms" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "signatureDataUrl" TEXT,
ADD COLUMN "registrationDetails" JSONB;
