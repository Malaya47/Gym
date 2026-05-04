import { Router, Response } from "express";
import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { requireAuth, AuthRequest } from "../middleware/auth";

const router = Router();

function parseStartDate(value: unknown) {
  if (!value || typeof value !== "string") return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

// ─── GET /api/membership/plans ──────────────────────────
// Public – list all active membership plans
router.get("/plans", async (_req, res: Response): Promise<void> => {
  try {
    const plans = await prisma.membershipPlan.findMany({
      where: { isActive: true },
      orderBy: { id: "asc" },
    });
    res.json({ plans });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch plans" });
  }
});

// ─── POST /api/membership/purchase ──────────────────────
// Auth required – user purchases a plan
router.post(
  "/purchase",
  requireAuth,
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const {
        planId,
        additionalPlanIds,
        registrationFee,
        totalAmount,
        signatureDataUrl,
        registrationDetails,
      } = req.body;

      if (!planId) {
        res.status(400).json({ error: "planId is required" });
        return;
      }

      const plan = await prisma.membershipPlan.findUnique({
        where: { id: Number(planId) },
      });
      if (!plan || !plan.isActive) {
        res.status(404).json({ error: "Plan not found or inactive" });
        return;
      }

      // Validate and fetch additional plans
      const additionalIds: number[] = Array.isArray(additionalPlanIds)
        ? additionalPlanIds.map(Number).filter((n) => Number.isFinite(n))
        : [];

      let additionalPlans: (typeof plan)[] = [];
      if (additionalIds.length > 0) {
        additionalPlans = await prisma.membershipPlan.findMany({
          where: {
            id: { in: additionalIds },
            isActive: true,
            category: "ADDITIONAL",
          },
        });
        if (additionalPlans.length !== additionalIds.length) {
          res
            .status(400)
            .json({
              error: "One or more additional plans are invalid or inactive",
            });
          return;
        }
      }

      // Check for existing pending/approved purchase
      const existing = await prisma.membershipPurchase.findFirst({
        where: {
          userId: req.userId,
          planId: Number(planId),
          status: { in: ["PENDING", "APPROVED"] },
        },
      });
      if (existing) {
        res.status(409).json({
          error: "You already have an active or pending purchase for this plan",
        });
        return;
      }

      const details =
        registrationDetails &&
        typeof registrationDetails === "object" &&
        !Array.isArray(registrationDetails)
          ? (registrationDetails as Record<string, unknown>)
          : {};

      const resolvedRegistrationFee =
        registrationFee !== undefined ? Number(registrationFee) : 0;

      const additionalTotal = additionalPlans.reduce(
        (sum, p) => sum + p.price,
        0,
      );

      const resolvedTotalAmount =
        totalAmount !== undefined
          ? Number(totalAmount)
          : plan.price + additionalTotal + resolvedRegistrationFee;

      const additionalNotes =
        additionalPlans.length > 0
          ? `Additional plans: ${additionalPlans.map((p) => `${p.name || p.duration} (${p.currency} ${p.price})`).join(", ")}`
          : null;

      const purchase = await prisma.membershipPurchase.create({
        data: {
          userId: req.userId as number,
          planId: Number(planId),
          additionalPlanIds: additionalIds,
          status: "PENDING",
          registrationFee: Number.isFinite(resolvedRegistrationFee)
            ? resolvedRegistrationFee
            : 0,
          totalAmount: Number.isFinite(resolvedTotalAmount)
            ? resolvedTotalAmount
            : plan.price + additionalTotal,
          startDate: parseStartDate(details.startDate),
          emergencyContact:
            typeof details.emergencyContact === "string"
              ? details.emergencyContact
              : null,
          address: typeof details.address === "string" ? details.address : null,
          acceptedAgreement: details.acceptedAgreement === true,
          acceptedTerms: details.acceptedTerms === true,
          signatureDataUrl:
            typeof signatureDataUrl === "string" ? signatureDataUrl : null,
          registrationDetails: details as Prisma.InputJsonValue,
          notes: [
            `Registration fee: ${plan.currency} ${
              Number.isFinite(resolvedRegistrationFee)
                ? resolvedRegistrationFee
                : 0
            }`,
            additionalNotes,
            `Total submitted: ${plan.currency} ${
              Number.isFinite(resolvedTotalAmount)
                ? resolvedTotalAmount
                : plan.price + additionalTotal
            }`,
            signatureDataUrl ? "Signature captured: Yes" : null,
            Object.keys(details).length > 0
              ? `Registration details: ${JSON.stringify(details)}`
              : null,
          ]
            .filter(Boolean)
            .join("\n"),
        },
        include: { plan: true },
      });

      res.status(201).json({
        message: "Membership purchase submitted. Awaiting admin approval.",
        purchase: { ...purchase, additionalPlans },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Purchase failed" });
    }
  },
);

// ─── GET /api/membership/my-purchases ───────────────────
// Auth required – user sees their own purchases
router.get(
  "/my-purchases",
  requireAuth,
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const purchases = await prisma.membershipPurchase.findMany({
        where: { userId: req.userId },
        include: { plan: true },
        orderBy: { createdAt: "desc" },
      });
      res.json({ purchases });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch purchases" });
    }
  },
);

export default router;
