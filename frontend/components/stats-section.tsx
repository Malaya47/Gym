export function StatsSection() {
  const stats = [
    { value: "+ 1500", label: "TRAINERS" },
    { value: "+ 1000", label: "WORKOUT VIDEOS" },
    { value: "+ 1300", label: "POSITIVE REVIEWS" },
    { value: "+ 80", label: "COACHES" },
  ]

  return (
    <section className="relative py-8 bg-gradient-to-r from-red-900/80 via-red-800/60 to-red-900/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
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
  )
}
