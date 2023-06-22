import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import _debounce from "lodash/debounce";
import { QueryType } from "@/types/query.interface";
import { deleteStudent, getStudents } from "@/adapters/student.adapter/student";
import { toast } from "react-toastify";

const ViewStudentContext = createContext<any>({});
const { Provider, Consumer } = ViewStudentContext;

const ViewStudentProvider = ({ children, ...props }: any) => {
  const [students, setStudents] = useState<any>({
    count: null,
    data: [],
  });

  const [queryParams, setQueryParams] = useState({
    limit: 20,
    skip: 0,
  });

  useEffect(() => {
    getStudents(queryParams).then((response) => {
      setStudents({
        data: response.data.data,
        count: response.data.total,
      });
    });
  }, [queryParams.limit, queryParams.skip]);

  const updateQueryParams = (queryName: string, value: string | number) => {
    setQueryParams({ ...queryParams, [queryName]: value });
  };

  const removeStudent = (studentUUID: string) => {
    deleteStudent(studentUUID)
      .then((response) => {
        if (response.status === 200)
          toast.success("Student have been deleted successfully!");
      })
      .catch((error) => {
        toast.error(error.response.data?.message);
      });
  };

  const searchStudentDebounced = useCallback(
    _debounce((searchData: QueryType) => {
      getStudents({ ...searchData, ...queryParams }).then((response) => {
        setStudents({
          data: response.data.data,
          count: response.data.total,
        });
      });
    }, 500),
    [queryParams.limit, queryParams.skip]
  );

  return (
    <Provider
      value={{
        students,
        searchStudentDebounced,
        queryParams,
        updateQueryParams,
        removeStudent,
      }}
      {...props}
    >
      {children}
    </Provider>
  );
};

const useStudentContext = () => {
  const state = useContext(ViewStudentContext);
  if (state === undefined) {
    throw new Error(`Book Context must be called within BookProvider`);
  }

  return { ...state };
};

export {
  ViewStudentProvider,
  Consumer as ViewStudentConsumer,
  useStudentContext,
};
