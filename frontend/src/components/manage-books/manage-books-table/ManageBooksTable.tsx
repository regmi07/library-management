import { updateBookRequest } from "@/adapters/books.adapter/books";
import { DeleteIcon, EditIcon, ViewIcon } from "@/components/Icons";
import ConfirmationModal from "@/components/Modal/ConfirmationModal/ConfirmationModal";
import FormModal from "@/components/Modal/FormModal/FormModal";
import { useBooksContext } from "@/contexts/manage-books_context/ViewBookContext";
import { IconButton } from "@/styles/button";
import { CustomTable, TableContainer } from "@/styles/table";
import { useState } from "react";
import { toast } from "react-toastify";

const NOT_EDITABLE_LIST = ["isbn", "image", "availablecopies"];

function ManageBooksTable() {
  const {
    books: { data },
    removeBook,
  } = useBooksContext();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState("");

  const [editData, setEditData] = useState<any>(null);

  const handleDeleteClick = (isbn: string) => {
    setItemToDelete(isbn);
    setShowDeleteModal(true);
  };

  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteModalConfirmYes = () => {
    removeBook(itemToDelete);
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
    updateBookRequest(payload.isbn, payload)
      .then((response) => {
        console.log(response);
        if (response.status === 200 && response.data.success) {
          toast.success(response.data.message);
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong while updating the book!");
      });
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
            <th scope="col">ISBN</th>
            <th scope="col">Cover Image</th>
            <th scope="col">Book Name</th>
            <th scope="col">Summary</th>
            <th scope="col">Category</th>
            <th scope="col">Total Copies</th>
            <th scope="col">Available Copies</th>
            <th scope="col">Authors</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((book: any) => {
              return (
                <tr key={book.isbn}>
                  <td>{book?.isbn}</td>
                  <td>
                    <img
                      src={book?.image}
                      alt="cover image of the book"
                      width="100%"
                      style={{
                        maxWidth: "130px",
                      }}
                    />
                  </td>
                  <td>
                    {book?.title.length > 100
                      ? `${book?.title.substring(0, 100)}...`
                      : book?.title}
                  </td>
                  <td>
                    <p style={{ textAlign: "justify" }}>
                      {book?.summary
                        ? `${book?.summary?.substring(0, 150)}...`
                        : "N/A"}
                    </p>
                  </td>
                  <td>{`${book?.category?.category} (${book?.subCategory?.name})`}</td>
                  <td>{book?.totalCopies}</td>
                  <td>{book?.availableCopies}</td>
                  <td>{book?.authors}</td>
                  <td>
                    <IconButton backgroundColor="#446CF6">
                      <ViewIcon size={20} style={{ color: "#fff" }} />
                    </IconButton>
                    <IconButton
                      backgroundColor="green"
                      onClick={() => handleEditClicked(book)}
                    >
                      <EditIcon size={20} style={{ color: "#fff" }} />
                    </IconButton>
                    <IconButton
                      backgroundColor="#d9534f"
                      onClick={() => handleDeleteClick(book?.isbn)}
                    >
                      <DeleteIcon size={20} style={{ color: "fff" }} />
                    </IconButton>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>No Books found</td>
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
        modalTitle="Edit Book"
        confirmationMessage="Edit the books"
        data={editData}
        notEditableList={NOT_EDITABLE_LIST}
      />
    </TableContainer>
  );
}

export default ManageBooksTable;
