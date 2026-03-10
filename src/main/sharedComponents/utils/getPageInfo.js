import { menuConfig } from "../../features/SideNav/menuConfig";

export function getPageInfo(pathname) {
  for (const section of menuConfig) {
    for (const item of section.items || []) {
      // Check item route
      if (item.route && pathname.startsWith(item.route)) {
        return { title: item.label, icon: item.icon };
      }

      // Check children routes
      for (const child of item.children || []) {
        if (child.route && pathname.startsWith(child.route)) {
          return { title: child.label, icon: child.icon };
        }
      }
    }
  }

  // Default
  return { title: "Dashboard", icon: "DashboardOutlined" };
}
