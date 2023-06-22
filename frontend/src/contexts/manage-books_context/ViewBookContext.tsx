import { getBooks, deleteBook } from "@/adapters/books.adapter/books";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import _debounce from "lodash/debounce";
import { QueryType } from "@/types/query.interface";
import { toast } from "react-toastify";

const ViewBookContext = createContext<any>({});
const { Provider, Consumer } = ViewBookContext;

const ViewBookProvider = ({ children, ...props }: any) => {
  const [books, setBooks] = useState<any>({
    count: null,
    data: [],
  });

  const [queryParams, setQueryParams] = useState({
    limit: 10,
    skip: 0,
  });

  useEffect(() => {
    getBooks(queryParams).then((response) => {
      setBooks({
        data: response.data.data,
        count: response.data.total,
      });
    });
  }, [queryParams.limit, queryParams.skip]);

  const updateQueryParams = (queryName: string, value: string | number) => {
    setQueryParams({ ...queryParams, [queryName]: value });
  };

  const removeBook = (isbn: string) => {
    console.log("remove book clicked");
    deleteBook(isbn)
      .then((response) => {
        // if(response.status === )
        console.log(response);
        toast.success("Book deleted successfully");
      })
      .catch((error) => {
        toast.error(error.data.response?.message);
      });
  };

  const searchBookDebounced = useCallback(
    _debounce((searchData: QueryType) => {
      getBooks({ ...searchData, ...queryParams }).then((response) => {
        setBooks({
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
        books,
        searchBookDebounced,
        queryParams,
        updateQueryParams,
        removeBook,
      }}
      {...props}
    >
      {children}
    </Provider>
  );
};

const useBooksContext = () => {
  const state = useContext(ViewBookContext);
  if (state === undefined) {
    throw new Error(`Book Context must be called within BookProvider`);
  }

  return { ...state };
};

export { ViewBookProvider, Consumer as ViewBookConsumer, useBooksContext };
