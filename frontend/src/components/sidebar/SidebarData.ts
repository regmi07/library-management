import {
  DashboardIcon,
  ProfileIcon,
  BookIcon,
  MoneyIcon,
  IssueIcon,
  ViewMoreIcon,
  UsersIcon,
  SettingsIcon,
  AddUserIcon,
  CategoryIcon,
  LogsIcon,
} from "@/components/Icons";

export const SIDEBAR_DATA = [
  {
    id: 1,
    name: "Dashboard",
    path: "/",
    icon: DashboardIcon,
  },

  {
    id: 3,
    name: "Manage Books",
    path: "/manage-books",
    icon: BookIcon,
  },
  {
    id: 4,
    name: "Add Book",
    path: "/add-book",
    icon: BookIcon,
  },
  {
    id: 6,
    name: "Issue Book",
    path: "/issue",
    icon: IssueIcon,
  },
  {
    id: 7,
    name: "View all Issued Books",
    path: "/issued",
    icon: ViewMoreIcon,
  },
  {
    id: 8,
    name: "Add User",
    path: "/add-user",
    icon: AddUserIcon,
  },
  {
    id: 9,
    name: "Manage Users",
    path: "/manage-user",
    icon: UsersIcon,
  },
  {
    id: 10,
    name: "Manage Settings",
    path: "/settings",
    icon: SettingsIcon,
  },
  {
    id: 11,
    name: "Category",
    path: "/category",
    icon: CategoryIcon,
  },
  {
    id: 12,
    name: "Logs",
    path: "/logs",
    icon: LogsIcon,
  },
];
