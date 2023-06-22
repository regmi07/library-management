import { QueryType } from "@/types/query.interface";
import { get, patch, post, remove } from "../xhr";

export const getStudents = ({ limit, skip }: QueryType) => {
  let url = "students?";
  // if (search) url += `search?${search}&`;
  if (limit) url += `limit=${limit}&`;
  if (skip) url += `skip=${skip}&`;

  return get(url);
};

export const addStudent = (studentDetails: any) => {
  return post("students", studentDetails, {
    "Content-Type": "multipart/form-data",
  });
};

export const getStudentById = (collegeId: string) => {
  return get(`students/${collegeId}`);
};

export const updateStudent = (id: string, studentData: any) => {
  return patch(`students/${id}`, studentData);
};

export const deleteStudent = (studentId: string) => {
  return remove(`students/${studentId}`);
};
