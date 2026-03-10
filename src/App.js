import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { seedUsers } from "./main/features/login/services/loginService";
import MainLayout from "./main/sharedComponents/layout/MainLayout";
import LoginIndex from "./main/features/login/view";
import RegistrationIndex from "./main/features/registration/view";
import ForgotPasswordIndex from "./main/features/forgotPassword/view";
import AdminDashboard from "./main/features/adminDashboard/view";
import MainStudent from "./main/features/student/view";
import MainTeacher from "./main/features/teacher/view";
import MyStudiedCoursesIndex from "./main/features/myStudiedCourses/view";
import AssignCoursesIndex from "./main/features/assignCourses/view";
import AllClassesIndex from "./main/features/allClasses/view";
import ClassScheduleIndex from "./main/features/classSchedule/view";
import NoticeBoardIndex from "./main/features/noticeBoard/view";
import NewsFeedIndex from "./main/features/newsFeed/view";
import MessengerIndex from "./main/features/messenger/view";
import MailBoxIndex from "./main/features/mailBox/view";
import SchoolPolicyIndex from "./main/features/schoolPolicy/view";
import StudentIdCardIndex from "./main/features/studentIdCard/view";
import LeaveIndex from "./main/features/leave/view";
import RewardsIndex from "./main/features/rewards/view";
import WarningsIndex from "./main/features/warnings/view";
import ComplaintsIndex from "./main/features/complaints/view";
import TasksIndex from "./main/features/tasks/view";
import ProjectsIndex from "./main/features/projects/view";
import GroupsIndex from "./main/features/groups/view";
import WorkBoardIndex from "./main/features/workBoard/view";
import PagesIndex from "./main/features/pages/view";
import FormsIndex from "./main/features/forms/view";
import AttendanceIndex from "./main/features/attendance/view";

/* ── Simple placeholder for modules not yet built ── */
const Placeholder = ({ name }) => (
  <div className="flex items-center justify-center h-full min-h-[60vh]">
    <div className="text-center select-none">
      <div
        className="text-3xl font-bold mb-2"
        style={{ color: "rgb(82,107,177)", fontFamily: "Montserrat, sans-serif" }}
      >
        {name}
      </div>
      <div className="text-sm text-gray-400">Module coming soon</div>
    </div>
  </div>
);

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.login);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  useEffect(() => { seedUsers(); }, []);

  return (
    <Router>
      <Routes>
        {/* PUBLIC */}
        <Route path="/login/*"           element={<LoginIndex />} />
        <Route path="/register/*"        element={<RegistrationIndex />} />
        <Route path="/forgot-password/*" element={<ForgotPasswordIndex />} />

        {/* DEFAULT */}
        <Route path="/" element={<Navigate to="/dashboard/admin" replace />} />

        {/* PROTECTED LAYOUT */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* ── Dashboards ── */}
          <Route path="dashboard/admin"   element={<AdminDashboard />} />
          <Route path="dashboard/teacher" element={<Placeholder name="Teacher Dashboard" />} />
          <Route path="dashboard/student" element={<Placeholder name="Student Dashboard" />} />

          {/* ── Menu ── */}
          <Route path="news-feed/*"       element={<NewsFeedIndex />} />
          <Route path="mail-box/*"        element={<MailBoxIndex />} />
          <Route path="calendar/*"        element={<ClassScheduleIndex />} />
          <Route path="messenger/*"       element={<MessengerIndex />} />
          <Route path="groups/*"           element={<GroupsIndex />} />
          <Route path="school-policies"   element={<SchoolPolicyIndex />} />

          {/* ── Academics ── */}
          {/* Students — new canonical routes */}
          <Route path="students/list/*"   element={<MainStudent />} />
          <Route path="students/idcards"  element={<StudentIdCardIndex />} />
          {/* Teachers */}
          <Route path="teachers/list/*"   element={<MainTeacher />} />
          {/* Attendance */}
          <Route path="attendance"        element={<AttendanceIndex />} />
          {/* Courses */}
          <Route path="courses/all/*"     element={<MyStudiedCoursesIndex />} />
          <Route path="courses/assign/*"  element={<AssignCoursesIndex />} />
          {/* L & D */}
          <Route path="online-learning"   element={<Placeholder name="Learning & Development" />} />
          {/* Classes */}
          <Route path="classes/all/*"     element={<AllClassesIndex />} />
          <Route path="classes/schedule/*" element={<ClassScheduleIndex />} />

          {/* ── Work ── */}
          <Route path="tasks/*"           element={<TasksIndex />} />
          <Route path="projects/*"         element={<ProjectsIndex />} />
          <Route path="work-board/*"       element={<WorkBoardIndex />} />
          <Route path="forms/*"            element={<FormsIndex />} />
          <Route path="pages/*"            element={<PagesIndex />} />
          <Route path="docs-archives"     element={<Placeholder name="Docs & Archives" />} />

          {/* ── HR ── */}
          <Route path="leaves"            element={<LeaveIndex />} />
          <Route path="rewards/*"          element={<RewardsIndex />} />
          <Route path="warnings/*"         element={<WarningsIndex />} />
          <Route path="complaints/*"       element={<ComplaintsIndex />} />

          {/* ── Profile ── */}
          <Route path="profile"           element={<Placeholder name="Profile" />} />

          {/* ── Legacy routes (kept intact) ── */}
          <Route path="allstudents/*"     element={<MainStudent />} />
          <Route path="allteachers/*"     element={<MainTeacher />} />
          <Route path="mystudiedcourses/*" element={<MyStudiedCoursesIndex />} />
          <Route path="assign/courses/*"  element={<AssignCoursesIndex />} />
          <Route path="allclasses/*"      element={<AllClassesIndex />} />
          <Route path="class-schedule/*"  element={<ClassScheduleIndex />} />
          <Route path="notice-board/*"    element={<NoticeBoardIndex />} />
        </Route>

        {/* CATCH ALL */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
