import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts";
import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react";

const weeklyData = [
  { week: "Week 1", budgeted: 18000, actual: 16500 },
  { week: "Week 2", budgeted: 36000, actual: 34000 },
  { week: "Week 3", budgeted: 54000, actual: 62000 },
  { week: "Week 4", budgeted: 72000, actual: 78500 },
];

interface MetricBoxProps {
  label: string;
  planned: string;
  actual: string;
  isPositive?: boolean;
}

const MetricBox = ({ label, planned, actual, isPositive }: MetricBoxProps) => (
  <div className="text-center p-4 rounded-lg bg-muted/50">
    <p className="text-xs text-muted-foreground mb-1">{label}</p>
    <p className="text-lg font-semibold text-foreground tabular-nums">{actual}</p>
    <p className="text-xs text-muted-foreground">
      Planned: <span className="tabular-nums">{planned}</span>
    </p>
  </div>
);

export const BudgetVsReality = () => {
  const plannedIncome = 95000;
  const actualIncome = 98500;
  const plannedExpense = 72000;
  const actualExpense = 78500;
  const netDifference = (actualIncome - actualExpense) - (plannedIncome - plannedExpense);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="bg-card rounded-xl p-6 shadow-card"
    >
      <h3 className="text-lg font-semibold text-foreground mb-4">Budget vs Reality</h3>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        <MetricBox label="Planned Income" planned="₹95,000" actual="₹98,500" />
        <MetricBox label="Actual Income" planned="₹95,000" actual="₹98,500" isPositive />
        <MetricBox label="Planned Expense" planned="₹72,000" actual="₹72,000" />
        <MetricBox label="Actual Expense" planned="₹72,000" actual="₹78,500" />
        <div className="text-center p-4 rounded-lg bg-warning/10 border border-warning/20">
          <p className="text-xs text-warning mb-1">Net Difference</p>
          <p className="text-lg font-semibold text-warning tabular-nums flex items-center justify-center gap-1">
            <TrendingDown className="w-4 h-4" />
            -₹3,000
          </p>
          <p className="text-xs text-muted-foreground">vs plan</p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[280px] mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(150, 15%, 90%)" vertical={false} />
            <XAxis
              dataKey="week"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 12 }}
              tickFormatter={(value) => `₹${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(0, 0%, 100%)",
                border: "1px solid hsl(150, 15%, 90%)",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px hsl(220, 15%, 20%, 0.1)",
              }}
              formatter={(value: number) => [`₹${value.toLocaleString()}`, ""]}
            />
            <Legend
              iconType="line"
              formatter={(value) => (
                <span className="text-sm text-muted-foreground capitalize">{value}</span>
              )}
            />
            <Line
              type="monotone"
              dataKey="budgeted"
              stroke="hsl(152, 35%, 42%)"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              name="Budgeted"
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="hsl(215, 40%, 35%)"
              strokeWidth={2}
              dot={{ fill: "hsl(215, 40%, 35%)", r: 4 }}
              name="Actual"
            />
            <ReferenceLine
              x="Week 3"
              stroke="hsl(38, 85%, 55%)"
              strokeDasharray="3 3"
              label={{ value: "↑", position: "top", fill: "hsl(38, 85%, 55%)" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Insight */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg px-4 py-3"
      >
        <AlertCircle className="w-4 h-4 text-warning" />
        <span>Overspend started in Week 3. Consider reviewing discretionary expenses.</span>
      </motion.div>
    </motion.section>
  );
};
