import { getStudents } from "@/adapters/student.adapter/student";
import React from "react";
import { InputContainer, Label } from "./styles";
import SelectComponent from "../../SelectComponents/SelectComponent";
import { useIssueBookContext } from "@/contexts/issue-books_context";

function StudentSelectComponent() {
  const {
    issue: { student },
    setStudent,
  } = useIssueBookContext();
  const [students, setStudents] = React.useState(null);

  React.useEffect(() => {
    getStudents({ limit: 5 }).then((students) => {
      setStudents(students.data.data);
    });
  }, []);

  // React.useEffect(() => {
  //   console.log("this run");
  //   if (studentId && !selectedValue) {
  //     console.log("this ran");
  //     const val = students?.filter((each: any) => each.collegeId === studentId);
  //     setSelectedValue(val[0]);
  //   }
  // }, [studentId]);

  return (
    <>
      <InputContainer>
        <Label>Student Id</Label>
        <SelectComponent
          idKey="id"
          labelKey="collegeId"
          selectFor="students"
          data={students}
          setValue={setStudent}
          selectedValue={student}
        />
      </InputContainer>
      <InputContainer>
        <Label>Student Name</Label>
        <SelectComponent
          idKey="id"
          labelKey="name"
          selectFor="students"
          data={students}
          setValue={setStudent}
          selectedValue={student}
        />
      </InputContainer>
    </>
  );
}

export default StudentSelectComponent;
