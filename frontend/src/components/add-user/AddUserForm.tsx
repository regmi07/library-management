import React, { ChangeEvent, useState } from "react";
import { Input, PrimaryButton } from "../issue-books/IssueBookForm/styles";
// import UploadAndDisplayImage from "../UploadAndDisplayImage/UploadAndDisplayImage";

import * as Yup from "yup";
import { Form, Formik, FormikValues } from "formik";
import { InputField, Error } from "./style";
import { addStudent } from "@/adapters/student.adapter/student";
import { toast } from "react-toastify";
import FileInputAndPreview from "./FileInputAndPreview/FileInputAndPreview";
import { Label, MainContainer } from "../add-book/style";

const AddBookSchema = Yup.object().shape({
  collegeId: Yup.string()
    .optional()
    .matches(/^np\d{2}cp\d[a|s]\d{6}/i, "Invalid college ID"),
  name: Yup.string().required("Student name is required"),
  contactNumber: Yup.string()
    .required("Contact number is required")
    .matches(
      /^9(\+\d{1,2}\s?)?\(?\d{2}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gm,
      "Contact number should start with 9 and must be 10 digits."
    ),
  email: Yup.string().required("Email is required"),
  file: Yup.mixed().optional(),
});

function AddUserForm() {
  const handleCollegeIdOnBlur = (
    event: React.FocusEvent<HTMLInputElement>,
    setFieldValue: any,
    setFieldError: any,
    setFieldTouched: any
  ) => {
    const collegeId = event.target.value;
    //pattern for college IDs
    let collegeIdPattern = /^np\d{2}cp\d[a|s]\d{6}/i;

    if (collegeIdPattern.test(collegeId)) {
      const email = `${collegeId}@iic.edu.np`;
      setFieldTouched("collegeId", true);
      setFieldValue("email", email);
    } else {
      setFieldValue("collegeId", collegeId);
      setFieldError("collegeId", "Invalid college ID");
    }
  };

  const addNewUser = (values: FormikValues, actions: any) => {
    const formData = new FormData();
    for (let key in values) {
      if (values.hasOwnProperty(key)) {
        formData.append(key, values[key]);
      }
    }

    addStudent(formData)
      .then((response) => {
        if (response.status === 201)
          toast.success("Student added successfully");
        console.log(response);
      })
      .catch((error) => {
        if (Array.isArray(error.response.data?.message))
          toast.error(error.response.data?.message[0]);
        else toast.error(error.response.data?.message);
      });
  };

  return (
    <div>
      <Formik
        initialValues={{
          collegeId: "",
          name: "",
          contactNumber: "",
          email: "",
          file: undefined,
        }}
        validationSchema={AddBookSchema}
        onSubmit={addNewUser}
      >
        {({
          values,
          errors,
          touched,
          setFieldValue,
          setFieldError,
          setFieldTouched,
        }) => (
          <MainContainer>
            <Form>
              <div style={{ marginBottom: "1em" }}>
                <Label htmlFor="collegeId">College ID</Label>
                <InputField
                  type="text"
                  id="collegeId"
                  name="collegeId"
                  // value={studentDetails.collegeId}
                  placeholder="Enter College ID (leave empty if not available)"
                  onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
                    handleCollegeIdOnBlur(
                      event,
                      setFieldValue,
                      setFieldError,
                      setFieldTouched
                    )
                  }
                />
                <Error name="collegeId" component="div" />
              </div>

              <div style={{ marginBottom: "1em" }}>
                <Label htmlFor="name">Name</Label>
                <InputField
                  type="text"
                  id="name"
                  name="name"
                  // value={studentDetails.name}
                  placeholder="Enter Student Name"
                />
                <Error name="name" component="div" />
              </div>

              <div style={{ marginBottom: "1em" }}>
                <Label htmlFor="contactNumber">Contact Number</Label>
                <InputField
                  type="text"
                  id="contactNumber"
                  name="contactNumber"
                  // value={studentDetails.contactNumber}
                  placeholder="Enter Student Contact Number"
                />
                <Error name="contactNumber" component="div" />
              </div>

              <div style={{ marginBottom: "1em" }}>
                <Label htmlFor="email">Email</Label>
                <InputField
                  type="text"
                  id="email"
                  name="email"
                  // value={studentDetails.email}
                  placeholder="Enter Student Email"
                  readOnly={values.email.endsWith("@iic.edu.np")}
                />
                <Error name="email" component="div" />
              </div>
              <div style={{ marginBottom: "1em" }}>
                <InputField name="file" component={FileInputAndPreview} />
              </div>
              <PrimaryButton type="submit">Add User</PrimaryButton>
            </Form>
          </MainContainer>
        )}
      </Formik>
    </div>
  );
}

export default AddUserForm;
