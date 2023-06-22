import DashboardInfoCard from "./DashboardInfoCard";
import { useDashboardContext } from "@/contexts/dashboard_context";
import { DashboardInfo as DashboardInfoContainer } from "./styles";

function DashboardInfo() {
  const { metaData } = useDashboardContext();
  return (
    <DashboardInfoContainer>
      <DashboardInfoCard
        total={metaData.totalBooks}
        name="Total Books"
        background="#00C0EF"
        route="/manage-books"
      />
      <DashboardInfoCard
        total={metaData.totalStudents}
        name="Total Students"
        background="#04A559"
        route="/students"
      />
      <DashboardInfoCard
        total={metaData.totalBorrowed}
        name="Total Borrowed"
        background="#F39C12"
        route="/issued"
      />
      <DashboardInfoCard
        total={metaData.totalExpired}
        name="Total Expired"
        background="#DD4B39"
        route="/expired"
      />
    </DashboardInfoContainer>
  );
}

export default DashboardInfo;
