import {
  NotificationOutlined, MailOutlined, CalendarOutlined, MessageOutlined, TeamOutlined,
  BankOutlined, UserOutlined, SolutionOutlined, CheckSquareOutlined, BookOutlined,
  PlayCircleOutlined, AppstoreOutlined, TableOutlined, ScheduleOutlined, CheckCircleOutlined,
  ProjectOutlined, FormOutlined, FileTextOutlined, FolderOpenOutlined, TrophyOutlined,
  WarningOutlined, ExclamationCircleOutlined, DashboardOutlined, DesktopOutlined, ReadOutlined,
  UnorderedListOutlined, IdcardOutlined, PlusCircleOutlined,
} from "@ant-design/icons";

const ICON_MAP = {
  NotificationOutlined, MailOutlined, CalendarOutlined, MessageOutlined, TeamOutlined,
  BankOutlined, UserOutlined, SolutionOutlined, CheckSquareOutlined, BookOutlined,
  PlayCircleOutlined, AppstoreOutlined, TableOutlined, ScheduleOutlined, CheckCircleOutlined,
  ProjectOutlined, FormOutlined, FileTextOutlined, FolderOpenOutlined, TrophyOutlined,
  WarningOutlined, ExclamationCircleOutlined, DashboardOutlined, DesktopOutlined, ReadOutlined,
  UnorderedListOutlined, IdcardOutlined, PlusCircleOutlined,
};

export const getIconComponent = (iconName) => ICON_MAP[iconName] || null;

const findActiveInItems = (items, pathname) => {
  for (const item of items) {
    if (item.route && pathname.startsWith(item.route)) return item.key;
    if (item.children) {
      const found = findActiveInItems(item.children, pathname);
      if (found) return found;
    }
  }
  return null;
};

export const getActiveKey = (pathname, menuConfig) => {
  for (const section of menuConfig) {
    if (section.type === "section") {
      const found = findActiveInItems(section.items, pathname);
      if (found) return found;
    }
  }
  return null;
};

export const isAncestorActive = (item, pathname) => {
  if (!item.children) return false;
  return item.children.some(
    (child) => child.route && pathname.startsWith(child.route)
  );
};
