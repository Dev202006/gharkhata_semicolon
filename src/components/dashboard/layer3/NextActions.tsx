import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Utensils, Target, Tv } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Action {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  priority: "high" | "medium" | "low";
}

const actions: Action[] = [
  {
    id: "1",
    title: "Review food budget",
    description: "₹3,500 over this month. Set weekly limits.",
    icon: Utensils,
    priority: "high",
  },
  {
    id: "2",
    title: "Increase goal contribution",
    description: "Add ₹2,000 to Emergency Fund this month.",
    icon: Target,
    priority: "medium",
  },
  {
    id: "3",
    title: "Audit subscriptions",
    description: "3 streaming services detected. Consider consolidating.",
    icon: Tv,
    priority: "low",
  },
];

const priorityConfig = {
  high: { dot: "bg-destructive", label: "Priority" },
  medium: { dot: "bg-warning", label: "Suggested" },
  low: { dot: "bg-muted-foreground", label: "Optional" },
};

export const NextActions = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.6 }}
      className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-6 border border-primary/10"
    >
      <div className="flex items-center gap-2 mb-4">
        <CheckCircle className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Next Best Actions</h3>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        Focus on these 3 actions to improve your financial health this month.
      </p>

      <div className="space-y-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          const config = priorityConfig[action.priority];

          return (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border hover:border-primary/30 transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Icon className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-foreground">{action.title}</p>
                  <div className="flex items-center gap-1">
                    <div className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                    <span className="text-xs text-muted-foreground">{config.label}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground truncate">{action.description}</p>
              </div>

              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </motion.div>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground mt-4 text-center">
        Small consistent steps lead to big financial wins. 🌱
      </p>
    </motion.section>
  );
};
