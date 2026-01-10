import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

// Generate mock calendar data for the month
const generateCalendarData = () => {
  const days = [];
  const daysInMonth = 31;
  
  for (let i = 1; i <= daysInMonth; i++) {
    // Simulate spending patterns - higher after salary (1st), weekends, and mid-month
    let intensity = Math.random() * 0.3;
    
    // Salary days (1st and 15th)
    if (i === 1 || i === 2 || i === 15 || i === 16) {
      intensity = 0.7 + Math.random() * 0.3;
    }
    
    // Weekends (assuming month starts on Monday)
    const dayOfWeek = (i - 1) % 7;
    if (dayOfWeek === 5 || dayOfWeek === 6) {
      intensity = Math.max(intensity, 0.5 + Math.random() * 0.3);
    }
    
    days.push({
      day: i,
      intensity,
      amount: Math.round(intensity * 8000 + 500),
    });
  }
  
  return days;
};

const calendarData = generateCalendarData();

const getIntensityColor = (intensity: number) => {
  if (intensity < 0.2) return "bg-primary/10";
  if (intensity < 0.4) return "bg-primary/25";
  if (intensity < 0.6) return "bg-primary/50";
  if (intensity < 0.8) return "bg-primary/75";
  return "bg-primary";
};

export const CashFlowRhythm = () => {
  const weeks: typeof calendarData[] = [];
  for (let i = 0; i < calendarData.length; i += 7) {
    weeks.push(calendarData.slice(i, i + 7));
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="bg-card rounded-xl p-6 shadow-card"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Cash Flow Rhythm</h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Light</span>
          <div className="flex gap-0.5">
            <div className="w-3 h-3 rounded-sm bg-primary/10" />
            <div className="w-3 h-3 rounded-sm bg-primary/25" />
            <div className="w-3 h-3 rounded-sm bg-primary/50" />
            <div className="w-3 h-3 rounded-sm bg-primary/75" />
            <div className="w-3 h-3 rounded-sm bg-primary" />
          </div>
          <span>Heavy</span>
        </div>
      </div>

      {/* Calendar Heatmap */}
      <div className="space-y-1 mb-4">
        <div className="grid grid-cols-7 gap-1 text-xs text-muted-foreground text-center mb-2">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 gap-1">
            {week.map((day, dayIndex) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + (weekIndex * 7 + dayIndex) * 0.01 }}
                className={`aspect-square rounded-md ${getIntensityColor(day.intensity)} cursor-pointer hover:ring-2 hover:ring-primary/30 transition-all group relative`}
              >
                <span className="text-xs text-foreground/70 absolute inset-0 flex items-center justify-center">
                  {day.day}
                </span>
                {/* Tooltip on hover */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  ₹{day.amount.toLocaleString()}
                </div>
              </motion.div>
            ))}
            {/* Fill empty cells for last week */}
            {week.length < 7 &&
              Array(7 - week.length)
                .fill(null)
                .map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}
          </div>
        ))}
      </div>

      {/* Insight */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg px-4 py-3"
      >
        <AlertCircle className="w-4 h-4 text-primary" />
        <span>Spending spikes after salary credits (1st & 15th). Consider pre-planning major purchases.</span>
      </motion.div>
    </motion.section>
  );
};
