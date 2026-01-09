import { motion } from "framer-motion";
import { Target, Plane, GraduationCap, Car } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const goals = [
  {
    id: 1,
    title: "Emergency Fund",
    target: 500000,
    current: 320000,
    icon: Target,
    color: "bg-primary",
  },
  {
    id: 2,
    title: "Family Vacation",
    target: 150000,
    current: 95000,
    icon: Plane,
    color: "bg-accent",
  },
  {
    id: 3,
    title: "Kids Education",
    target: 1000000,
    current: 450000,
    icon: GraduationCap,
    color: "bg-secondary",
  },
  {
    id: 4,
    title: "New Car",
    target: 800000,
    current: 280000,
    icon: Car,
    color: "bg-warning",
  },
];

export const GoalProgress = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="bg-card rounded-xl p-6 shadow-card"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Goal Progress</h3>
        <span className="text-sm text-muted-foreground">4 active goals</span>
      </div>

      <div className="space-y-4">
        {goals.map((goal, index) => {
          const percentage = Math.round((goal.current / goal.target) * 100);
          return (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
              className="cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <goal.icon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">
                    {goal.title}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground tabular-nums">
                  {percentage}%
                </span>
              </div>
              <Progress value={percentage} className="h-2" />
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-muted-foreground tabular-nums">
                  ₹{(goal.current / 1000).toFixed(0)}k
                </span>
                <span className="text-xs text-muted-foreground tabular-nums">
                  ₹{(goal.target / 1000).toFixed(0)}k
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};