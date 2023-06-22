import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalStyles } from "./styles/global";
import Sidebar from "./components/sidebar/Sidebar";
import Body from "./body/Body";

function App() {
  return (
    <>
      <GlobalStyles />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ height: "100vh", overflowY: "scroll", width: "100%" }}>
          <Body />
        </div>
      </div>
    </>
  );
}

export default App;
