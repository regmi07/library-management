import {
  getSetting,
  updateAvatar,
  updateSettings,
} from "@/adapters/settings.adapter/settings";
import { ChangeEvent, useEffect, useState } from "react";
import { Input, PrimaryButton } from "../issue-books/IssueBookForm/styles";
import {
  AdminInfo,
  AdminName,
  AvatarImage,
  FormStyle,
  ImageLabel,
  InputDiv,
  ProfileData,
} from "./styles";
import { EditIcon } from "../Icons";
import { toast } from "react-toastify";
import { Label } from "../add-book/style";

function Profiledata(props: any) {
  const { name, email, phone } = props;
  return (
    <ProfileData>
      <AdminName> {name}</AdminName>
      <AdminInfo>Itahari International College</AdminInfo>
      <AdminInfo>{email}</AdminInfo>
      <AdminInfo>+977 {phone}</AdminInfo>
    </ProfileData>
  );
}

function SettingsForm() {
  const [settings, setSettings] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [adminSettings, setAdminSettings] = useState<any>(null);
  const [editProfile, setEditProfile] = useState(false);
  const [editSettings, setEditSettings] = useState(false);

  useEffect(() => {
    getSetting().then((response) => {
      setSettings(response?.data);
      setProfile(response?.data);
      setAdminSettings(response?.data);
    });
  }, []);

  const handleProfileOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
  };

  const handleAdminSettingOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(typeof event.target);

    setAdminSettings({
      ...adminSettings,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdateProfile = (event: SubmitEvent) => {
    event.preventDefault();
    const id = settings.id;
    updateSettings(id, {
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      phone: profile.phone,
    })
      .then((response) => {
        if (response.status === 200 && response.data.updated) {
          setSettings({ ...settings, ...response.data.data });
          toast.success("Profile updated successfully!");
          setEditProfile(false);
        }
      })
      .catch((error) => {
        toast.error("Something went wrong while updating profile!");
      })
      .finally(() => {
        setEditProfile(false);
      });
  };

  const updateProfileAvatar = (event: any) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    updateAvatar(formData)
      .then((response) => {
        // console.log(response.data.avatar);
        if (response.status === 200) {
          setSettings({ ...settings, avatar: response.data.avatar });
          toast.success("Avatar updated successfully!");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong while updating avatar!");
      });
  };

  const handleUpdateAdminSettings = (event: SubmitEvent) => {
    event.preventDefault();
    const id = settings.id;
    updateSettings(id, {
      emailSuffix: adminSettings.emailSuffix,
      maxRenew: parseInt(adminSettings.maxRenew),
      maxIssue: parseInt(adminSettings.maxIssue),
      fineAmount: parseInt(adminSettings.fineAmount),
      renewBefore: parseInt(adminSettings.renewBefore),
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200 && response.data.updated) {
          setSettings({ ...settings, ...response.data.data });
          toast.success("Admin Settings updated successfully!");
        }
      })
      .catch((error) => {
        toast.error("Something went wrong while updating admin settings!");
      })
      .finally(() => {
        setEditSettings(false);
      });
  };

  return (
    <div>
      <AvatarImage
        src={settings?.avatar}
        alt={`${settings?.firstName} ${settings?.lastName} image`}
      />
      <form>
        <ImageLabel>
          <EditIcon />
          <Input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={updateProfileAvatar}
          ></Input>
        </ImageLabel>
      </form>
      <Profiledata
        name={`${settings?.firstName} ${settings?.lastName}`}
        email={settings?.email}
        phone={settings?.phone}
      />
      <div style={{ marginTop: "2em", width: "1000px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: ".5em",
          }}
        >
          <h2>Edit Profile</h2>
          <PrimaryButton
            maxWidth="80px"
            onClick={() => setEditProfile(!editProfile)}
          >
            Edit
          </PrimaryButton>
        </div>
        <FormStyle>
          <InputDiv>
            <Label htmlFor="firstName" required>
              First Name
            </Label>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              disabled={!editProfile}
              value={profile?.firstName ?? ""}
              onChange={handleProfileOnChange}
            />
          </InputDiv>
          <InputDiv>
            <Label htmlFor="lastName" required>
              Last Name
            </Label>
            <Input
              type="text"
              id="lastName"
              name="lastName"
              disabled={!editProfile}
              value={profile?.lastName ?? ""}
              onChange={handleProfileOnChange}
            />
          </InputDiv>
          <InputDiv>
            <Label htmlFor="email">Email</Label>
            <Input
              type="text"
              id="email"
              name="email"
              disabled={!editProfile}
              value={profile?.email ?? ""}
              onChange={handleProfileOnChange}
            />
          </InputDiv>
          <InputDiv>
            <Label htmlFor="phone">Phone</Label>
            <Input
              type="text"
              id="phone"
              name="phone"
              disabled={!editProfile}
              value={profile?.phone ?? ""}
              onChange={handleProfileOnChange}
            />
          </InputDiv>
        </FormStyle>
        <PrimaryButton
          maxWidth="120px"
          onClick={handleUpdateProfile}
          disabled={!editProfile}
        >
          Submit
        </PrimaryButton>
      </div>
      <div style={{ marginTop: "2em", width: "1000px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: ".5em",
          }}
        >
          <h2>Edit Settings</h2>
          <PrimaryButton
            maxWidth="80px"
            onClick={() => setEditSettings(!editSettings)}
          >
            Edit
          </PrimaryButton>
        </div>
        <FormStyle>
          <InputDiv>
            <Label htmlFor="emailSuffix">Email Suffix</Label>
            <Input
              type="text"
              id="emailSuffix"
              name="emailSuffix"
              disabled={!editSettings}
              value={adminSettings?.emailSuffix ?? ""}
              onChange={handleAdminSettingOnChange}
            />
          </InputDiv>
          <InputDiv>
            <Label htmlFor="fineAmount">Fine Amount (Rs.)</Label>
            <Input
              type="number"
              id="fineAmount"
              name="fineAmount"
              disabled={!editSettings}
              value={adminSettings?.fineAmount ?? 5}
              onChange={handleAdminSettingOnChange}
            />
          </InputDiv>
          <InputDiv>
            <Label htmlFor="maxIssue">Max Issue (Days)</Label>
            <Input
              type="number"
              id="maxIssue"
              name="maxIssue"
              disabled={!editSettings}
              value={adminSettings?.maxIssue ?? 2}
              onChange={handleAdminSettingOnChange}
            />
          </InputDiv>
          <InputDiv>
            <Label htmlFor="maxRenew">Max Renew (Days)</Label>
            <Input
              type="number"
              id="maxRenew"
              name="maxRenew"
              disabled={!editSettings}
              value={adminSettings?.maxRenew ?? 2}
              onChange={handleAdminSettingOnChange}
            />
          </InputDiv>
          <InputDiv>
            <Label htmlFor="renewBefore">Renew Before (Days)</Label>
            <Input
              type="number"
              id="renewBefore"
              name="renewBefore"
              disabled={!editSettings}
              value={adminSettings?.renewBefore ?? 2}
              onChange={handleAdminSettingOnChange}
            />
          </InputDiv>
        </FormStyle>
        <PrimaryButton
          maxWidth="120px"
          onClick={handleUpdateAdminSettings}
          disabled={!editSettings}
        >
          Submit
        </PrimaryButton>
      </div>
    </div>
  );
}

export default SettingsForm;
