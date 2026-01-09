import { motion } from "framer-motion";
import { CreditCard, Home, Repeat, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";

const obligations = [
  {
    id: 1,
    title: "Home Loan EMI",
    amount: "₹42,500",
    dueDate: "5th Jan",
    type: "emi",
    icon: Home,
  },
  {
    id: 2,
    title: "Credit Card Payment",
    amount: "₹18,200",
    dueDate: "10th Jan",
    type: "credit",
    icon: CreditCard,
  },
  {
    id: 3,
    title: "Netflix Subscription",
    amount: "₹649",
    dueDate: "15th Jan",
    type: "subscription",
    icon: Repeat,
  },
  {
    id: 4,
    title: "Insurance Premium",
    amount: "₹5,200",
    dueDate: "20th Jan",
    type: "insurance",
    icon: CalendarDays,
  },
];

export const UpcomingObligations = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="bg-card rounded-xl p-6 shadow-card"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          Upcoming Obligations
        </h3>
        <span className="text-sm text-muted-foreground">This month</span>
      </div>

      <div className="space-y-3">
        {obligations.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group"
          >
            <div className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center",
              item.type === "emi" && "bg-primary/10 text-primary",
              item.type === "credit" && "bg-secondary/10 text-secondary",
              item.type === "subscription" && "bg-accent/10 text-accent",
              item.type === "insurance" && "bg-warning/10 text-warning"
            )}>
              <item.icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {item.title}
              </p>
              <p className="text-xs text-muted-foreground">{item.dueDate}</p>
            </div>
            <p className="text-sm font-semibold text-foreground tabular-nums">
              {item.amount}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};