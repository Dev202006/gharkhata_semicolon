import { motion } from "framer-motion";
import { Target, Calendar, TrendingUp, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Goal {
  id: string;
  name: string;
  target: number;
  current: number;
  deadline: string;
  monthlyRequired: number;
  currentMonthly: number;
  color: string;
}

const goals: Goal[] = [
  {
    id: "1",
    name: "Emergency Fund",
    target: 600000,
    current: 320000,
    deadline: "Dec 2026",
    monthlyRequired: 25000,
    currentMonthly: 18000,
    color: "hsl(152, 35%, 42%)",
  },
  {
    id: "2",
    name: "Family Vacation",
    target: 150000,
    current: 95000,
    deadline: "Jun 2026",
    monthlyRequired: 11000,
    currentMonthly: 12000,
    color: "hsl(215, 40%, 35%)",
  },
  {
    id: "3",
    name: "Child Education",
    target: 1200000,
    current: 480000,
    deadline: "Mar 2028",
    monthlyRequired: 30000,
    currentMonthly: 28000,
    color: "hsl(38, 85%, 55%)",
  },
  {
    id: "4",
    name: "Home Renovation",
    target: 300000,
    current: 85000,
    deadline: "Sep 2026",
    monthlyRequired: 27000,
    currentMonthly: 15000,
    color: "hsl(200, 35%, 45%)",
  },
];

export const ActiveGoals = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-card rounded-xl p-6 shadow-card"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Active Goals & Savings</h3>
        <span className="text-sm text-muted-foreground">{goals.length} active goals</span>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {goals.map((goal, index) => {
          const percentage = Math.round((goal.current / goal.target) * 100);
          const isBehind = goal.currentMonthly < goal.monthlyRequired;
          const monthsDelay = isBehind
            ? Math.ceil((goal.target - goal.current) / goal.currentMonthly) -
              Math.ceil((goal.target - goal.current) / goal.monthlyRequired)
            : 0;

          return (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              className="p-4 rounded-lg border border-border hover:border-primary/30 transition-colors cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${goal.color}20` }}
                  >
                    <Target className="w-5 h-5" style={{ color: goal.color }} />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{goal.name}</h4>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>{goal.deadline}</span>
                    </div>
                  </div>
                </div>
                <span className="text-sm font-semibold text-foreground tabular-nums">
                  {percentage}%
                </span>
              </div>

              <Progress
                value={percentage}
                className="h-2 mb-3"
                style={{ "--progress-color": goal.color } as React.CSSProperties}
              />

              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground tabular-nums">
                  ₹{(goal.current / 100000).toFixed(1)}L saved
                </span>
                <span className="text-muted-foreground tabular-nums">
                  ₹{(goal.target / 100000).toFixed(1)}L target
                </span>
              </div>

              {isBehind && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-xs text-warning bg-warning/10 rounded-md px-3 py-2 mt-2"
                >
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>At current pace, goal will complete {monthsDelay} months late.</span>
                </motion.div>
              )}

              {!isBehind && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-xs text-success bg-success/10 rounded-md px-3 py-2 mt-2"
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>On track to complete on time</span>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};
