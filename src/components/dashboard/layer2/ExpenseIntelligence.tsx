import { motion } from "framer-motion";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const categoryData = [
  { name: "Food", planned: 18000, actual: 21500, color: "hsl(152, 35%, 42%)" },
  { name: "Transport", planned: 8000, actual: 7200, color: "hsl(215, 40%, 35%)" },
  { name: "Utilities", planned: 6000, actual: 5800, color: "hsl(200, 35%, 45%)" },
  { name: "Shopping", planned: 12000, actual: 16500, color: "hsl(38, 85%, 55%)" },
  { name: "Entertainment", planned: 5000, actual: 8200, color: "hsl(280, 35%, 50%)" },
  { name: "Healthcare", planned: 4000, actual: 3500, color: "hsl(340, 45%, 55%)" },
];

const memberData = [
  { name: "Rahul", spending: 32000, percentage: 41, change: "+5%", color: "hsl(152, 35%, 42%)" },
  { name: "Priya", spending: 28500, percentage: 36, change: "-2%", color: "hsl(215, 40%, 35%)" },
  { name: "Kids", spending: 18000, percentage: 23, change: "+8%", color: "hsl(38, 85%, 55%)" },
];

export const ExpenseIntelligence = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-card rounded-xl p-6 shadow-card"
    >
      <h3 className="text-lg font-semibold text-foreground mb-4">Expense Intelligence</h3>

      <Tabs defaultValue="category" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="category">By Category</TabsTrigger>
          <TabsTrigger value="member">By Member</TabsTrigger>
        </TabsList>

        <TabsContent value="category">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical" barGap={4}>
                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 12 }}
                  tickFormatter={(value) => `₹${value / 1000}k`}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 12 }}
                  width={80}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0, 0%, 100%)",
                    border: "1px solid hsl(150, 15%, 90%)",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px hsl(220, 15%, 20%, 0.1)",
                  }}
                  formatter={(value: number, name: string) => [
                    `₹${value.toLocaleString()}`,
                    name === "planned" ? "Planned" : "Actual",
                  ]}
                />
                <Bar dataKey="planned" fill="hsl(150, 15%, 85%)" radius={[0, 4, 4, 0]} name="planned" />
                <Bar dataKey="actual" radius={[0, 4, 4, 0]} name="actual">
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.actual > entry.planned ? "hsl(38, 85%, 55%)" : entry.color}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Savings Summary */}
          <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
            {categoryData.slice(0, 3).map((cat) => {
              const saved = cat.planned - cat.actual;
              return (
                <div key={cat.name} className="text-center">
                  <p className="text-xs text-muted-foreground">{cat.name}</p>
                  <p className={`text-sm font-semibold ${saved >= 0 ? "text-success" : "text-warning"}`}>
                    {saved >= 0 ? `+₹${saved.toLocaleString()} saved` : `-₹${Math.abs(saved).toLocaleString()} over`}
                  </p>
                </div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="member">
          <div className="space-y-4">
            {memberData.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-24 text-sm font-medium text-foreground">{member.name}</div>
                <div className="flex-1 h-8 bg-muted rounded-lg overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${member.percentage}%` }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    className="h-full rounded-lg"
                    style={{ backgroundColor: member.color }}
                  />
                </div>
                <div className="w-24 text-right">
                  <p className="text-sm font-semibold text-foreground tabular-nums">
                    ₹{(member.spending / 1000).toFixed(0)}k
                  </p>
                  <p className="text-xs text-muted-foreground">{member.percentage}%</p>
                </div>
                <div className={`w-12 text-xs text-right ${member.change.startsWith("+") ? "text-warning" : "text-success"}`}>
                  {member.change}
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4 pt-4 border-t border-border">
            Change shown vs previous period. Neutral tone — for awareness, not judgment.
          </p>
        </TabsContent>
      </Tabs>
    </motion.section>
  );
};
