import { motion } from "framer-motion";
import { Lightbulb, TrendingUp, PiggyBank, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface BudgetRecommendation {
  category: string;
  current: number;
  recommended: number;
  status: "safe" | "warning" | "over";
}

const recommendations: BudgetRecommendation[] = [
  { category: "Essential Living", current: 35000, recommended: 38000, status: "safe" },
  { category: "Lifestyle", current: 22000, recommended: 18000, status: "over" },
  { category: "Savings & Goals", current: 22600, recommended: 23000, status: "safe" },
  { category: "Commitments", current: 35000, recommended: 35000, status: "safe" },
];

export const IdealBudget = () => {
  const income = 95000;
  const maxLifestyle = 18000;
  const idealSavingsPercent = 25;
  const warningCategories = ["Lifestyle", "Entertainment"];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-card rounded-xl p-6 shadow-card"
    >
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-warning" />
        <h3 className="text-lg font-semibold text-foreground">Ideal Budget Suggestion</h3>
      </div>

      <p className="text-sm text-muted-foreground mb-6">
        Based on your income (₹{income.toLocaleString()}), family size, obligations, and goals.
      </p>

      {/* Key Recommendations */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Max Lifestyle</span>
          </div>
          <p className="text-xl font-semibold text-foreground tabular-nums">
            ₹{maxLifestyle.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground mt-1">per month</p>
        </div>

        <div className="p-4 rounded-lg bg-success/10 border border-success/20">
          <div className="flex items-center gap-2 mb-2">
            <PiggyBank className="w-4 h-4 text-success" />
            <span className="text-sm text-muted-foreground">Ideal Savings</span>
          </div>
          <p className="text-xl font-semibold text-foreground tabular-nums">{idealSavingsPercent}%</p>
          <p className="text-xs text-muted-foreground mt-1">₹{Math.round(income * idealSavingsPercent / 100).toLocaleString()}/mo</p>
        </div>

        <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-warning" />
            <span className="text-sm text-muted-foreground">Watch Out</span>
          </div>
          <p className="text-sm font-medium text-foreground">{warningCategories.join(", ")}</p>
          <p className="text-xs text-muted-foreground mt-1">Consider reducing</p>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="space-y-4">
        {recommendations.map((item, index) => {
          const percentage = Math.round((item.current / income) * 100);
          const recPercentage = Math.round((item.recommended / income) * 100);

          return (
            <motion.div
              key={item.category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground">{item.category}</span>
                <div className="flex items-center gap-2">
                  <span className={`tabular-nums ${item.status === "over" ? "text-warning" : "text-foreground"}`}>
                    ₹{item.current.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground">/ ₹{item.recommended.toLocaleString()}</span>
                </div>
              </div>
              <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(percentage, 100)}%` }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className={`absolute h-full rounded-full ${
                    item.status === "over" ? "bg-warning" : "bg-primary"
                  }`}
                />
                <div
                  className="absolute top-0 h-full w-0.5 bg-foreground/30"
                  style={{ left: `${recPercentage}%` }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Warning Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 p-4 rounded-lg bg-warning/10 border border-warning/20"
      >
        <p className="text-sm text-foreground">
          💡 <strong>Lifestyle spending above ₹18,000</strong> may delay your goals. Consider reviewing discretionary expenses.
        </p>
      </motion.div>
    </motion.section>
  );
};
