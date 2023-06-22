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
  Label,
  ProfileData,
} from "./styles";
import { EditIcon } from "../Icons";
import { toast } from "react-toastify";
import { date } from "yup";

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
        <Label>
          <EditIcon />
          <Input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={updateProfileAvatar}
          ></Input>
        </Label>
      </form>
      <Profiledata
        name={`${settings?.firstName} ${settings?.lastName}`}
        email={settings?.email}
        phone={settings?.phone}
      />
      <div style={{ marginTop: "2em" }}>
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
        <form>
          <div>
            <label htmlFor="firstName">First Name</label>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              disabled={!editProfile}
              value={profile?.firstName ?? ""}
              onChange={handleProfileOnChange}
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <Input
              type="text"
              id="lastName"
              name="lastName"
              disabled={!editProfile}
              value={profile?.lastName ?? ""}
              onChange={handleProfileOnChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Input
              type="text"
              id="email"
              name="email"
              disabled={!editProfile}
              value={profile?.email ?? ""}
              onChange={handleProfileOnChange}
            />
          </div>
          <div>
            <label htmlFor="phone">Phone</label>
            <Input
              type="text"
              id="phone"
              name="phone"
              disabled={!editProfile}
              value={profile?.phone ?? ""}
              onChange={handleProfileOnChange}
            />
          </div>
          <PrimaryButton
            maxWidth="120px"
            onClick={handleUpdateProfile}
            disabled={!editProfile}
          >
            Submit
          </PrimaryButton>
        </form>
      </div>
      <div style={{ marginTop: "2em" }}>
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
        <form>
          <div>
            <label htmlFor="emailSuffix">Email Suffix</label>
            <Input
              type="text"
              id="emailSuffix"
              name="emailSuffix"
              disabled={!editSettings}
              value={adminSettings?.emailSuffix ?? ""}
              onChange={handleAdminSettingOnChange}
            />
          </div>
          <div>
            <label htmlFor="fineAmount">Fine Amount (Rs.)</label>
            <Input
              type="number"
              id="fineAmount"
              name="fineAmount"
              disabled={!editSettings}
              value={adminSettings?.fineAmount ?? 5}
              onChange={handleAdminSettingOnChange}
            />
          </div>
          <div>
            <label htmlFor="maxIssue">Max Issue (Days)</label>
            <Input
              type="number"
              id="maxIssue"
              name="maxIssue"
              disabled={!editSettings}
              value={adminSettings?.maxIssue ?? 2}
              onChange={handleAdminSettingOnChange}
            />
          </div>
          <div>
            <label htmlFor="maxRenew">Max Renew (Days)</label>
            <Input
              type="number"
              id="maxRenew"
              name="maxRenew"
              disabled={!editSettings}
              value={adminSettings?.maxRenew ?? 2}
              onChange={handleAdminSettingOnChange}
            />
          </div>
          <div>
            <label htmlFor="renewBefore">Renew Before (Days)</label>
            <Input
              type="number"
              id="renewBefore"
              name="renewBefore"
              disabled={!editSettings}
              value={adminSettings?.renewBefore ?? 2}
              onChange={handleAdminSettingOnChange}
            />
          </div>
          <PrimaryButton
            maxWidth="120px"
            onClick={handleUpdateAdminSettings}
            disabled={!editSettings}
          >
            Submit
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
}

export default SettingsForm;
