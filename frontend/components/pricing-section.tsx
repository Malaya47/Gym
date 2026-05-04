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
  const [activeCategory, setActiveCategory] = useState<
    "MEMBERSHIP" | "SHORT_TERM" | "ADDITIONAL"
  >("MEMBERSHIP");

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
  const categoryTabs = [
    {
      key: "MEMBERSHIP" as const,
      label: "Annual",
      title: "Membership Plans",
      subtitle: "Long-term plans for consistent training",
    },
    {
      key: "SHORT_TERM" as const,
      label: "Short Term",
      title: "Short-Term Plans",
      subtitle: "Flexible passes for shorter commitments",
    },
    {
      key: "ADDITIONAL" as const,
      label: "Additional",
      title: "Additional Plans",
      subtitle: "Packages and add-ons for extra support",
    },
  ];

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

  const activePlans =
    activeCategory === "MEMBERSHIP"
      ? membershipPlans.length > 0
        ? membershipPlans
        : staticMembership
      : activeCategory === "SHORT_TERM"
        ? shortTermPlans.length > 0
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
            ]
        : additionalPlans.length > 0
          ? additionalPlans
          : [
              {
                id: 0,
                duration: "12 Months",
                price: "CHF 1199",
                features: ["Full gym access", "PT sessions", "Nutrition plan"],
              },
              {
                id: 0,
                duration: "12 Months",
                price: "CHF 1099",
                features: ["Full gym access for 2", "Modern equipment"],
              },
            ];

  const activeTab = categoryTabs.find((tab) => tab.key === activeCategory)!;

  return (
    <section id="membership" className="mb-10 bg-transparent">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            OUR PLANS & PRICING
          </h2>
          <p className="text-white/60 mb-5">
            Choose a membership that fits your goals
          </p>
        </div>

        {/* Separation line */}
        {/* <div
          className="w-full flex justify-center items-center mb-5 relative"
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
        </div> */}

        <div className="mb-10 flex justify-center">
          <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1 shadow-[0_0_28px_rgba(115,62,166,0.18)]">
            {categoryTabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveCategory(tab.key)}
                className={`rounded-full px-5 py-2 text-xs font-semibold transition sm:text-sm ${
                  activeCategory === tab.key
                    ? "bg-red-700 text-white shadow-[0_0_18px_rgba(220,38,38,0.35)]"
                    : "text-white/55 hover:bg-white/10 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-8 text-center">
            <h3 className="text-xl font-semibold text-white">
              {activeTab.title}
            </h3>
            <p className="mt-2 text-sm text-white/45">{activeTab.subtitle}</p>
          </div>
          <div
            className="flex gap-6 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory hide-scrollbar sm:flex-wrap sm:overflow-visible sm:pb-0 sm:mx-0 sm:px-0 sm:justify-center"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {activePlans.map((plan, index) => (
              <div
                key={index}
                className="plan-card-wrapper min-w-[85vw] max-w-[90vw] snap-center sm:min-w-0 sm:max-w-none sm:w-64 lg:w-[270px]"
                style={{ flex: "0 0 auto" }}
              >
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
                    {(plan.features as string[]).map(
                      (feature: string, idx: number) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-white/70 text-sm"
                        >
                          <Check className="w-4 h-4 text-red-500" />
                          {feature}
                        </li>
                      ),
                    )}
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
