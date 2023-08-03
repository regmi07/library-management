import { createContext, useContext, useState } from "react";
import moment from "moment";
import {
  issueNewBook,
  getAllIssuedBooks,
} from "@/adapters/issues.adapter/issues";
import { toast } from "react-toastify";
import { data } from "@/components/dashboard/Charts/LineChart";

const IssueBookContext = createContext<any>({});
const { Provider, Consumer } = IssueBookContext;

const initialIssueState = {
  isbn: "",
  student: {},
  issueDate: moment().format("YYYY-MM-DD"),
  availableCopies: NaN,
};

const IssueBookProvider = ({ children, ...props }: any) => {
  const [issue, setIssue] = useState<any>(initialIssueState);

  const setIsbn = (isbn: string, availableCopies: number) => {
    setIssue({ ...issue, isbn: isbn, availableCopies: availableCopies });
  };

  const setStudent = (student: any) => {
    getAllIssuedBooks({ studentId: student.collegeId, returned: false })
      .then((response) => {
        console.log(response);
        setIssue({
          ...issue,
          student: { ...student, issue: response.data.data },
        });
      })
      .catch((error) => {
        setIssue({ ...issue, student: student });
        console.log(error);
      });
  };

  const setIssueDate = (date: string) => {
    setIssue({ ...issue, issueDate: moment(date).format("YYYY-MM-DD") });
  };

  const issueBook = () => {
    issueNewBook({ studentId: issue?.student?.id, bookId: issue?.isbn })
      .then((response) => {
        setIssue(initialIssueState);
        toast.success("Books Issued successfully");
      })
      .catch((err: any) => {
        if (Array.isArray(err?.response?.data?.message)) {
          toast.error(err?.response?.data?.message[0]);
        } else {
          toast.error(err?.response?.data?.message);
        }
      });
  };

  return (
    <Provider
      value={{ issue, setIsbn, setStudent, setIssueDate, issueBook }}
      {...props}
    >
      {children}
    </Provider>
  );
};

const useIssueBookContext = () => {
  const state = useContext(IssueBookContext);
  if (state === undefined) {
    throw new Error(
      `IssueBook context must be called within IssueBookProvider`
    );
  }
  return { ...state };
};

export {
  IssueBookProvider,
  Consumer as IssueBookConsumer,
  useIssueBookContext,
};
