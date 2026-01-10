import { motion } from "framer-motion";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AssetSegment {
  name: string;
  value: number;
  percentage: number;
  color: string;
  liquidity: "high" | "medium" | "low";
}

const assets: AssetSegment[] = [
  { name: "Cash & Bank", value: 485200, percentage: 17, color: "hsl(152, 35%, 42%)", liquidity: "high" },
  { name: "Gold", value: 320000, percentage: 11, color: "hsl(38, 85%, 55%)", liquidity: "medium" },
  { name: "Investments", value: 890000, percentage: 31, color: "hsl(215, 40%, 35%)", liquidity: "medium" },
  { name: "Property", value: 1100000, percentage: 39, color: "hsl(200, 25%, 50%)", liquidity: "low" },
  { name: "Others", value: 54800, percentage: 2, color: "hsl(220, 10%, 60%)", liquidity: "low" },
];

const liquidityBadge = {
  high: { label: "High", className: "bg-success/10 text-success" },
  medium: { label: "Medium", className: "bg-warning/10 text-warning" },
  low: { label: "Low", className: "bg-muted text-muted-foreground" },
};

export const AssetDistribution = () => {
  const total = assets.reduce((sum, a) => sum + a.value, 0);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="bg-card rounded-xl p-6 shadow-card"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Asset Distribution</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="w-4 h-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Visual breakdown of your total net worth by asset type</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Stacked Bar */}
      <div className="h-8 rounded-lg overflow-hidden flex mb-6">
        {assets.map((asset, index) => (
          <motion.div
            key={asset.name}
            initial={{ width: 0 }}
            animate={{ width: `${asset.percentage}%` }}
            transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            className="relative group cursor-pointer"
            style={{ backgroundColor: asset.color }}
          >
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-colors" />
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {assets.map((asset, index) => (
          <motion.div
            key={asset.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
            className="space-y-1"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: asset.color }}
              />
              <span className="text-sm text-muted-foreground">{asset.name}</span>
            </div>
            <p className="text-lg font-semibold text-foreground tabular-nums">
              ₹{(asset.value / 100000).toFixed(1)}L
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{asset.percentage}%</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${liquidityBadge[asset.liquidity].className}`}>
                {liquidityBadge[asset.liquidity].label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
