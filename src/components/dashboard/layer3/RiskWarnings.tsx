import { motion } from "framer-motion";
import { Shield, TrendingDown, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface Warning {
  id: string;
  title: string;
  description: string;
  severity: "low" | "medium" | "high";
  icon: React.ComponentType<{ className?: string }>;
}

const warnings: Warning[] = [
  {
    id: "1",
    title: "Emergency fund below threshold",
    description: "Consider strengthening your emergency reserves to cover 6 months of expenses.",
    severity: "medium",
    icon: Shield,
  },
  {
    id: "2",
    title: "Savings rate declining trend",
    description: "Your savings rate has decreased 3% over the last 3 months. Review recent spending patterns.",
    severity: "low",
    icon: TrendingDown,
  },
];

const severityConfig = {
  low: {
    bg: "bg-muted",
    border: "border-border",
    icon: "text-muted-foreground",
    title: "text-foreground",
  },
  medium: {
    bg: "bg-warning/10",
    border: "border-warning/20",
    icon: "text-warning",
    title: "text-foreground",
  },
  high: {
    bg: "bg-destructive/10",
    border: "border-destructive/20",
    icon: "text-destructive",
    title: "text-foreground",
  },
};

export const RiskWarnings = () => {
  if (warnings.length === 0) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="bg-success/10 rounded-xl p-6 border border-success/20"
      >
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-success" />
          <div>
            <h3 className="text-lg font-semibold text-foreground">All Clear!</h3>
            <p className="text-sm text-muted-foreground">No financial stability concerns detected.</p>
          </div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="bg-card rounded-xl p-6 shadow-card"
    >
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-5 h-5 text-warning" />
        <h3 className="text-lg font-semibold text-foreground">Stability Considerations</h3>
      </div>

      <div className="space-y-3">
        {warnings.map((warning, index) => {
          const Icon = warning.icon;
          const config = severityConfig[warning.severity];

          return (
            <motion.div
              key={warning.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className={cn(
                "flex items-start gap-3 p-4 rounded-lg border",
                config.bg,
                config.border
              )}
            >
              <Icon className={cn("w-5 h-5 mt-0.5 shrink-0", config.icon)} />
              <div>
                <p className={cn("text-sm font-medium", config.title)}>{warning.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{warning.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
        <Info className="w-4 h-4 text-muted-foreground" />
        <p className="text-xs text-muted-foreground">
          These are gentle observations to help you stay on track. No immediate action required.
        </p>
      </div>
    </motion.section>
  );
};
