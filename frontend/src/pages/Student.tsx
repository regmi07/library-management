import StudentInfo from "@/components/student/StudentInfo";
import StudentIssueInfo from "@/components/student/StudentIssueInfo";
import { useParams } from "react-router-dom";

function Student() {
  const { id } = useParams();
  return (
    <>
      <StudentInfo collegeId={id} />
      <StudentIssueInfo collegeId={id} />
    </>
  );
}

export default Student;
