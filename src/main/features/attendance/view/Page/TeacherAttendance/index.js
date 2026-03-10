import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../../store/attendanceSlice";
import FilterBar from "./UI/FilterBar";
import TeacherTable from "./UI/TeacherTable";
import TeacherDrawer from "./UI/TeacherDrawer";

const TeacherAttendance = () => {
  const dispatch = useDispatch();
  const { teachers, filters } = useSelector((s) => s.attendance);

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState(null);

  const subjects = useMemo(
    () => [...new Set(teachers.map((t) => t.subject))].sort(),
    [teachers]
  );

  const filteredTeachers = useMemo(() => {
    return teachers.filter((t) => {
      const matchSubject =
        filters.class === "all" || t.subject === filters.class;
      const matchStatus =
        filters.status === "all" ||
        (filters.status === "excellent" && t.attendancePercentage >= 90) ||
        (filters.status === "good" &&
          t.attendancePercentage >= 75 &&
          t.attendancePercentage < 90) ||
        (filters.status === "poor" && t.attendancePercentage < 75);
      const q = (filters.search || "").toLowerCase();
      const matchSearch =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.teacherId.toLowerCase().includes(q) ||
        t.subject.toLowerCase().includes(q);
      return matchSubject && matchStatus && matchSearch;
    });
  }, [teachers, filters]);

  const selectedTeacher = teachers.find((t) => t.id === selectedTeacherId) || null;

  const handleViewDetail = (teacherId) => {
    setSelectedTeacherId(teacherId);
    setDrawerVisible(true);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Filter bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-4 py-3">
        <FilterBar
          filters={filters}
          onFilterChange={(update) => dispatch(setFilters(update))}
          subjects={subjects}
        />
      </div>

      {/* Table — SharedTable provides the card wrapper */}
      <TeacherTable
        teachers={filteredTeachers}
        onViewDetail={handleViewDetail}
        loading={false}
      />

      <TeacherDrawer
        visible={drawerVisible}
        teacher={selectedTeacher}
        onClose={() => setDrawerVisible(false)}
      />
    </div>
  );
};

export default TeacherAttendance;
