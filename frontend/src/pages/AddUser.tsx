import AddUserForm from "@/components/add-user/AddUserForm";
import BulkAddStudent from "@/components/add-user/BulkAddUser";

function AddUser() {
  return (
    <div>
      <BulkAddStudent />
      <AddUserForm />
    </div>
  );
}

export default AddUser;
