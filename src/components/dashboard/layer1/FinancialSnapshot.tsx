import { motion } from "framer-motion";
import { Wallet, TrendingUp, Calculator, Clock } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string;
  subLabel?: string;
  icon: React.ReactNode;
  delay: number;
}

const MetricCard = ({ label, value, subLabel, icon, delay }: MetricCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="flex-1 min-w-[200px]"
  >
    <div className="flex items-center gap-3 mb-2">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
    <p className="text-3xl font-semibold text-foreground tabular-nums">{value}</p>
    {subLabel && (
      <p className="text-sm text-muted-foreground mt-1">{subLabel}</p>
    )}
  </motion.div>
);

export const FinancialSnapshot = () => {
  const metrics = [
    {
      label: "Total Liquifiable Cash",
      value: "₹4,85,200",
      subLabel: "Bank + Cash + Short-term funds",
      icon: <Wallet className="w-5 h-5" />,
    },
    {
      label: "Total Net Worth",
      value: "₹28,50,000",
      subLabel: "Assets − Liabilities",
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      label: "Monthly Burn Rate",
      value: "₹72,400",
      subLabel: "Average monthly outflow",
      icon: <Calculator className="w-5 h-5" />,
    },
    {
      label: "Runway",
      value: "6.7 months",
      subLabel: "Family can sustain without income",
      icon: <Clock className="w-5 h-5" />,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-card rounded-xl p-6 shadow-card"
    >
      <div className="flex flex-wrap gap-8">
        {metrics.map((metric, index) => (
          <MetricCard
            key={metric.label}
            {...metric}
            delay={index * 0.1}
          />
        ))}
      </div>
    </motion.section>
  );
};
