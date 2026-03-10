import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { DownloadOutlined, PlusOutlined } from "@ant-design/icons";
import {
  TableContainer,
  ContBody,
} from "../../../../sharedComponents/MainFlexContainer";
import HeaderBar from "../../../../sharedComponents/header/view";
import {
  setActiveTab,
  setStudents,
  setTeachers,
  setTodayAttendance,
  markAttendance,
} from "../../store/attendanceSlice";
import {
  seedAttendance,
  getAttendanceFromStorage,
  saveAttendanceToStorage,
} from "../../utils/attendanceDummyData";
import Overview from "./Overview";
import StudentAttendance from "./StudentAttendance";
import TeacherAttendance from "./TeacherAttendance";
import MarkAttendanceModal from "./UI/MarkAttendanceModal";

const TABS = [
  { key: "overview",  label: "Overview" },
  { key: "students",  label: "Student Attendance" },
  { key: "teachers",  label: "Teacher Attendance" },
];

const AttendancePage = () => {
  const dispatch = useDispatch();
  const { activeTab, students } = useSelector((s) => s.attendance);
  const [markModalVisible, setMarkModalVisible] = useState(false);

  useEffect(() => {
    seedAttendance();
    const data = getAttendanceFromStorage();
    dispatch(setStudents(data.students));
    dispatch(setTeachers(data.teachers));
    dispatch(setTodayAttendance(data.todayAttendance));
  }, [dispatch]);

  const classes = [...new Set(students.map((s) => s.className))].sort();

  const handleMarkAttendanceSubmit = (data) => {
    dispatch(markAttendance(data));
    const current = getAttendanceFromStorage();
    saveAttendanceToStorage({ ...current, students });
  };

  return (
    <TableContainer>
      <HeaderBar
        showButton={false}
        extra={
          <div className="flex items-center gap-2">
            <Button
              icon={<DownloadOutlined />}
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Export Report
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setMarkModalVisible(true)}
              style={{
                backgroundColor: "rgb(82,107,177)",
                borderColor: "rgb(82,107,177)",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              Mark Attendance
            </Button>
          </div>
        }
      />

      {/* Sticky tab bar */}
      <div className="bg-white border-b border-gray-100 px-6 py-3 flex items-center gap-2 shrink-0 shadow-sm">
        {TABS.map(({ key, label }) => {
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => dispatch(setActiveTab(key))}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-[rgb(82,107,177)] text-white font-semibold shadow-sm border border-transparent"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300"
              }`}
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <ContBody>
        <div className="px-6 py-4">
          {activeTab === "overview"  && <Overview />}
          {activeTab === "students"  && <StudentAttendance />}
          {activeTab === "teachers"  && <TeacherAttendance />}
        </div>
      </ContBody>

      <MarkAttendanceModal
        visible={markModalVisible}
        onClose={() => setMarkModalVisible(false)}
        onSubmit={handleMarkAttendanceSubmit}
        students={students}
        classes={classes}
      />
    </TableContainer>
  );
};

export default AttendancePage;
