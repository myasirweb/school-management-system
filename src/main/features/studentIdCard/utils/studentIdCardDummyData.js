const STORAGE_KEY = "student_id_cards";

/* ── Shared timetable (same schedule for all students) ── */
const TIMETABLE = [
  {
    day: "Monday",
    periods: [
      { time: "08:00-08:45", subject: "Mathematics", teacher: "Mr. Ali Hassan", room: "R-201" },
      { time: "08:45-09:30", subject: "English", teacher: "Ms. Sarah Ahmed", room: "R-105" },
      { time: "10:00-10:45", subject: "Physics", teacher: "Dr. Omar Farooq", room: "Lab-301" },
      { time: "10:45-11:30", subject: "Chemistry", teacher: "Ms. Nadia Khan", room: "Lab-302" },
      { time: "12:30-01:15", subject: "History", teacher: "Mr. Bilal Hussain", room: "R-108" },
      { time: "01:15-02:00", subject: "Comp. Science", teacher: "Mr. Usman Ali", room: "Comp.Lab" },
    ],
  },
  {
    day: "Tuesday",
    periods: [
      { time: "08:00-08:45", subject: "English", teacher: "Ms. Sarah Ahmed", room: "R-105" },
      { time: "08:45-09:30", subject: "Mathematics", teacher: "Mr. Ali Hassan", room: "R-201" },
      { time: "10:00-10:45", subject: "Chemistry", teacher: "Ms. Nadia Khan", room: "Lab-302" },
      { time: "10:45-11:30", subject: "Biology", teacher: "Dr. Ayesha Siddiqui", room: "Lab-303" },
      { time: "12:30-01:15", subject: "Urdu", teacher: "Mr. Tariq Mehmood", room: "R-110" },
      { time: "01:15-02:00", subject: "Islamiat", teacher: "Ms. Rabia Zahid", room: "R-102" },
    ],
  },
  {
    day: "Wednesday",
    periods: [
      { time: "08:00-08:45", subject: "Physics", teacher: "Dr. Omar Farooq", room: "Lab-301" },
      { time: "08:45-09:30", subject: "Chemistry", teacher: "Ms. Nadia Khan", room: "Lab-302" },
      { time: "10:00-10:45", subject: "Mathematics", teacher: "Mr. Ali Hassan", room: "R-201" },
      { time: "10:45-11:30", subject: "English", teacher: "Ms. Sarah Ahmed", room: "R-105" },
      { time: "12:30-01:15", subject: "Comp. Science", teacher: "Mr. Usman Ali", room: "Comp.Lab" },
      { time: "01:15-02:00", subject: "Biology", teacher: "Dr. Ayesha Siddiqui", room: "Lab-303" },
    ],
  },
  {
    day: "Thursday",
    periods: [
      { time: "08:00-08:45", subject: "History", teacher: "Mr. Bilal Hussain", room: "R-108" },
      { time: "08:45-09:30", subject: "Urdu", teacher: "Mr. Tariq Mehmood", room: "R-110" },
      { time: "10:00-10:45", subject: "Mathematics", teacher: "Mr. Ali Hassan", room: "R-201" },
      { time: "10:45-11:30", subject: "Physics", teacher: "Dr. Omar Farooq", room: "Lab-301" },
      { time: "12:30-01:15", subject: "English", teacher: "Ms. Sarah Ahmed", room: "R-105" },
      { time: "01:15-02:00", subject: "Chemistry", teacher: "Ms. Nadia Khan", room: "Lab-302" },
    ],
  },
  {
    day: "Friday",
    periods: [
      { time: "08:00-08:45", subject: "Islamiat", teacher: "Ms. Rabia Zahid", room: "R-102" },
      { time: "08:45-09:30", subject: "Physics", teacher: "Dr. Omar Farooq", room: "Lab-301" },
      { time: "10:00-10:45", subject: "Biology", teacher: "Dr. Ayesha Siddiqui", room: "Lab-303" },
      { time: "10:45-11:30", subject: "History", teacher: "Mr. Bilal Hussain", room: "R-108" },
      { time: "12:30-01:15", subject: "Mathematics", teacher: "Mr. Ali Hassan", room: "R-201" },
      { time: "01:15-02:00", subject: "English", teacher: "Ms. Sarah Ahmed", room: "R-105" },
    ],
  },
  {
    day: "Saturday",
    periods: [
      { time: "08:00-08:45", subject: "Biology", teacher: "Dr. Ayesha Siddiqui", room: "Lab-303" },
      { time: "08:45-09:30", subject: "Urdu", teacher: "Mr. Tariq Mehmood", room: "R-110" },
      { time: "10:00-10:45", subject: "Islamiat", teacher: "Ms. Rabia Zahid", room: "R-102" },
      { time: "10:45-11:30", subject: "Comp. Science", teacher: "Mr. Usman Ali", room: "Comp.Lab" },
      { time: "12:30-01:15", subject: "Urdu", teacher: "Mr. Tariq Mehmood", room: "R-110" },
      { time: "01:15-02:00", subject: "Mathematics", teacher: "Mr. Ali Hassan", room: "R-201" },
    ],
  },
];

/* ── Helpers ── */
function makeCourses(mathG, engG, phyG, chemG, csG) {
  return [
    { courseId: "C001", courseName: "Mathematics", teacher: "Mr. Ali Hassan", creditHours: 4, grade: mathG, status: "ongoing" },
    { courseId: "C002", courseName: "English", teacher: "Ms. Sarah Ahmed", creditHours: 3, grade: engG, status: "ongoing" },
    { courseId: "C003", courseName: "Physics", teacher: "Dr. Omar Farooq", creditHours: 4, grade: phyG, status: "ongoing" },
    { courseId: "C004", courseName: "Chemistry", teacher: "Ms. Nadia Khan", creditHours: 4, grade: chemG, status: "ongoing" },
    { courseId: "C005", courseName: "Computer Science", teacher: "Mr. Usman Ali", creditHours: 3, grade: csG, status: "ongoing" },
    { courseId: "C006", courseName: "Islamiat", teacher: "Ms. Rabia Zahid", creditHours: 2, grade: "A", status: "completed" },
  ];
}

function makeAttendance(present, absent, late) {
  const total = present + absent + late;
  const pct = Math.round((present / total) * 100);
  return {
    totalDays: total,
    presentDays: present,
    absentDays: absent,
    lateDays: late,
    attendancePercentage: pct,
    monthlyAttendance: [
      { month: "Aug 2024", present: Math.floor(present / 6),     absent: Math.floor(absent / 6),     late: Math.floor(late / 6) },
      { month: "Sep 2024", present: Math.floor(present / 6) + 1, absent: Math.max(0, Math.floor(absent / 6) - 1), late: Math.floor(late / 6) },
      { month: "Oct 2024", present: Math.floor(present / 6),     absent: Math.floor(absent / 6),     late: Math.floor(late / 6) + 1 },
      { month: "Nov 2024", present: Math.floor(present / 6) + 1, absent: Math.floor(absent / 6),     late: Math.max(0, Math.floor(late / 6) - 1) },
      { month: "Dec 2024", present: Math.max(1, Math.floor(present / 6) - 1), absent: Math.floor(absent / 6) + 1, late: Math.floor(late / 6) },
      { month: "Jan 2025", present: Math.floor(present / 6),     absent: Math.floor(absent / 6),     late: Math.floor(late / 6) },
    ],
  };
}

function makeLeaves(prefix) {
  return [
    { id: `${prefix}-L1`, leaveType: "Sick", fromDate: "12 Sep 2024", toDate: "13 Sep 2024", days: 2, reason: "High fever and flu symptoms", status: "Approved", appliedOn: "12 Sep 2024" },
    { id: `${prefix}-L2`, leaveType: "Casual", fromDate: "28 Oct 2024", toDate: "28 Oct 2024", days: 1, reason: "Family function", status: "Approved", appliedOn: "25 Oct 2024" },
    { id: `${prefix}-L3`, leaveType: "Emergency", fromDate: "05 Nov 2024", toDate: "06 Nov 2024", days: 2, reason: "Family medical emergency", status: "Approved", appliedOn: "05 Nov 2024" },
    { id: `${prefix}-L4`, leaveType: "Study", fromDate: "18 Dec 2024", toDate: "19 Dec 2024", days: 2, reason: "Exam preparation leave", status: "Pending", appliedOn: "16 Dec 2024" },
    { id: `${prefix}-L5`, leaveType: "Sick", fromDate: "08 Jan 2025", toDate: "08 Jan 2025", days: 1, reason: "Dental appointment", status: "Approved", appliedOn: "07 Jan 2025" },
    { id: `${prefix}-L6`, leaveType: "Casual", fromDate: "22 Jan 2025", toDate: "22 Jan 2025", days: 1, reason: "Personal work", status: "Rejected", appliedOn: "20 Jan 2025" },
  ];
}

function makeFees(paid) {
  const total = 120000;
  const pending = total - paid;
  return {
    totalFees: total,
    paidFees: paid,
    pendingFees: pending,
    currency: "PKR",
    feeBreakdown: [
      { feeType: "Tuition Fee Q1",   amount: 45000, dueDate: "01 Sep 2024", status: paid >= 45000 ? "Paid" : "Overdue", paidOn: paid >= 45000 ? "28 Aug 2024" : null },
      { feeType: "Examination Fee",  amount: 15000, dueDate: "01 Oct 2024", status: paid >= 60000 ? "Paid" : "Overdue", paidOn: paid >= 60000 ? "30 Sep 2024" : null },
      { feeType: "Sports & Activity",amount: 10000, dueDate: "01 Nov 2024", status: paid >= 70000 ? "Paid" : "Pending", paidOn: paid >= 70000 ? "30 Oct 2024" : null },
      { feeType: "Library Fee",      amount:  5000, dueDate: "01 Dec 2024", status: paid >= 75000 ? "Paid" : "Pending", paidOn: paid >= 75000 ? "29 Nov 2024" : null },
      { feeType: "Tuition Fee Q2",   amount: 45000, dueDate: "01 Jan 2025", status: paid >= 120000 ? "Paid" : "Pending", paidOn: paid >= 120000 ? "30 Dec 2024" : null },
    ],
  };
}

function makeExams(offsets) {
  const [o1, o2, o3, o4] = offsets;
  const subjects = ["Mathematics", "English", "Physics", "Chemistry", "Computer Science"];
  const sMarks = [100, 100, 100, 100, 100];
  function subjectResults(totalObtained) {
    const avg = totalObtained / 5;
    return subjects.map((n, i) => {
      const m = Math.min(100, Math.round(avg + (i % 2 === 0 ? 3 : -3)));
      const g = m >= 90 ? "A+" : m >= 80 ? "A" : m >= 70 ? "B+" : m >= 60 ? "B" : "C";
      return { subjectName: n, totalMarks: sMarks[i], obtainedMarks: m, grade: g };
    });
  }
  function gradeLabel(pct) {
    return pct >= 90 ? "A+" : pct >= 80 ? "A" : pct >= 70 ? "B+" : pct >= 60 ? "B" : "C";
  }
  return [
    { examName: "Unit Test 1",  date: "15 Oct 2024", totalMarks: 500, obtainedMarks: 400 + o1, percentage: Math.round(((400+o1)/500)*100), grade: gradeLabel(Math.round(((400+o1)/500)*100)), position: 5 - Math.floor(o1/10), subjects: subjectResults(400+o1) },
    { examName: "Mid Term",     date: "20 Nov 2024", totalMarks: 500, obtainedMarks: 400 + o2, percentage: Math.round(((400+o2)/500)*100), grade: gradeLabel(Math.round(((400+o2)/500)*100)), position: 5 - Math.floor(o2/10), subjects: subjectResults(400+o2) },
    { examName: "Unit Test 2",  date: "10 Jan 2025", totalMarks: 500, obtainedMarks: 400 + o3, percentage: Math.round(((400+o3)/500)*100), grade: gradeLabel(Math.round(((400+o3)/500)*100)), position: 5 - Math.floor(o3/10), subjects: subjectResults(400+o3) },
    { examName: "Final Term",   date: "28 Feb 2025", totalMarks: 500, obtainedMarks: 400 + o4, percentage: Math.round(((400+o4)/500)*100), grade: gradeLabel(Math.round(((400+o4)/500)*100)), position: 5 - Math.floor(o4/10), subjects: subjectResults(400+o4) },
  ];
}

/* ── 8 Students ── */
export const STUDENTS = [
  {
    id: "STU-001",
    fullName: "Ahmad Raza Khan",
    studentId: "STU-2024-001",
    profilePhoto: "https://i.pravatar.cc/150?img=11",
    gender: "Male",
    dateOfBirth: "15 Mar 2008",
    age: 16,
    bloodGroup: "B+",
    nationality: "Pakistani",
    religion: "Islam",
    email: "ahmad.khan@school.edu",
    phone: "+92-301-1234567",
    address: "House 12, Street 5, F-7/2",
    city: "Islamabad",
    enrollmentDate: "01 Sep 2020",
    status: "Active",
    className: "Grade 10 - A",
    section: "A",
    rollNumber: "101",
    academicYear: "2024-2025",
    gpa: "3.8",
    grade: "A+",
    courses: makeCourses("A+", "A", "A+", "A", "A+"),
    timetable: TIMETABLE,
    attendance: makeAttendance(108, 8, 4),
    leaves: makeLeaves("STU001"),
    fees: makeFees(90000),
    examResults: makeExams([45, 48, 50, 52]),
    father: { name: "Muhammad Raza Khan", occupation: "Engineer", phone: "+92-301-1111111", email: "m.raza@gmail.com", cnic: "42101-1234567-1", employer: "NESCOM Islamabad" },
    mother: { name: "Sadia Raza", occupation: "Teacher", phone: "+92-301-2222222", email: "sadia.raza@gmail.com", cnic: "42101-7654321-2" },
    guardian: { name: "Muhammad Raza Khan", relation: "Father", phone: "+92-301-1111111", email: "m.raza@gmail.com", address: "House 12, Street 5, F-7/2, Islamabad", isPrimary: true },
  },
  {
    id: "STU-002",
    fullName: "Fatima Noor Ahmed",
    studentId: "STU-2024-002",
    profilePhoto: "https://i.pravatar.cc/150?img=47",
    gender: "Female",
    dateOfBirth: "22 Jul 2008",
    age: 16,
    bloodGroup: "A+",
    nationality: "Pakistani",
    religion: "Islam",
    email: "fatima.ahmed@school.edu",
    phone: "+92-333-2345678",
    address: "Flat 5B, Blue Area",
    city: "Islamabad",
    enrollmentDate: "01 Sep 2020",
    status: "Active",
    className: "Grade 10 - B",
    section: "B",
    rollNumber: "205",
    academicYear: "2024-2025",
    gpa: "3.6",
    grade: "A",
    courses: makeCourses("A", "A+", "A", "A", "B+"),
    timetable: TIMETABLE,
    attendance: makeAttendance(110, 6, 4),
    leaves: makeLeaves("STU002"),
    fees: makeFees(75000),
    examResults: makeExams([40, 42, 44, 46]),
    father: { name: "Tariq Ahmed", occupation: "Banker", phone: "+92-333-3333333", email: "tariq.ahmed@gmail.com", cnic: "42201-2345678-1", employer: "HBL Bank" },
    mother: { name: "Amna Tariq", occupation: "Housewife", phone: "+92-333-4444444", email: "amna.tariq@gmail.com", cnic: "42201-8765432-2" },
    guardian: { name: "Tariq Ahmed", relation: "Father", phone: "+92-333-3333333", email: "tariq.ahmed@gmail.com", address: "Flat 5B, Blue Area, Islamabad", isPrimary: true },
  },
  {
    id: "STU-003",
    fullName: "Muhammad Hassan Ali",
    studentId: "STU-2024-003",
    profilePhoto: "https://i.pravatar.cc/150?img=15",
    gender: "Male",
    dateOfBirth: "08 Nov 2009",
    age: 15,
    bloodGroup: "O+",
    nationality: "Pakistani",
    religion: "Islam",
    email: "hassan.ali@school.edu",
    phone: "+92-321-3456789",
    address: "House 45, G-11/3",
    city: "Islamabad",
    enrollmentDate: "01 Sep 2021",
    status: "Active",
    className: "Grade 9 - A",
    section: "A",
    rollNumber: "301",
    academicYear: "2024-2025",
    gpa: "3.4",
    grade: "A",
    courses: makeCourses("A", "B+", "A", "B+", "A"),
    timetable: TIMETABLE,
    attendance: makeAttendance(105, 10, 5),
    leaves: makeLeaves("STU003"),
    fees: makeFees(90000),
    examResults: makeExams([35, 38, 40, 42]),
    father: { name: "Ali Hassan", occupation: "Doctor", phone: "+92-321-5555555", email: "ali.hassan@gmail.com", cnic: "42301-3456789-1", employer: "PIMS Hospital" },
    mother: { name: "Rukhsana Ali", occupation: "Pharmacist", phone: "+92-321-6666666", email: "rukhsana.ali@gmail.com", cnic: "42301-9876543-2" },
    guardian: { name: "Ali Hassan", relation: "Father", phone: "+92-321-5555555", email: "ali.hassan@gmail.com", address: "House 45, G-11/3, Islamabad", isPrimary: true },
  },
  {
    id: "STU-004",
    fullName: "Ayesha Malik",
    studentId: "STU-2024-004",
    profilePhoto: "https://i.pravatar.cc/150?img=37",
    gender: "Female",
    dateOfBirth: "03 Jan 2008",
    age: 17,
    bloodGroup: "AB+",
    nationality: "Pakistani",
    religion: "Islam",
    email: "ayesha.malik@school.edu",
    phone: "+92-345-4567890",
    address: "House 88, E-7",
    city: "Islamabad",
    enrollmentDate: "01 Sep 2020",
    status: "Active",
    className: "Grade 10 - A",
    section: "A",
    rollNumber: "102",
    academicYear: "2024-2025",
    gpa: "3.9",
    grade: "A+",
    courses: makeCourses("A+", "A+", "A+", "A+", "A"),
    timetable: TIMETABLE,
    attendance: makeAttendance(115, 3, 2),
    leaves: makeLeaves("STU004"),
    fees: makeFees(120000),
    examResults: makeExams([55, 58, 60, 62]),
    father: { name: "Imran Malik", occupation: "Businessman", phone: "+92-345-7777777", email: "imran.malik@gmail.com", cnic: "42401-4567890-1", employer: "Malik Enterprises" },
    mother: { name: "Sana Imran", occupation: "Interior Designer", phone: "+92-345-8888888", email: "sana.imran@gmail.com", cnic: "42401-0123456-2" },
    guardian: { name: "Imran Malik", relation: "Father", phone: "+92-345-7777777", email: "imran.malik@gmail.com", address: "House 88, E-7, Islamabad", isPrimary: true },
  },
  {
    id: "STU-005",
    fullName: "Usman Tariq",
    studentId: "STU-2024-005",
    profilePhoto: "https://i.pravatar.cc/150?img=25",
    gender: "Male",
    dateOfBirth: "19 May 2009",
    age: 15,
    bloodGroup: "B-",
    nationality: "Pakistani",
    religion: "Islam",
    email: "usman.tariq@school.edu",
    phone: "+92-300-5678901",
    address: "House 22, I-8/1",
    city: "Islamabad",
    enrollmentDate: "01 Sep 2021",
    status: "Inactive",
    className: "Grade 9 - B",
    section: "B",
    rollNumber: "402",
    academicYear: "2024-2025",
    gpa: "2.8",
    grade: "B",
    courses: makeCourses("B+", "B", "B", "B+", "B"),
    timetable: TIMETABLE,
    attendance: makeAttendance(90, 22, 8),
    leaves: makeLeaves("STU005"),
    fees: makeFees(45000),
    examResults: makeExams([15, 18, 20, 22]),
    father: { name: "Tariq Usman", occupation: "Contractor", phone: "+92-300-9999999", email: "tariq.usman@gmail.com", cnic: "42501-5678901-1", employer: "Self Employed" },
    mother: { name: "Nazia Tariq", occupation: "Housewife", phone: "+92-300-0000001", email: "nazia.tariq@gmail.com", cnic: "42501-1234560-2" },
    guardian: { name: "Tariq Usman", relation: "Father", phone: "+92-300-9999999", email: "tariq.usman@gmail.com", address: "House 22, I-8/1, Islamabad", isPrimary: true },
  },
  {
    id: "STU-006",
    fullName: "Zara Hussain",
    studentId: "STU-2024-006",
    profilePhoto: "https://i.pravatar.cc/150?img=44",
    gender: "Female",
    dateOfBirth: "11 Sep 2007",
    age: 17,
    bloodGroup: "O-",
    nationality: "Pakistani",
    religion: "Islam",
    email: "zara.hussain@school.edu",
    phone: "+92-311-6789012",
    address: "House 3, Street 12, F-10/2",
    city: "Islamabad",
    enrollmentDate: "01 Sep 2019",
    status: "Active",
    className: "Grade 11 - A",
    section: "A",
    rollNumber: "501",
    academicYear: "2024-2025",
    gpa: "3.7",
    grade: "A",
    courses: makeCourses("A", "A+", "A", "A+", "A"),
    timetable: TIMETABLE,
    attendance: makeAttendance(112, 5, 3),
    leaves: makeLeaves("STU006"),
    fees: makeFees(105000),
    examResults: makeExams([42, 45, 48, 50]),
    father: { name: "Hussain Ahmad", occupation: "Civil Servant", phone: "+92-311-1112222", email: "hussain.ahmad@gmail.com", cnic: "42601-6789012-1", employer: "Federal Government" },
    mother: { name: "Farah Hussain", occupation: "Lecturer", phone: "+92-311-3334444", email: "farah.hussain@gmail.com", cnic: "42601-2109876-2" },
    guardian: { name: "Hussain Ahmad", relation: "Father", phone: "+92-311-1112222", email: "hussain.ahmad@gmail.com", address: "House 3, Street 12, F-10/2, Islamabad", isPrimary: true },
  },
  {
    id: "STU-007",
    fullName: "Bilal Khan Niazi",
    studentId: "STU-2024-007",
    profilePhoto: "https://i.pravatar.cc/150?img=21",
    gender: "Male",
    dateOfBirth: "27 Feb 2010",
    age: 14,
    bloodGroup: "A-",
    nationality: "Pakistani",
    religion: "Islam",
    email: "bilal.niazi@school.edu",
    phone: "+92-322-7890123",
    address: "House 77, G-9/2",
    city: "Islamabad",
    enrollmentDate: "01 Sep 2022",
    status: "Active",
    className: "Grade 8 - A",
    section: "A",
    rollNumber: "601",
    academicYear: "2024-2025",
    gpa: "3.5",
    grade: "A",
    courses: makeCourses("A", "B+", "A+", "A", "B+"),
    timetable: TIMETABLE,
    attendance: makeAttendance(107, 9, 4),
    leaves: makeLeaves("STU007"),
    fees: makeFees(60000),
    examResults: makeExams([38, 40, 43, 45]),
    father: { name: "Khan Niazi", occupation: "Army Officer", phone: "+92-322-5556666", email: "khan.niazi@gmail.com", cnic: "42701-7890123-1", employer: "Pakistan Army" },
    mother: { name: "Mehwish Khan", occupation: "Nutritionist", phone: "+92-322-7778888", email: "mehwish.khan@gmail.com", cnic: "42701-3210987-2" },
    guardian: { name: "Khan Niazi", relation: "Father", phone: "+92-322-5556666", email: "khan.niazi@gmail.com", address: "House 77, G-9/2, Islamabad", isPrimary: true },
  },
  {
    id: "STU-008",
    fullName: "Sana Riaz",
    studentId: "STU-2024-008",
    profilePhoto: "https://i.pravatar.cc/150?img=53",
    gender: "Female",
    dateOfBirth: "14 Jun 2007",
    age: 17,
    bloodGroup: "B+",
    nationality: "Pakistani",
    religion: "Islam",
    email: "sana.riaz@school.edu",
    phone: "+92-344-8901234",
    address: "Flat 7A, Margalla Towers, F-8",
    city: "Islamabad",
    enrollmentDate: "01 Sep 2019",
    status: "Active",
    className: "Grade 11 - B",
    section: "B",
    rollNumber: "602",
    academicYear: "2024-2025",
    gpa: "3.2",
    grade: "B+",
    courses: makeCourses("B+", "A", "B+", "B", "A"),
    timetable: TIMETABLE,
    attendance: makeAttendance(103, 13, 4),
    leaves: makeLeaves("STU008"),
    fees: makeFees(80000),
    examResults: makeExams([28, 30, 33, 35]),
    father: { name: "Riaz Ahmed", occupation: "Accountant", phone: "+92-344-9990000", email: "riaz.ahmed@gmail.com", cnic: "42801-8901234-1", employer: "KPMG Pakistan" },
    mother: { name: "Bushra Riaz", occupation: "Fashion Designer", phone: "+92-344-1112233", email: "bushra.riaz@gmail.com", cnic: "42801-4321098-2" },
    guardian: { name: "Riaz Ahmed", relation: "Father", phone: "+92-344-9990000", email: "riaz.ahmed@gmail.com", address: "Flat 7A, Margalla Towers, F-8, Islamabad", isPrimary: true },
  },
];

/* ── Storage helpers ── */
export const seedStudents = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(STUDENTS));
  }
};

export const getStudentsFromStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : STUDENTS;
  } catch {
    return STUDENTS;
  }
};

export const saveStudentsToStorage = (students) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  } catch {}
};
