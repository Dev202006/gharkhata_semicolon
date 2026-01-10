import { motion } from "framer-motion";
import { Calendar, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface TimeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const timeOptions = [
  { value: "monthly", label: "This Month" },
  { value: "last3", label: "Last 3 Months" },
  { value: "last6", label: "Last 6 Months" },
  { value: "yearly", label: "This Year" },
  { value: "custom", label: "Custom Range" },
];

export const TimeSelector = ({ value, onChange }: TimeSelectorProps) => {
  const currentLabel = timeOptions.find((opt) => opt.value === value)?.label || "Select Period";

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm py-4 border-b border-border -mx-6 px-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Time-Based Performance</h2>
          <p className="text-sm text-muted-foreground">How are we doing over time?</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Calendar className="w-4 h-4" />
              {currentLabel}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {timeOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => onChange(option.value)}
                className={value === option.value ? "bg-accent" : ""}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>
  );
};
