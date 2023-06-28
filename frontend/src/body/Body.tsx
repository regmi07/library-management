import Dashboard from "@/pages/Dashboard";
import IssueBooks from "@/pages/IssueBooks";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { BodyContaier } from "./styles";
import ViewIssuedBooks from "@/pages/ViewIssuedBooks";
import ManageBooks from "@/pages/ManageBooks";
import AddBook from "@/pages/AddBook";
import Settings from "@/pages/Settings";
import AddUserForm from "@/components/add-user/AddUserForm";
import ManageStudents from "@/pages/ManageStudents";
import Student from "@/pages/Student";
import { IconButton } from "@/styles/button";
import { BackIcon } from "@/components/Icons";

function Body() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <BodyContaier>
        <IconButton onClick={handleBack}>
          <BackIcon size={25} />
        </IconButton>
        <Routes location={location} key={location.pathname}>
          <Route index path="/" element={<Dashboard />}></Route>
          <Route path="/issue" element={<IssueBooks />}></Route>
          <Route path="/issued" element={<ViewIssuedBooks />}></Route>
          <Route path="/manage-books" element={<ManageBooks />}></Route>
          <Route path="/add-book" element={<AddBook />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
          <Route path="/add-user" element={<AddUserForm />}></Route>
          <Route path="/manage-user" element={<ManageStudents />}></Route>
          <Route path="/user/:id" element={<Student />}></Route>
          {/* <Route path="/book/:isbn" element={<Book />}></Route> */}
        </Routes>
      </BodyContaier>
    </>
  );
}

export default Body;
