import { getStudentById } from "@/adapters/student.adapter/student";
import React, { useEffect, useState } from "react";
import { NameHeader, StudentInfoContainer, StudentInfoP } from "./styles";
import { PhoneIcon, EmailIcon } from "../Icons";

function StudentInfo({ collegeId }: any) {
  const [studentInfo, setStudentInfo] = useState<any>(null);
  useEffect(() => {
    getStudentById(collegeId).then((response) => setStudentInfo(response.data));
  }, []);
  return (
    <StudentInfoContainer>
      <NameHeader>{studentInfo?.name}</NameHeader>
      <div>
        <StudentInfoP>
          <EmailIcon />
          <span style={{ marginLeft: ".35em" }}>{studentInfo?.email}</span>
        </StudentInfoP>
        <StudentInfoP>
          <PhoneIcon />
          <span style={{ marginLeft: ".35em" }}>
            {studentInfo?.contactNumber}
          </span>
        </StudentInfoP>
      </div>
    </StudentInfoContainer>
  );
}

export default StudentInfo;
