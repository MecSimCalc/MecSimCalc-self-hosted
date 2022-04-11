import {
  NoteAddOutlined,
  ArticleOutlined,
  ForumOutlined,
} from "@mui/icons-material";
import { ReactElement } from "react";

interface NavItem {
  label: string;
  href: string;
  icon: ReactElement;
}
export const NAV_ITEMS: NavItem[] = [
  {
    label: "Create",
    href: "https://mecsimcalc.com/create",
    icon: <NoteAddOutlined />,
  },
  {
    label: "Docs",
    href: "https://docs.mecsimcalc.com/",
    icon: <ArticleOutlined />,
  },
  {
    label: "Community",
    href: "https://community.mecsimcalc.com/",
    icon: <ForumOutlined />,
  },
];
