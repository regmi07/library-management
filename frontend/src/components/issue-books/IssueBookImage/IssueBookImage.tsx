import Image from "@/components/students/student-image/Image";
import { useIssueBookContext } from "@/contexts/issue-books_context";
import { ImageLabel, ImageLabelContainer } from "./style";

function IssueBookImage() {
  const {
    issue: { student },
  } = useIssueBookContext();

  return (
    <div>
      <Image imageUrl={student?.imageUrl} alt={`Image of ${student?.name}`} />
      <ImageLabelContainer>
        <ImageLabel style={{ textTransform: "capitalize" }}>
          {student?.name ?? "Name"}
        </ImageLabel>
        <ImageLabel>{student?.email ?? "Email"}</ImageLabel>
        <ImageLabel>{student?.contactNumber ?? "Contact Number"}</ImageLabel>
      </ImageLabelContainer>
    </div>
  );
}

export default IssueBookImage;
