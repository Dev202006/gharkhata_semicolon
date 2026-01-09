import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { month: "Jul", income: 85000, expense: 62000 },
  { month: "Aug", income: 88000, expense: 58000 },
  { month: "Sep", income: 92000, expense: 71000 },
  { month: "Oct", income: 90000, expense: 65000 },
  { month: "Nov", income: 95000, expense: 72000 },
  { month: "Dec", income: 105000, expense: 85000 },
];

export const IncomeExpenseChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-card rounded-xl p-6 shadow-card"
    >
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Income vs Expenses
      </h3>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={4}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(150, 15%, 90%)"
              vertical={false}
            />
            <XAxis
              dataKey="month"
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
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span className="text-sm text-muted-foreground capitalize">
                  {value}
                </span>
              )}
            />
            <Bar
              dataKey="income"
              fill="hsl(152, 35%, 42%)"
              radius={[4, 4, 0, 0]}
              name="Income"
            />
            <Bar
              dataKey="expense"
              fill="hsl(215, 40%, 35%)"
              radius={[4, 4, 0, 0]}
              name="Expense"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};