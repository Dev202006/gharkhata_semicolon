import { Wallet, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";
import { SnapshotCard } from "@/components/dashboard/SnapshotCard";
import { IncomeExpenseChart } from "@/components/dashboard/IncomeExpenseChart";
import { ExpenseChart } from "@/components/dashboard/ExpenseChart";
import { UpcomingObligations } from "@/components/dashboard/UpcomingObligations";
import { GoalProgress } from "@/components/dashboard/GoalProgress";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Your family's financial overview at a glance
        </p>
      </div>

      {/* Snapshot Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SnapshotCard
          title="Current Balance"
          value="₹2,45,800"
          trend="up"
          trendValue="+12%"
          icon={<Wallet className="w-5 h-5" />}
          delay={0}
        />
        <SnapshotCard
          title="Total Income"
          value="₹95,000"
          trend="up"
          trendValue="+5%"
          icon={<TrendingUp className="w-5 h-5" />}
          delay={0.1}
        />
        <SnapshotCard
          title="Total Expenses"
          value="₹72,400"
          trend="down"
          trendValue="-8%"
          icon={<TrendingDown className="w-5 h-5" />}
          delay={0.15}
        />
        <SnapshotCard
          title="Net Savings"
          value="₹22,600"
          trend="up"
          trendValue="+18%"
          icon={<PiggyBank className="w-5 h-5" />}
          delay={0.2}
        />
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        <IncomeExpenseChart />
        <ExpenseChart />
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        <UpcomingObligations />
        <GoalProgress />
      </div>
    </div>
  );
};

export default Dashboard;