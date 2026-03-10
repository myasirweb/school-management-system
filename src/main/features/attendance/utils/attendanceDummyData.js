const STORAGE_KEY = "attendance_data";

const MONTH_LABELS = [
  "Aug 2024", "Sep 2024", "Oct 2024", "Nov 2024", "Dec 2024", "Jan 2025",
];

/* ── Helpers ── */
function makeMonthly(presentArr, absentArr, lateArr) {
  return MONTH_LABELS.map((month, i) => ({
    month,
    present: presentArr[i],
    absent: absentArr[i],
    late: lateArr[i],
  }));
}

// Generate 30 daily records for Jan–Feb 2025
// absentIdxs / lateIdxs / leaveIdxs are 0-based (0 = Jan 2)
function makeDaily(absentIdxs = [], lateIdxs = [], leaveIdxs = []) {
  const records = [];
  const start = new Date("2025-01-02");
  for (let i = 0; i < 30; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().split("T")[0];
    let status = "present";
    if (absentIdxs.includes(i)) status = "absent";
    else if (lateIdxs.includes(i)) status = "late";
    else if (leaveIdxs.includes(i)) status = "leave";
    records.push({
      date: dateStr,
      status,
      note:
        status === "absent"
          ? "Absent without prior notification"
          : status === "late"
          ? "Arrived 15 minutes after scheduled time"
          : status === "leave"
          ? "Approved medical leave"
          : "",
    });
  }
  return records;
}

/* ── 15 Students ── */
export const STUDENTS = [
  {
    id: "S001", name: "Ahmad Raza Khan", avatar: "https://i.pravatar.cc/150?img=11",
    studentId: "STU-2024-001", className: "Grade 10 - A", section: "A", rollNumber: "101",
    totalDays: 120, presentDays: 108, absentDays: 8, lateDays: 4, attendancePercentage: 90,
    monthlyData: makeMonthly([18,19,17,18,16,20],[1,1,2,1,2,1],[1,0,1,1,1,0]),
    dailyRecords: makeDaily([5,12,19,26],[3,9,16,23],[]),
  },
  {
    id: "S002", name: "Fatima Noor Ahmed", avatar: "https://i.pravatar.cc/150?img=47",
    studentId: "STU-2024-002", className: "Grade 10 - B", section: "B", rollNumber: "205",
    totalDays: 120, presentDays: 110, absentDays: 6, lateDays: 4, attendancePercentage: 92,
    monthlyData: makeMonthly([19,20,18,19,17,17],[1,0,1,1,2,1],[0,1,1,0,1,1]),
    dailyRecords: makeDaily([7,14,21],[2,10,18,25],[]),
  },
  {
    id: "S003", name: "Muhammad Hassan Ali", avatar: "https://i.pravatar.cc/150?img=15",
    studentId: "STU-2024-003", className: "Grade 9 - A", section: "A", rollNumber: "301",
    totalDays: 120, presentDays: 105, absentDays: 10, lateDays: 5, attendancePercentage: 88,
    monthlyData: makeMonthly([17,18,16,17,15,22],[2,1,3,2,2,0],[1,1,1,1,1,0]),
    dailyRecords: makeDaily([4,11,18,25],[6,13,20],[]),
  },
  {
    id: "S004", name: "Ayesha Malik", avatar: "https://i.pravatar.cc/150?img=37",
    studentId: "STU-2024-004", className: "Grade 10 - A", section: "A", rollNumber: "102",
    totalDays: 120, presentDays: 115, absentDays: 3, lateDays: 2, attendancePercentage: 96,
    monthlyData: makeMonthly([20,20,19,20,18,18],[0,0,1,0,1,1],[0,1,0,0,0,1]),
    dailyRecords: makeDaily([8,22],[15,27],[]),
  },
  {
    id: "S005", name: "Usman Tariq", avatar: "https://i.pravatar.cc/150?img=25",
    studentId: "STU-2024-005", className: "Grade 9 - B", section: "B", rollNumber: "402",
    totalDays: 120, presentDays: 90, absentDays: 22, lateDays: 8, attendancePercentage: 75,
    monthlyData: makeMonthly([14,15,13,14,12,22],[4,4,6,5,5,4],[2,1,1,1,2,1]),
    dailyRecords: makeDaily([1,3,5,8,11,14,17,20,24,28],[0,6,12,18,24],[]),
  },
  {
    id: "S006", name: "Zara Hussain", avatar: "https://i.pravatar.cc/150?img=44",
    studentId: "STU-2024-006", className: "Grade 11 - A", section: "A", rollNumber: "501",
    totalDays: 120, presentDays: 112, absentDays: 5, lateDays: 3, attendancePercentage: 93,
    monthlyData: makeMonthly([19,20,18,19,17,19],[1,0,1,1,1,1],[0,1,1,0,1,0]),
    dailyRecords: makeDaily([9,23],[4,17],[]),
  },
  {
    id: "S007", name: "Bilal Khan Niazi", avatar: "https://i.pravatar.cc/150?img=21",
    studentId: "STU-2024-007", className: "Grade 8 - A", section: "A", rollNumber: "601",
    totalDays: 120, presentDays: 107, absentDays: 9, lateDays: 4, attendancePercentage: 89,
    monthlyData: makeMonthly([18,19,16,18,16,20],[1,1,3,1,2,1],[1,0,1,1,2,0]),
    dailyRecords: makeDaily([2,10,18,26],[7,15,22],[]),
  },
  {
    id: "S008", name: "Sana Riaz", avatar: "https://i.pravatar.cc/150?img=53",
    studentId: "STU-2024-008", className: "Grade 11 - B", section: "B", rollNumber: "602",
    totalDays: 120, presentDays: 103, absentDays: 13, lateDays: 4, attendancePercentage: 86,
    monthlyData: makeMonthly([17,18,15,18,15,20],[2,2,4,2,3,0],[1,0,1,0,1,1]),
    dailyRecords: makeDaily([3,11,19,27],[6,13,20],[]),
  },
  {
    id: "S009", name: "Omar Farooq", avatar: "https://i.pravatar.cc/150?img=3",
    studentId: "STU-2024-009", className: "Grade 9 - A", section: "A", rollNumber: "302",
    totalDays: 120, presentDays: 116, absentDays: 2, lateDays: 2, attendancePercentage: 97,
    monthlyData: makeMonthly([20,20,20,19,19,18],[0,0,0,1,1,0],[0,1,0,0,0,1]),
    dailyRecords: makeDaily([13],[6,20],[]),
  },
  {
    id: "S010", name: "Nadia Rahman", avatar: "https://i.pravatar.cc/150?img=45",
    studentId: "STU-2024-010", className: "Grade 8 - A", section: "A", rollNumber: "602",
    totalDays: 120, presentDays: 98, absentDays: 18, lateDays: 4, attendancePercentage: 82,
    monthlyData: makeMonthly([15,17,14,17,15,20],[4,3,5,3,4,0],[1,0,1,0,1,1]),
    dailyRecords: makeDaily([0,4,9,14,19,24],[7,16,23],[]),
  },
  {
    id: "S011", name: "Tariq Mahmood", avatar: "https://i.pravatar.cc/150?img=8",
    studentId: "STU-2024-011", className: "Grade 10 - B", section: "B", rollNumber: "206",
    totalDays: 120, presentDays: 88, absentDays: 25, lateDays: 7, attendancePercentage: 73,
    monthlyData: makeMonthly([13,14,12,15,13,21],[5,5,7,5,5,2],[2,1,1,0,2,1]),
    dailyRecords: makeDaily([0,2,5,8,12,15,18,22,25,28],[3,9,16],[]),
  },
  {
    id: "S012", name: "Amna Siddiqui", avatar: "https://i.pravatar.cc/150?img=32",
    studentId: "STU-2024-012", className: "Grade 9 - B", section: "B", rollNumber: "403",
    totalDays: 120, presentDays: 110, absentDays: 7, lateDays: 3, attendancePercentage: 92,
    monthlyData: makeMonthly([18,20,18,19,17,18],[2,0,1,1,2,1],[0,1,1,0,1,0]),
    dailyRecords: makeDaily([5,19],[11,25],[]),
  },
  {
    id: "S013", name: "Hassan Raza", avatar: "https://i.pravatar.cc/150?img=12",
    studentId: "STU-2024-013", className: "Grade 11 - A", section: "A", rollNumber: "502",
    totalDays: 120, presentDays: 106, absentDays: 11, lateDays: 3, attendancePercentage: 88,
    monthlyData: makeMonthly([17,18,16,18,16,21],[2,2,3,2,2,0],[1,0,1,0,1,0]),
    dailyRecords: makeDaily([1,8,16,24],[12,20],[]),
  },
  {
    id: "S014", name: "Mariam Khan", avatar: "https://i.pravatar.cc/150?img=49",
    studentId: "STU-2024-014", className: "Grade 11 - B", section: "B", rollNumber: "603",
    totalDays: 120, presentDays: 117, absentDays: 2, lateDays: 1, attendancePercentage: 98,
    monthlyData: makeMonthly([20,20,20,20,19,18],[0,0,0,0,1,1],[0,0,1,0,0,0]),
    dailyRecords: makeDaily([17],[9],[]),
  },
  {
    id: "S015", name: "Faisal Ahmed", avatar: "https://i.pravatar.cc/150?img=18",
    studentId: "STU-2024-015", className: "Grade 8 - A", section: "A", rollNumber: "603",
    totalDays: 120, presentDays: 95, absentDays: 20, lateDays: 5, attendancePercentage: 79,
    monthlyData: makeMonthly([14,15,14,16,14,22],[4,4,5,4,4,0],[2,1,1,0,1,0]),
    dailyRecords: makeDaily([0,3,7,11,15,19,23,27],[4,12,20,28],[]),
  },
];

/* ── 8 Teachers ── */
export const TEACHERS = [
  {
    id: "T001", name: "Mr. Ali Hassan", avatar: "https://i.pravatar.cc/150?img=5",
    teacherId: "TCH-2024-001", subject: "Mathematics",
    totalDays: 120, presentDays: 118, absentDays: 1, lateDays: 1, attendancePercentage: 98,
    monthlyData: makeMonthly([20,20,20,20,19,19],[0,0,0,0,1,0],[0,0,1,0,0,0]),
    dailyRecords: makeDaily([14],[7],[]),
  },
  {
    id: "T002", name: "Ms. Sarah Ahmed", avatar: "https://i.pravatar.cc/150?img=56",
    teacherId: "TCH-2024-002", subject: "English",
    totalDays: 120, presentDays: 115, absentDays: 3, lateDays: 2, attendancePercentage: 96,
    monthlyData: makeMonthly([19,20,19,19,19,19],[1,0,1,1,0,0],[0,1,0,0,1,0]),
    dailyRecords: makeDaily([8,22],[5,19],[]),
  },
  {
    id: "T003", name: "Dr. Omar Farooq", avatar: "https://i.pravatar.cc/150?img=7",
    teacherId: "TCH-2024-003", subject: "Physics",
    totalDays: 120, presentDays: 112, absentDays: 5, lateDays: 3, attendancePercentage: 93,
    monthlyData: makeMonthly([19,20,18,19,17,19],[1,0,1,1,2,0],[0,1,1,0,1,0]),
    dailyRecords: makeDaily([3,11,25],[8,16],[]),
  },
  {
    id: "T004", name: "Ms. Nadia Khan", avatar: "https://i.pravatar.cc/150?img=48",
    teacherId: "TCH-2024-004", subject: "Chemistry",
    totalDays: 120, presentDays: 113, absentDays: 5, lateDays: 2, attendancePercentage: 94,
    monthlyData: makeMonthly([19,20,18,20,17,19],[1,0,2,0,2,0],[0,1,0,0,1,0]),
    dailyRecords: makeDaily([6,20],[13,27],[]),
  },
  {
    id: "T005", name: "Mr. Usman Ali", avatar: "https://i.pravatar.cc/150?img=9",
    teacherId: "TCH-2024-005", subject: "Computer Science",
    totalDays: 120, presentDays: 110, absentDays: 7, lateDays: 3, attendancePercentage: 92,
    monthlyData: makeMonthly([18,19,17,19,17,20],[2,1,2,1,2,0],[0,1,1,0,1,0]),
    dailyRecords: makeDaily([2,10,23],[7,18,29],[]),
  },
  {
    id: "T006", name: "Ms. Rabia Zahid", avatar: "https://i.pravatar.cc/150?img=58",
    teacherId: "TCH-2024-006", subject: "Islamiat",
    totalDays: 120, presentDays: 117, absentDays: 2, lateDays: 1, attendancePercentage: 98,
    monthlyData: makeMonthly([20,20,19,20,19,19],[0,0,1,0,1,0],[0,0,0,1,0,0]),
    dailyRecords: makeDaily([13],[22],[]),
  },
  {
    id: "T007", name: "Mr. Bilal Hussain", avatar: "https://i.pravatar.cc/150?img=6",
    teacherId: "TCH-2024-007", subject: "History",
    totalDays: 120, presentDays: 108, absentDays: 8, lateDays: 4, attendancePercentage: 90,
    monthlyData: makeMonthly([17,18,17,18,16,22],[2,2,2,2,2,0],[1,0,1,0,1,1]),
    dailyRecords: makeDaily([1,9,17,25],[5,12,19,26],[]),
  },
  {
    id: "T008", name: "Dr. Ayesha Siddiqui", avatar: "https://i.pravatar.cc/150?img=59",
    teacherId: "TCH-2024-008", subject: "Biology",
    totalDays: 120, presentDays: 106, absentDays: 11, lateDays: 3, attendancePercentage: 88,
    monthlyData: makeMonthly([17,18,16,18,16,21],[2,2,3,2,2,0],[1,0,1,0,1,0]),
    dailyRecords: makeDaily([4,12,20,28],[9,23],[]),
  },
];

/* ── Today's Attendance ── */
export const TODAY_ATTENDANCE = {
  date: "2025-01-31",
  totalStudents: 15,
  totalTeachers: 8,
  studentsPresent: 12,
  studentsAbsent: 2,
  studentsLate: 1,
  teachersPresent: 7,
  teachersAbsent: 1,
  teachersLate: 0,
  classWiseData: [
    { className: "Grade 8 - A",  total: 3, present: 2, absent: 1, late: 0, percentage: 67 },
    { className: "Grade 9 - A",  total: 2, present: 2, absent: 0, late: 0, percentage: 100 },
    { className: "Grade 9 - B",  total: 2, present: 2, absent: 0, late: 0, percentage: 100 },
    { className: "Grade 10 - A", total: 2, present: 2, absent: 0, late: 0, percentage: 100 },
    { className: "Grade 10 - B", total: 2, present: 1, absent: 1, late: 0, percentage: 50 },
    { className: "Grade 11 - A", total: 2, present: 2, absent: 0, late: 0, percentage: 100 },
    { className: "Grade 11 - B", total: 2, present: 1, absent: 0, late: 1, percentage: 75 },
  ],
};

/* ── Storage helpers ── */
export const seedAttendance = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ students: STUDENTS, teachers: TEACHERS, todayAttendance: TODAY_ATTENDANCE })
    );
  }
};

export const getAttendanceFromStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data
      ? JSON.parse(data)
      : { students: STUDENTS, teachers: TEACHERS, todayAttendance: TODAY_ATTENDANCE };
  } catch {
    return { students: STUDENTS, teachers: TEACHERS, todayAttendance: TODAY_ATTENDANCE };
  }
};

export const saveAttendanceToStorage = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
};
