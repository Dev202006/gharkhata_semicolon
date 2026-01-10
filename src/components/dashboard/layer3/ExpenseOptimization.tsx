import { motion } from "framer-motion";
import { Scissors, TrendingDown, Repeat, Coffee, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Suggestion {
  id: string;
  title: string;
  description: string;
  potentialSaving: number;
  type: "high-frequency" | "over-budget" | "duplicate";
  icon: React.ComponentType<{ className?: string }>;
}

const suggestions: Suggestion[] = [
  {
    id: "1",
    title: "Daily coffee purchases",
    description: "₹150/day average on coffee shops",
    potentialSaving: 3500,
    type: "high-frequency",
    icon: Coffee,
  },
  {
    id: "2",
    title: "Entertainment exceeds norm",
    description: "65% above recommended for your income",
    potentialSaving: 3200,
    type: "over-budget",
    icon: TrendingDown,
  },
  {
    id: "3",
    title: "Duplicate streaming services",
    description: "Netflix, Prime, Hotstar - consider consolidating",
    potentialSaving: 500,
    type: "duplicate",
    icon: Repeat,
  },
];

const typeConfig = {
  "high-frequency": { bg: "bg-warning/10", text: "text-warning", label: "High Frequency" },
  "over-budget": { bg: "bg-destructive/10", text: "text-destructive", label: "Over Budget" },
  "duplicate": { bg: "bg-secondary/10", text: "text-secondary", label: "Duplicate" },
};

export const ExpenseOptimization = () => {
  const totalPotentialSaving = suggestions.reduce((sum, s) => sum + s.potentialSaving, 0);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="bg-card rounded-xl p-6 shadow-card"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Scissors className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Expense Optimization</h3>
        </div>
        <span className="text-sm text-success font-medium">
          Up to ₹{totalPotentialSaving.toLocaleString()}/mo savings
        </span>
      </div>

      <div className="space-y-3">
        {suggestions.map((suggestion, index) => {
          const Icon = suggestion.icon;
          const config = typeConfig[suggestion.type];

          return (
            <motion.div
              key={suggestion.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary/30 transition-colors"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${config.bg}`}>
                <Icon className={`w-5 h-5 ${config.text}`} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-foreground">{suggestion.title}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${config.bg} ${config.text}`}>
                    {config.label}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{suggestion.description}</p>
              </div>

              <div className="text-right">
                <p className="text-sm font-semibold text-success tabular-nums">
                  +₹{suggestion.potentialSaving.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">/month</p>
              </div>

              <Button variant="ghost" size="icon" className="shrink-0">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};
