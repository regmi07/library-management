import DashboardInfo from "@/components/dashboard/DashboardInfo";
import { DashboardProvider } from "@/contexts/dashboard_context";

function Dashboard() {
  return (
    <DashboardProvider>
      <div>
        <h1>This is an Dashboard</h1>
        <DashboardInfo />
      </div>
    </DashboardProvider>
  );
}

export default Dashboard;
