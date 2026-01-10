import { motion } from "framer-motion";
import { Home, CreditCard, Tv, Shield, AlertTriangle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Commitment {
  id: string;
  name: string;
  type: "emi" | "rent" | "subscription" | "insurance";
  amount: number;
  percentOfIncome: number;
  icon: React.ComponentType<{ className?: string }>;
}

const commitments: Commitment[] = [
  { id: "1", name: "Home Loan EMI", type: "emi", amount: 22000, percentOfIncome: 23, icon: Home },
  { id: "2", name: "Car Loan EMI", type: "emi", amount: 8500, percentOfIncome: 9, icon: CreditCard },
  { id: "3", name: "Netflix + Spotify", type: "subscription", amount: 700, percentOfIncome: 0.7, icon: Tv },
  { id: "4", name: "Health Insurance", type: "insurance", amount: 2500, percentOfIncome: 2.6, icon: Shield },
  { id: "5", name: "Term Insurance", type: "insurance", amount: 1200, percentOfIncome: 1.3, icon: Shield },
];

const getRiskLevel = (percent: number): { level: "safe" | "moderate" | "high"; label: string } => {
  if (percent > 20) return { level: "high", label: "High" };
  if (percent > 10) return { level: "moderate", label: "Moderate" };
  return { level: "safe", label: "Safe" };
};

const riskConfig = {
  safe: { bg: "bg-success/10", text: "text-success", icon: CheckCircle },
  moderate: { bg: "bg-warning/10", text: "text-warning", icon: AlertTriangle },
  high: { bg: "bg-destructive/10", text: "text-destructive", icon: AlertTriangle },
};

export const CommitmentsHealth = () => {
  const totalCommitments = commitments.reduce((sum, c) => sum + c.amount, 0);
  const totalPercent = commitments.reduce((sum, c) => sum + c.percentOfIncome, 0);
  const overallRisk = getRiskLevel(totalPercent);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="bg-card rounded-xl p-6 shadow-card"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Commitments & Obligations</h3>
        <div className={cn("flex items-center gap-1 px-2 py-1 rounded-full text-xs", riskConfig[overallRisk.level].bg, riskConfig[overallRisk.level].text)}>
          {overallRisk.level === "safe" ? (
            <CheckCircle className="w-3 h-3" />
          ) : (
            <AlertTriangle className="w-3 h-3" />
          )}
          <span>{Math.round(totalPercent)}% of income</span>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-muted/50 rounded-lg">
        <div className="text-center">
          <p className="text-2xl font-semibold text-foreground tabular-nums">
            ₹{(totalCommitments / 1000).toFixed(1)}k
          </p>
          <p className="text-xs text-muted-foreground">Total Monthly</p>
        </div>
        <div className="text-center border-x border-border">
          <p className="text-2xl font-semibold text-foreground tabular-nums">{Math.round(totalPercent)}%</p>
          <p className="text-xs text-muted-foreground">of Income</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-semibold text-success tabular-nums">
            {commitments.length}
          </p>
          <p className="text-xs text-muted-foreground">Active Items</p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-muted-foreground border-b border-border">
              <th className="text-left py-2 font-medium">Commitment</th>
              <th className="text-right py-2 font-medium">Amount</th>
              <th className="text-right py-2 font-medium">% Income</th>
              <th className="text-right py-2 font-medium">Risk</th>
            </tr>
          </thead>
          <tbody>
            {commitments.map((item, index) => {
              const risk = getRiskLevel(item.percentOfIncome);
              const Icon = item.icon;
              const RiskIcon = riskConfig[risk.level].icon;

              return (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                  className="border-b border-border/50 last:border-0"
                >
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{item.name}</span>
                    </div>
                  </td>
                  <td className="py-3 text-right text-sm font-medium text-foreground tabular-nums">
                    ₹{item.amount.toLocaleString()}
                  </td>
                  <td className="py-3 text-right text-sm text-muted-foreground tabular-nums">
                    {item.percentOfIncome.toFixed(1)}%
                  </td>
                  <td className="py-3 text-right">
                    <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs", riskConfig[risk.level].bg, riskConfig[risk.level].text)}>
                      <RiskIcon className="w-3 h-3" />
                      {risk.label}
                    </span>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Educational Note */}
      <p className="text-xs text-muted-foreground mt-4 pt-4 border-t border-border">
        💡 Financial experts recommend keeping fixed commitments below 40% of income for healthy cash flow.
      </p>
    </motion.section>
  );
};
