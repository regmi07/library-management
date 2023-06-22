import { getDashboardCardDetails } from "@/adapters/dashboard.adapter/dashboard";
import { createContext, useContext, useEffect, useState } from "react";

const DashboardContext = createContext<any>({});
const { Provider, Consumer } = DashboardContext;

const DashboardProvider = ({ children, ...props }: any) => {
  const [metaData, setMetaData] = useState<any>({});

  useEffect(() => {
    getDashboardCardDetails().then((data) => {
      setMetaData(data?.data);
    });
  }, []);

  return (
    <Provider value={{ metaData }} {...props}>
      {children}
    </Provider>
  );
};

const useDashboardContext = () => {
  const state = useContext(DashboardContext);
  if (state === undefined) {
    throw new Error(
      `Dashboard context must be called within DashboardProvider`
    );
  }

  return { ...state };
};

export {
  DashboardProvider,
  Consumer as DashboardConsumer,
  useDashboardContext,
};
