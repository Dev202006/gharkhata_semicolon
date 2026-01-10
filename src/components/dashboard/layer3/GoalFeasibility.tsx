import { useState } from "react";
import { motion } from "framer-motion";
import { Target, TrendingUp, TrendingDown, Clock, DollarSign } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface Goal {
  id: string;
  name: string;
  target: number;
  current: number;
  monthlyRequired: number;
  currentMonthly: number;
  deadline: string;
}

const goals: Goal[] = [
  { id: "1", name: "Emergency Fund", target: 600000, current: 320000, monthlyRequired: 25000, currentMonthly: 18000, deadline: "Dec 2026" },
  { id: "2", name: "Child Education", target: 1200000, current: 480000, monthlyRequired: 30000, currentMonthly: 28000, deadline: "Mar 2028" },
];

interface WhatIfOption {
  type: "income" | "expense" | "timeline";
  label: string;
  value: number;
  unit: string;
}

export const GoalFeasibility = () => {
  const [selectedGoal, setSelectedGoal] = useState(goals[0]);
  const [timelineExtension, setTimelineExtension] = useState(0);

  const gap = selectedGoal.monthlyRequired - selectedGoal.currentMonthly;
  const incomeIncrease = gap;
  const expenseReduction = gap;
  const adjustedMonthly = selectedGoal.currentMonthly;
  const adjustedRequired = timelineExtension > 0
    ? Math.round((selectedGoal.target - selectedGoal.current) / (Math.ceil((selectedGoal.target - selectedGoal.current) / selectedGoal.monthlyRequired) + timelineExtension))
    : selectedGoal.monthlyRequired;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="bg-card rounded-xl p-6 shadow-card"
    >
      <h3 className="text-lg font-semibold text-foreground mb-4">Goal Feasibility Engine</h3>

      {/* Goal Selector */}
      <div className="flex gap-2 mb-6">
        {goals.map((goal) => (
          <button
            key={goal.id}
            onClick={() => setSelectedGoal(goal)}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              selectedGoal.id === goal.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {goal.name}
          </button>
        ))}
      </div>

      {/* Current Status */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-muted/50">
          <p className="text-xs text-muted-foreground mb-1">Required Monthly</p>
          <p className="text-xl font-semibold text-foreground tabular-nums">
            ₹{adjustedRequired.toLocaleString()}
          </p>
        </div>
        <div className="p-4 rounded-lg bg-muted/50">
          <p className="text-xs text-muted-foreground mb-1">Current Monthly</p>
          <p className="text-xl font-semibold text-foreground tabular-nums">
            ₹{selectedGoal.currentMonthly.toLocaleString()}
          </p>
        </div>
        <div className={`p-4 rounded-lg ${gap > 0 ? "bg-warning/10" : "bg-success/10"}`}>
          <p className="text-xs text-muted-foreground mb-1">Gap</p>
          <p className={`text-xl font-semibold tabular-nums ${gap > 0 ? "text-warning" : "text-success"}`}>
            {gap > 0 ? `-₹${gap.toLocaleString()}` : "On track!"}
          </p>
        </div>
      </div>

      {/* Options */}
      {gap > 0 && (
        <div className="space-y-4">
          <p className="text-sm font-medium text-foreground">Options to close the gap:</p>

          <div className="grid md:grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-4 rounded-lg border border-border hover:border-primary/30 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-success" />
                <span className="text-sm font-medium text-foreground">Increase Income</span>
              </div>
              <p className="text-lg font-semibold text-foreground tabular-nums">
                +₹{incomeIncrease.toLocaleString()}/mo
              </p>
              <p className="text-xs text-muted-foreground mt-1">Additional income needed</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-4 rounded-lg border border-border hover:border-primary/30 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Reduce Expenses</span>
              </div>
              <p className="text-lg font-semibold text-foreground tabular-nums">
                -₹{expenseReduction.toLocaleString()}/mo
              </p>
              <p className="text-xs text-muted-foreground mt-1">Cut from spending</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-4 rounded-lg border border-border hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-secondary" />
                <span className="text-sm font-medium text-foreground">Extend Timeline</span>
              </div>
              <p className="text-lg font-semibold text-foreground tabular-nums">
                +{timelineExtension || "?"} months
              </p>
              <Slider
                value={[timelineExtension]}
                onValueChange={([val]) => setTimelineExtension(val)}
                max={12}
                step={1}
                className="mt-2"
              />
            </motion.div>
          </div>
        </div>
      )}
    </motion.section>
  );
};
