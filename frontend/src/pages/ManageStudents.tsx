import ManageStudentTable from "@/components/manage-students/manage-student-table/ManageStudentTable";
import { ViewStudentProvider } from "@/contexts/manage-users_context/ViewStudentContext";

function ManageStudents() {
  return (
    <ViewStudentProvider>
      <ManageStudentTable />
    </ViewStudentProvider>
  );
}

export default ManageStudents;
