import { useMemo, useState } from "react";
import { message } from "antd";
import STUDENT_ATTENDANCE_RECORDS from "../../../utils/studentAttendanceRecords";
import FilterBar from "./UI/FilterBar";
import StudentTable from "./UI/StudentTable";

const StudentAttendance = () => {
  const [filters, setFilters] = useState({
    dateRange: [],
    class: "all",
    status: "all",
    search: "",
  });

  const handleFilterChange = (update) => {
    setFilters((prev) => ({ ...prev, ...update }));
  };

  const filteredRecords = useMemo(() => {
    return STUDENT_ATTENDANCE_RECORDS.filter((r) => {
      const matchClass  = filters.class  === "all" || r.className === filters.class;
      const matchStatus = filters.status === "all" || r.status    === filters.status;

      let matchDate = true;
      if (filters.dateRange && filters.dateRange[0] && filters.dateRange[1]) {
        matchDate = r.date >= filters.dateRange[0] && r.date <= filters.dateRange[1];
      }

      const q = filters.search.toLowerCase();
      const matchSearch =
        !q ||
        r.studentName.toLowerCase().includes(q) ||
        r.studentId.toLowerCase().includes(q) ||
        r.className.toLowerCase().includes(q);

      return matchClass && matchStatus && matchDate && matchSearch;
    });
  }, [filters]);

  const handleViewDetail = (recordId) => {
    const record = STUDENT_ATTENDANCE_RECORDS.find((r) => r.id === recordId);
    if (record) {
      message.info(`${record.studentName} — ${record.date} — ${record.status}`);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Filter bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-4 py-3">
        <FilterBar filters={filters} onFilterChange={handleFilterChange} />
      </div>

      {/* Title row */}
      {/* <div className="flex items-center px-1">
        <span
          className="text-sm font-semibold text-gray-700"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Student Attendance Records
        </span>
        <span
          className="ml-2 text-xs text-gray-400"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          ({filteredRecords.length} records)
        </span>
      </div> */}

      {/* Table — SharedTable provides the card wrapper */}
      <StudentTable
        records={filteredRecords}
        onViewDetail={handleViewDetail}
        loading={false}
      />
    </div>
  );
};

export default StudentAttendance;
