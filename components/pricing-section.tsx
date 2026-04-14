import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export function PricingSection() {
  const membershipPlans = [
    { duration: "12 Months", price: "CHF 639" },
    { duration: "12 Months", price: "CHF 639" },
    { duration: "6 Months", price: "CHF 639" },
    { duration: "12 Months", price: "CHF 639" },
  ];

  const shortTermPlans = [
    { duration: "6 Months", price: "CHF 639" },
    { duration: "12 Months", price: "CHF 639" },
    { duration: "6 Months", price: "CHF 639" },
  ];

  const additionalPlans = [
    { duration: "12 Months", price: "CHF 639" },
    { duration: "12 Months", price: "CHF 639" },
  ];

  const features = ["Full gym access", "Modern equipment"];

  return (
    <section id="membership" className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            OUR PLANS & PRICING
          </h2>
          <p className="text-white/60">
            Choose a membership that fits your goals
          </p>
        </div>

        {/* Seperation line  */}
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
            {membershipPlans.map((plan, index) => (
              <div key={index} className="plan-card-wrapper">
                <div
                  className="relative z-10 rounded-[11px] p-6 h-full"
                  style={{ background: "#0300044D" }}
                >
                  <h4
                    className="text-4xl font-normal text-white mb-2"
                    style={{ fontWeight: 400 }}
                  >
                    {plan.duration}
                  </h4>
                  <p
                    className="text-[#A09BAE] text-xl font-normal mb-8"
                    style={{ fontWeight: 400 }}
                  >
                    {plan.price}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-white/70 text-sm"
                      >
                        <Check className="w-4 h-4 text-red-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white btn-gradient">
                    Get Started
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Short Term Passes */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-white text-center mb-8">
            Short - Term Passes
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {shortTermPlans.map((plan, index) => (
              <div key={index} className="plan-card-wrapper">
                <div
                  className="relative z-10 rounded-[11px] p-6 h-full"
                  style={{ background: "#0300044D" }}
                >
                  <h4
                    className="text-4xl font-normal text-white mb-2"
                    style={{ fontWeight: 400 }}
                  >
                    {plan.duration}
                  </h4>
                  <p
                    className="text-[#A09BAE] text-xl font-normal mb-8"
                    style={{ fontWeight: 400 }}
                  >
                    {plan.price}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-white/70 text-sm"
                      >
                        <Check className="w-4 h-4 text-red-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full btn-gradient">Get Started</Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Plans */}
        <div>
          <h3 className="text-xl font-semibold text-white text-center mb-8">
            Additional Plans
          </h3>
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {additionalPlans.map((plan, index) => (
              <div key={index} className="plan-card-wrapper">
                <div
                  className="relative z-10 rounded-[11px] p-6 h-full"
                  style={{ background: "#0300044D" }}
                >
                  <h4
                    className="text-4xl font-normal text-white mb-2"
                    style={{ fontWeight: 400 }}
                  >
                    {plan.duration}
                  </h4>
                  <p
                    className="text-[#A09BAE] text-xl font-normal mb-8"
                    style={{ fontWeight: 400 }}
                  >
                    {plan.price}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-white/70 text-sm"
                      >
                        <Check className="w-4 h-4 text-red-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full btn-gradient">Get Started</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
