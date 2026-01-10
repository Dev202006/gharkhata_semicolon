import { motion } from "framer-motion";
import { Shield, AlertTriangle, PiggyBank, CreditCard, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface Indicator {
  id: string;
  label: string;
  value: string;
  recommended: string;
  status: "good" | "warning" | "caution";
  icon: React.ComponentType<{ className?: string }>;
  tooltip: string;
}

const indicators: Indicator[] = [
  {
    id: "emergency",
    label: "Emergency Fund",
    value: "3.2 months",
    recommended: "6 months",
    status: "warning",
    icon: Shield,
    tooltip: "Months of expenses covered by liquid savings",
  },
  {
    id: "debt",
    label: "Debt Load Ratio",
    value: "28%",
    recommended: "< 35%",
    status: "good",
    icon: CreditCard,
    tooltip: "Percentage of income going toward debt payments",
  },
  {
    id: "savings",
    label: "Savings Rate",
    value: "24%",
    recommended: "> 20%",
    status: "good",
    icon: PiggyBank,
    tooltip: "Percentage of income saved each month",
  },
];

const statusConfig = {
  good: {
    bg: "bg-success/10",
    text: "text-success",
    border: "border-success/20",
  },
  warning: {
    bg: "bg-warning/10",
    text: "text-warning",
    border: "border-warning/20",
  },
  caution: {
    bg: "bg-destructive/10",
    text: "text-destructive",
    border: "border-destructive/20",
  },
};

export const StabilityIndicators = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="bg-card rounded-xl p-6 shadow-card"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Financial Stability</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="w-4 h-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Key indicators of your family's financial health</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex flex-wrap gap-4">
        {indicators.map((indicator, index) => {
          const config = statusConfig[indicator.status];
          const Icon = indicator.icon;

          return (
            <motion.div
              key={indicator.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg border",
                config.bg,
                config.border
              )}
            >
              <Icon className={cn("w-5 h-5", config.text)} />
              <div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="text-left">
                      <p className="text-sm font-medium text-foreground">
                        {indicator.label}: <span className="font-semibold">{indicator.value}</span>
                      </p>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{indicator.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <p className="text-xs text-muted-foreground">
                  Recommended: {indicator.recommended}
                </p>
              </div>
              {indicator.status === "warning" && (
                <AlertTriangle className="w-4 h-4 text-warning ml-2" />
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};
