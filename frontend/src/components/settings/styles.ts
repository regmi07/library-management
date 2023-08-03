import styled from "styled-components";

export const FormStyle = styled.form`
  width: 1000px;
  display: flex;
  flex-wrap: wrap;
  gap: 2em;
`;

export const InputDiv = styled.div`
  width: 100%;
  max-width: 450px;
`;

export const ProfileData = styled.div`
  margin-top: 12px;
`;

export const AdminInfo = styled.p`
  padding-top: 6px;
  font-weight: 400;
`;

export const AdminName = styled.p`
  padding-top: 6px;
  font-weight: 400;
  ont-size: 1.25em;
  font-weight: 800;
  color: #000;
`;

export const AvatarImage = styled.img`
  width: 100px;
  border-radius: 50%;
`;

export const ImageLabel = styled.label`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border-radius: 100%;
  background: #ffffff;
  border: 1px solid var(--color-primary);
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  font-weight: normal;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.85em;
`;
