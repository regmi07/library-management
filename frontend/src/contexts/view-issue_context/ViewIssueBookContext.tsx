import { getAllIssuedBooks } from "@/adapters/issues.adapter/issues";
import { QueryType } from "@/types/query.interface";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import _debounce from "lodash/debounce";

const ViewIssuedBookContext = createContext<any>({});
const { Provider, Consumer } = ViewIssuedBookContext;

const ViewIssuedBookProvider = ({ children, ...props }: any) => {
  const [issuedBook, setIssuedBooks] = useState<any>({
    count: null,
    data: [],
  });

  const [queryParams, setQueryParams] = useState({
    returned: false,
    limit: 10,
    skip: 0,
  });

  useEffect(() => {
    getAllIssuedBooks(queryParams).then((response) => {
      setIssuedBooks({
        data: response.data.data,
        count: response.data.total,
      });
    });
  }, [queryParams.limit, queryParams.skip, queryParams.returned]);

  const updateQueryParams = (queryName: string, value: string | number) => {
    setQueryParams({ ...queryParams, [queryName]: value });
  };

  const removeIssue = (issueId: string) => {
    const afterReturn = issuedBook?.data.filter(
      (issuedBook: any) => issuedBook?.id !== issueId
    );

    setIssuedBooks({ count: afterReturn.length, data: afterReturn });
  };

  const searchDataDebounced = useCallback(
    _debounce((searchData: QueryType) => {
      getAllIssuedBooks({ ...searchData, ...queryParams }).then((response) => {
        console.log(response.data);
        setIssuedBooks({
          data: response.data.data,
          const: response.data.total,
        });
      });
    }, 500),
    [queryParams.limit, queryParams.skip, queryParams.returned]
  );

  return (
    <Provider
      value={{
        issuedBook,
        removeIssue,
        queryParams,
        updateQueryParams,
        searchDataDebounced,
      }}
      {...props}
    >
      {children}
    </Provider>
  );
};

const useViewIssuedBookContext = () => {
  const state = useContext(ViewIssuedBookContext);
  if (state === undefined) {
    throw new Error(
      `View Issued Book Context must be called within ViewIssuedBookProvider`
    );
  }

  return { ...state };
};

export {
  ViewIssuedBookProvider,
  Consumer as ViewIssuedBookConsumer,
  useViewIssuedBookContext,
};
