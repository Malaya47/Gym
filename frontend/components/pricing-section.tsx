"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchPlans,
  purchaseMembership,
  clearMembershipMessages,
} from "@/store/slices/membershipSlice";

export function PricingSection() {
  const dispatch = useAppDispatch();
  const { plans, purchaseLoading, successMessage, error } = useAppSelector(
    (s) => s.membership,
  );
  const { user } = useAppSelector((s) => s.auth);
  const [toast, setToast] = useState<{
    msg: string;
    type: "success" | "error";
  } | null>(null);
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  useEffect(() => {
    dispatch(fetchPlans());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      setToast({ msg: successMessage, type: "success" });
      const t = setTimeout(() => {
        setToast(null);
        dispatch(clearMembershipMessages());
      }, 3500);
      return () => clearTimeout(t);
    }
    if (error) {
      setToast({ msg: error, type: "error" });
      const t = setTimeout(() => {
        setToast(null);
        dispatch(clearMembershipMessages());
      }, 3500);
      return () => clearTimeout(t);
    }
  }, [successMessage, error, dispatch]);

  const handleGetStarted = (planId: number) => {
    if (!user) {
      setShowLoginAlert(true);
      return;
    }
    dispatch(purchaseMembership(planId));
  };

  const membershipPlans = plans.filter((p) => p.category === "MEMBERSHIP");
  const shortTermPlans = plans.filter((p) => p.category === "SHORT_TERM");
  const additionalPlans = plans.filter((p) => p.category === "ADDITIONAL");

  // Fallback static data while loading
  const staticMembership = [
    {
      id: 0,
      duration: "12 Months",
      price: "CHF 639",
      features: ["Full gym access", "Modern equipment"],
    },
    {
      id: 0,
      duration: "12 Months",
      price: "CHF 639",
      features: ["Full gym access", "Modern equipment"],
    },
    {
      id: 0,
      duration: "6 Months",
      price: "CHF 639",
      features: ["Full gym access", "Modern equipment"],
    },
    {
      id: 0,
      duration: "12 Months",
      price: "CHF 639",
      features: ["Full gym access", "Modern equipment"],
    },
  ];

  const renderPlans = (
    list: typeof membershipPlans | typeof staticMembership,
  ) =>
    list.map((plan, index) => (
      <div key={index} className="plan-card-wrapper">
        <div
          className="relative z-10 rounded-[11px] p-6 h-full"
          style={{ background: "#0300044D" }}
        >
          <h4
            className="text-4xl font-normal text-white mb-2"
            style={{ fontWeight: 400 }}
          >
            {"duration" in plan ? plan.duration : ""}
          </h4>
          <p
            className="text-[#A09BAE] text-xl font-normal mb-8"
            style={{ fontWeight: 400 }}
          >
            {"currency" in plan
              ? `${plan.currency} ${plan.price}`
              : (plan as any).price}
          </p>
          <ul className="space-y-2 mb-6">
            {(plan.features as string[]).map((feature: string, idx: number) => (
              <li
                key={idx}
                className="flex items-center gap-2 text-white/70 text-sm"
              >
                <Check className="w-4 h-4 text-red-500" />
                {feature}
              </li>
            ))}
          </ul>
          <Button
            className="w-full bg-red-600 hover:bg-red-700 text-white btn-gradient"
            disabled={purchaseLoading || plan.id === 0}
            onClick={() => plan.id !== 0 && handleGetStarted(plan.id)}
          >
            {purchaseLoading ? "Processing..." : "Get Started"}
          </Button>
        </div>
      </div>
    ));

  return (
    <section id="membership" className="py-20 bg-transparent">
      {/* Login Alert Dialog */}
      {showLoginAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowLoginAlert(false)}
          />
          <div
            className="relative z-10 w-full max-w-sm rounded-2xl border border-white/10 p-8 flex flex-col gap-5"
            style={{ background: "#0d0014cc" }}
          >
            {/* Logo */}
            <div className="flex justify-center mb-1">
              <Image
                src="/gym-logo.png"
                alt="Sentinators"
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-extrabold text-white tracking-wide text-center">
              LOGIN REQUIRED
            </h3>
            <div
              className="w-full h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #7C3AED88, transparent)",
              }}
            />
            <p className="text-white/70 text-sm leading-relaxed text-center">
              Please log in first to purchase a membership.
            </p>
            <button
              onClick={() => setShowLoginAlert(false)}
              className="w-full py-2.5 rounded-lg border border-white/20 text-white/70 hover:text-white hover:bg-white/10 font-semibold text-sm transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Toast notification */}
      {toast && (
        <div
          className={`fixed top-20 right-4 z-99999 px-4 py-3 rounded-lg text-sm font-medium shadow-lg transition-all ${
            toast.type === "success"
              ? "bg-green-900/90 border border-green-500 text-green-300"
              : "bg-red-900/90 border border-red-500 text-red-300"
          }`}
        >
          {toast.msg}
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            OUR PLANS & PRICING
          </h2>
          <p className="text-white/60">
            Choose a membership that fits your goals
          </p>
        </div>

        {/* Separation line */}
        <div
          className="w-full flex justify-center items-center mb-12 relative"
          style={{ height: "40px" }}
        >
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "30%",
              height: "40px",
              background:
                "radial-gradient(ellipse at center, #733EA6 0%, transparent 70%)",
              opacity: 0.45,
              filter: "blur(12px)",
              zIndex: 0,
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              border: "0",
              height: "4px",
              width: "50%",
              borderRadius: "2px",
              background:
                "linear-gradient(90deg, #48215A 0%, #5D225E 50%, #48215A 100%)",
              boxShadow: "0 0 24px 0 #733EA6AA",
              position: "relative",
              zIndex: 1,
            }}
          />
        </div>

        {/* Membership Plans */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-white text-center mb-8">
            Membership Plans
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {renderPlans(
              membershipPlans.length > 0 ? membershipPlans : staticMembership,
            )}
          </div>
        </div>

        {/* Short Term Passes */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-white text-center mb-8">
            Short - Term Passes
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {renderPlans(
              shortTermPlans.length > 0
                ? shortTermPlans
                : [
                    {
                      id: 0,
                      duration: "6 Months",
                      price: "CHF 639",
                      features: ["Full gym access", "Modern equipment"],
                    },
                    {
                      id: 0,
                      duration: "12 Months",
                      price: "CHF 639",
                      features: ["Full gym access", "Modern equipment"],
                    },
                    {
                      id: 0,
                      duration: "6 Months",
                      price: "CHF 639",
                      features: ["Full gym access", "Modern equipment"],
                    },
                  ],
            )}
          </div>
        </div>

        {/* Additional Plans */}
        <div>
          <h3 className="text-xl font-semibold text-white text-center mb-8">
            Additional Plans
          </h3>
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {renderPlans(
              additionalPlans.length > 0
                ? additionalPlans
                : [
                    {
                      id: 0,
                      duration: "12 Months",
                      price: "CHF 1199",
                      features: [
                        "Full gym access",
                        "PT sessions",
                        "Nutrition plan",
                      ],
                    },
                    {
                      id: 0,
                      duration: "12 Months",
                      price: "CHF 1099",
                      features: ["Full gym access for 2", "Modern equipment"],
                    },
                  ],
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
