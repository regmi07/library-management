import { updateStudent } from "@/adapters/student.adapter/student";
import { DeleteIcon, EditIcon, ViewIcon } from "@/components/Icons";
import ConfirmationModal from "@/components/Modal/ConfirmationModal/ConfirmationModal";
import FormModal from "@/components/Modal/FormModal/FormModal";
import { useStudentContext } from "@/contexts/manage-users_context/ViewStudentContext";
import { IconButton } from "@/styles/button";
import { CustomTable, TableContainer } from "@/styles/table";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const NOT_EDITABLE_LIST = ["id", "avatar"];

function ManageStudentTable() {
  const {
    students: { data },
    removeStudent,
  } = useStudentContext();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState("");

  const [editData, setEditData] = useState(null);

  const handleDeleteClick = (isbn: string) => {
    setItemToDelete(isbn);
    setShowDeleteModal(true);
  };

  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteModalConfirmYes = () => {
    removeStudent(itemToDelete);
    setShowDeleteModal(false);
  };

  const handleDeleteModalConfirmNo = () => {
    setShowDeleteModal(false);
  };

  const handleEditClicked = (data: any) => {
    setEditData(data);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(true);
  };

  const handleEditModalConfirmYes = (payload: any) => {
    updateStudent(payload.id, payload)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          toast.success(
            response.data.message ?? "Student updated successfully"
          );
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong while updating the student details!");
      });
    console.log(payload);
    setShowEditModal(false);
  };

  const handleEditModalConfirmNo = () => {
    setShowEditModal(false);
  };

  return (
    <TableContainer>
      <CustomTable>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">College ID</th>
            {/* <th scope="col">Student Image</th> */}
            <th scope="col">Contact Number</th>
            <th scope="col">Email</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((student: any) => {
              return (
                <tr key={student.id}>
                  <td>{student?.name}</td>
                  <td>{student?.collegeId}</td>
                  {/* <td>
                    <img
                      src={
                        student?.avatar
                          ? student?.avatar
                          : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn3.iconfinder.com%2Fdata%2Ficons%2Fonline-learning-flat-1%2F64%2F13_male_student_avatar_people_graduate_education_study-1024.png&f=1&nofb=1&ipt=41f0f9b94cb8542323618589c29774aef6081fd11f6e86c3fcd37c9f7b6faa5f&ipo=images"
                      }
                      alt="cover image of the student"
                      width="100%"
                      style={{
                        maxWidth: "100px",
                      }}
                    />
                  </td> */}
                  <td>{student?.contactNumber}</td>
                  <td style={{ textTransform: "none" }}>{student?.email}</td>
                  <td>
                    <Link to={`/user/${student?.collegeId}`}>
                      <IconButton
                        backgroundColor="#446CF6"
                        // onClick={() => handleDeleteClick()}
                      >
                        <ViewIcon size={20} style={{ color: "#fff" }} />
                      </IconButton>
                    </Link>
                    <IconButton
                      backgroundColor="green"
                      onClick={() => handleEditClicked(student)}
                    >
                      <EditIcon size={20} style={{ color: "#fff" }} />
                    </IconButton>
                    <IconButton
                      backgroundColor="#d9534f"
                      onClick={() => handleDeleteClick(student?.id)}
                    >
                      <DeleteIcon size={20} style={{ color: "fff" }} />
                    </IconButton>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>No Students Found</td>
            </tr>
          )}
        </tbody>
      </CustomTable>
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={handleDeleteModalClose}
        onConfirmYes={handleDeleteModalConfirmYes}
        onConfirmNo={handleDeleteModalConfirmNo}
        modalTitle="Delete Book"
        confirmationMessage="Are you sure you want to delete?"
      />
      <FormModal
        isOpen={showEditModal}
        onClose={handleEditModalClose}
        onConfirmYes={handleEditModalConfirmYes}
        onConfirmNo={handleEditModalConfirmNo}
        modalTitle="Edit Student"
        confirmationMessage="Edit students information"
        data={editData}
        notEditableList={NOT_EDITABLE_LIST}
      />
    </TableContainer>
  );
}

export default ManageStudentTable;
