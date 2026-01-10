import { useState } from "react";
import { motion } from "framer-motion";

// Layer 1: Current Financial Position
import { FinancialSnapshot } from "@/components/dashboard/layer1/FinancialSnapshot";
import { AssetDistribution } from "@/components/dashboard/layer1/AssetDistribution";
import { ActiveGoals } from "@/components/dashboard/layer1/ActiveGoals";
import { StabilityIndicators } from "@/components/dashboard/layer1/StabilityIndicators";

// Layer 2: Time-Based Performance
import { TimeSelector } from "@/components/dashboard/layer2/TimeSelector";
import { BudgetVsReality } from "@/components/dashboard/layer2/BudgetVsReality";
import { ExpenseIntelligence } from "@/components/dashboard/layer2/ExpenseIntelligence";
import { SavingsPerformance } from "@/components/dashboard/layer2/SavingsPerformance";
import { CashFlowRhythm } from "@/components/dashboard/layer2/CashFlowRhythm";
import { CommitmentsHealth } from "@/components/dashboard/layer2/CommitmentsHealth";

// Layer 3: Mathematical Recommendations
import { GoalFeasibility } from "@/components/dashboard/layer3/GoalFeasibility";
import { IdealBudget } from "@/components/dashboard/layer3/IdealBudget";
import { IncomeTarget } from "@/components/dashboard/layer3/IncomeTarget";
import { ExpenseOptimization } from "@/components/dashboard/layer3/ExpenseOptimization";
import { RiskWarnings } from "@/components/dashboard/layer3/RiskWarnings";
import { NextActions } from "@/components/dashboard/layer3/NextActions";

const Dashboard = () => {
  const [timePeriod, setTimePeriod] = useState("monthly");

  return (
    <div className="space-y-8 pb-12">
      {/* 🟢 LAYER 1: Current Financial Position */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <div>
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-success" />
            Current Financial Position
          </h2>
          <p className="text-sm text-muted-foreground">Where do we stand right now?</p>
        </div>

        <FinancialSnapshot />
        <AssetDistribution />
        <ActiveGoals />
        <StabilityIndicators />
      </motion.div>

      {/* 🔵 LAYER 2: Time-Based Performance */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-6"
      >
        <TimeSelector value={timePeriod} onChange={setTimePeriod} />
        <BudgetVsReality />
        
        <div className="grid lg:grid-cols-2 gap-6">
          <ExpenseIntelligence />
          <SavingsPerformance />
        </div>
        
        <div className="grid lg:grid-cols-2 gap-6">
          <CashFlowRhythm />
          <CommitmentsHealth />
        </div>
      </motion.div>

      {/* 🟣 LAYER 3: Mathematical Recommendations */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="space-y-6"
      >
        <div className="pt-6 border-t border-border">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-secondary" />
            Recommendations
          </h2>
          <p className="text-sm text-muted-foreground">What should we change?</p>
        </div>

        <GoalFeasibility />
        
        <div className="grid lg:grid-cols-2 gap-6">
          <IdealBudget />
          <IncomeTarget />
        </div>
        
        <div className="grid lg:grid-cols-2 gap-6">
          <ExpenseOptimization />
          <RiskWarnings />
        </div>
        
        <NextActions />
      </motion.div>
    </div>
  );
};

export default Dashboard;
