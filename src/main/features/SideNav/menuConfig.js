export const menuConfig = [
  {
    type: "section",
    label: "Menu",
    items: [
      { key: "news-feed",       label: "News Feed",       icon: "NotificationOutlined", route: "/news-feed",       badge: null   },
      { key: "mail-box",        label: "Mail Box",        icon: "MailOutlined",         route: "/mail-box",        badge: null },
      { key: "calendar",        label: "Calendar",        icon: "CalendarOutlined",     route: "/calendar",        badge: null },
      { key: "messenger",       label: "Messenger",       icon: "MessageOutlined",      route: "/messenger",       badge: null    },
      { key: "groups",          label: "Groups",          icon: "TeamOutlined",         route: "/groups",          badge: null },
      { key: "school-policies", label: "School Policies", icon: "BankOutlined",         route: "/school-policies", badge: null },
    ],
  },
  {
    type: "section",
    label: "Academics",
    items: [
      {
        key: "students", label: "Students", icon: "UserOutlined", route: null, badge: null,
        children: [
          { key: "students-list",    label: "All Student List", icon: "UnorderedListOutlined", route: "/students/list"    },
          { key: "students-idcards", label: "ID Cards",         icon: "IdcardOutlined",        route: "/students/idcards" },
        ],
      },
      {
        key: "teachers", label: "Teachers", icon: "SolutionOutlined", route: null, badge: null,
        children: [
          { key: "teachers-list", label: "All Teachers", icon: "UnorderedListOutlined", route: "/teachers/list" },
        ],
      },
      { key: "attendance",      label: "Attendance",        icon: "CheckSquareOutlined", route: "/attendance",      badge: null },
      {
        key: "courses", label: "Study Courses", icon: "BookOutlined", route: null, badge: null,
        children: [
          { key: "courses-all",    label: "All Courses",    icon: "AppstoreOutlined",   route: "/courses/all"    },
          { key: "courses-assign", label: "Assign Courses", icon: "PlusCircleOutlined", route: "/courses/assign" },
        ],
      },
      { key: "online-learning", label: "L & D",             icon: "PlayCircleOutlined",  route: "/online-learning", badge: null },
      {
        key: "classes", label: "Classes", icon: "AppstoreOutlined", route: null, badge: null,
        children: [
          { key: "classes-all",      label: "All Classes",    icon: "TableOutlined",    route: "/classes/all"      },
          { key: "class-schedule",   label: "Class Schedule", icon: "ScheduleOutlined", route: "/classes/schedule" },
        ],
      },
    ],
  },
  {
    type: "section",
    label: "Work",
    items: [
      { key: "tasks",         label: "Tasks",           icon: "CheckCircleOutlined",   route: "/tasks",         badge: null   },
      { key: "projects",      label: "Projects",        icon: "ProjectOutlined",       route: "/projects",      badge: null    },
      { key: "work-board",    label: "Work Board",      icon: "TableOutlined",         route: "/work-board",    badge: null },
      { key: "forms",         label: "Forms",           icon: "FormOutlined",          route: "/forms",         badge: null },
      { key: "pages",         label: "Pages",           icon: "FileTextOutlined",      route: "/pages",         badge: null },
      { key: "docs-archives", label: "Docs & Archives", icon: "FolderOpenOutlined",    route: "/docs-archives", badge: null },
    ],
  },
  {
    type: "section",
    label: "HR",
    items: [
      { key: "leaves",     label: "Leaves",     icon: "CalendarOutlined",          route: "/leaves",     badge: null },
      { key: "rewards",    label: "Rewards",    icon: "TrophyOutlined",            route: "/rewards",    badge: null },
      { key: "warnings",   label: "Warnings",   icon: "WarningOutlined",           route: "/warnings",   badge: null },
      { key: "complaints", label: "Complaints", icon: "ExclamationCircleOutlined", route: "/complaints", badge: null },
    ],
  },
  {
    type: "section",
    label: "Profile",
    items: [
      { key: "profile", label: "Profile", icon: "UserOutlined", route: "/profile", badge: null },
      {
        key: "dashboard", label: "Dashboard", icon: "DashboardOutlined", route: null, badge: null,
        children: [
          { key: "dashboard-admin",   label: "Admin Dashboard",   icon: "DesktopOutlined", route: "/dashboard/admin"   },
          { key: "dashboard-teacher", label: "Teacher Dashboard", icon: "TeamOutlined",    route: "/dashboard/teacher" },
          { key: "dashboard-student", label: "Student Dashboard", icon: "ReadOutlined",    route: "/dashboard/student" },
        ],
      },
    ],
  },
];
