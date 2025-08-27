import { TrendingUp, Users, Clock, Target } from "lucide-react"

export function StatsCards() {
  const stats = [
    {
      icon: TrendingUp,
      value: "1.8s",
      label: "avg",
      description: "Processing Speed",
      detail: "Average analysis time",
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-500/10",
    },
    {
      icon: Users,
      value: "2,847",
      label: "",
      description: "Active Users",
      detail: "Monthly active users",
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: Clock,
      value: "99.9%",
      label: "",
      description: "Uptime",
      detail: "Service availability",
      color: "from-purple-500 to-violet-600",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: Target,
      value: "98.5%",
      label: "",
      description: "Accuracy",
      detail: "Detection accuracy",
      color: "from-orange-500 to-red-600",
      bgColor: "bg-orange-500/10",
    },
  ]

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div
            key={index}
            className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/50 hover:border-slate-600/50 transition-all duration-300"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex items-baseline space-x-1">
                <span className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </span>
                {stat.label && (
                  <span className={`text-lg font-medium bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.label}
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-white font-semibold">{stat.description}</h3>
              <p className="text-slate-400 text-sm">{stat.detail}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
