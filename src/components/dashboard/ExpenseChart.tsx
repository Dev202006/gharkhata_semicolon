import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const expenseData = [
  { name: "Housing", value: 35, color: "hsl(152, 35%, 42%)" },
  { name: "Food", value: 20, color: "hsl(215, 40%, 35%)" },
  { name: "Transport", value: 15, color: "hsl(175, 35%, 45%)" },
  { name: "Entertainment", value: 12, color: "hsl(38, 85%, 55%)" },
  { name: "Shopping", value: 10, color: "hsl(280, 35%, 50%)" },
  { name: "Others", value: 8, color: "hsl(220, 10%, 60%)" },
];

export const ExpenseChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="bg-card rounded-xl p-6 shadow-card"
    >
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Expense Breakdown
      </h3>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={expenseData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {expenseData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(0, 0%, 100%)",
                border: "1px solid hsl(150, 15%, 90%)",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px hsl(220, 15%, 20%, 0.1)",
              }}
              formatter={(value: number) => [`${value}%`, ""]}
            />
            <Legend
              layout="horizontal"
              align="center"
              verticalAlign="bottom"
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span className="text-sm text-muted-foreground">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};