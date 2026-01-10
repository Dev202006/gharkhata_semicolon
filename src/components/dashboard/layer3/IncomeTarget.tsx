import { motion } from "framer-motion";
import { Calculator, Target, Shield, Coffee, TrendingUp } from "lucide-react";

interface IncomeBreakdown {
  label: string;
  amount: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const breakdown: IncomeBreakdown[] = [
  { label: "Fixed Obligations", amount: 35000, icon: Shield, color: "hsl(215, 40%, 35%)" },
  { label: "Essential Living", amount: 35000, icon: Coffee, color: "hsl(152, 35%, 42%)" },
  { label: "Goal Contributions", amount: 30000, icon: Target, color: "hsl(38, 85%, 55%)" },
  { label: "Comfortable Buffer", amount: 10000, icon: TrendingUp, color: "hsl(200, 35%, 45%)" },
];

export const IncomeTarget = () => {
  const currentIncome = 95000;
  const requiredIncome = 110000;
  const gap = requiredIncome - currentIncome;
  const total = breakdown.reduce((sum, item) => sum + item.amount, 0);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="bg-card rounded-xl p-6 shadow-card"
    >
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Income Target Calculator</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Current vs Required */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
            <div>
              <p className="text-sm text-muted-foreground">Current Income</p>
              <p className="text-2xl font-semibold text-foreground tabular-nums">
                ₹{currentIncome.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Required Income</p>
              <p className="text-2xl font-semibold text-primary tabular-nums">
                ₹{requiredIncome.toLocaleString()}
              </p>
            </div>
          </div>

          {gap > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="p-4 rounded-lg bg-warning/10 border border-warning/20"
            >
              <p className="text-sm text-foreground">
                To meet all goals on time with comfortable buffer, consider increasing income by{" "}
                <strong className="text-warning">₹{gap.toLocaleString()}/month</strong>
              </p>
            </motion.div>
          )}

          <p className="text-xs text-muted-foreground">
            This calculation considers all your obligations, goals, and a recommended 10% buffer for unexpected expenses.
          </p>
        </div>

        {/* Breakdown */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground mb-3">Required Income Breakdown</p>
          {breakdown.map((item, index) => {
            const Icon = item.icon;
            const percentage = Math.round((item.amount / total) * 100);

            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-3"
              >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${item.color}20` }}
              >
                <div style={{ color: item.color }}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{item.label}</span>
                    <span className="text-sm font-medium text-foreground tabular-nums">
                      ₹{item.amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full mt-1 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};
