import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Target, Shield, PiggyBank } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface AllocationItem {
  label: string;
  amount: number;
  percentage: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const allocations: AllocationItem[] = [
  { label: "Emergency Fund", amount: 8000, percentage: 35, icon: Shield, color: "hsl(152, 35%, 42%)" },
  { label: "Goals", amount: 10000, percentage: 44, icon: Target, color: "hsl(215, 40%, 35%)" },
  { label: "Long-term", amount: 4600, percentage: 21, icon: PiggyBank, color: "hsl(38, 85%, 55%)" },
];

export const SavingsPerformance = () => {
  const totalSavings = 22600;
  const savingsRate = 24;
  const previousRate = 21;
  const idealBaseline = 20;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="bg-card rounded-xl p-6 shadow-card"
    >
      <h3 className="text-lg font-semibold text-foreground mb-4">Savings Performance</h3>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Main Metrics */}
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Total Savings Achieved</p>
            <p className="text-3xl font-semibold text-foreground tabular-nums">
              ₹{totalSavings.toLocaleString()}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-1">Savings Rate</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-semibold text-foreground">{savingsRate}%</span>
                <span className="flex items-center gap-1 text-sm text-success">
                  <TrendingUp className="w-4 h-4" />
                  +{savingsRate - previousRate}%
                </span>
              </div>
            </div>
          </div>

          {/* Comparison */}
          <div className="space-y-2 pt-4 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">vs Previous Period</span>
              <span className="text-success font-medium">+₹3,200 (+16%)</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">vs Ideal Baseline ({idealBaseline}%)</span>
              <span className="text-success font-medium">+{savingsRate - idealBaseline}% above</span>
            </div>
          </div>
        </div>

        {/* Allocation Breakdown */}
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Allocation Breakdown</p>
          {allocations.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div style={{ color: item.color }}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm text-foreground">{item.label}</span>
                  </div>
                  <span className="text-sm font-medium text-foreground tabular-nums">
                    ₹{item.amount.toLocaleString()} ({item.percentage}%)
                  </span>
                </div>
                <Progress value={item.percentage} className="h-2" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};
