import { getStats } from "@/lib/content";

export async function StatsSection() {
  const stats = await getStats();

  const display =
    stats.length > 0
      ? stats
      : [
          { id: 0, value: "+ 1500", label: "TRAINERS", order: 0 },
          { id: 1, value: "+ 1000", label: "WORKOUT VIDEOS", order: 1 },
          { id: 2, value: "+ 1300", label: "POSITIVE REVIEWS", order: 2 },
          { id: 3, value: "+ 80", label: "COACHES", order: 3 },
        ];

  return (
    <section className="relative py-8 bg-gradient-to-r from-red-900/80 via-red-800/60 to-red-900/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {display.map((stat) => (
            <div key={stat.id} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-white/80 tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
