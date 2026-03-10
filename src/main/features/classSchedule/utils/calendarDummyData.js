/* ═══════════════════════════════════════════════════
   CALENDAR EVENTS
═══════════════════════════════════════════════════ */
const CAL_KEY = "schoolCalendarEvents_v1";

export const EVENT_COLORS = {
  class:    "rgb(82,107,177)",
  exam:     "rgb(232,19,123)",
  event:    "rgb(100,196,178)",
  holiday:  "rgb(247,212,71)",
  meeting:  "rgb(69,198,238)",
  homework: "#8b5cf6",
};

const calendarEvents = [
  /* ── January 2026 ── */
  {
    id: "CAL001", title: "Mathematics – Algebra Review",
    date: "2026-01-19", startTime: "09:00", endTime: "10:30",
    type: "class", subject: "Mathematics", teacher: "Dr. Sarah Johnson",
    room: "Block-B, Room 201", role: ["admin","teacher","student"],
    color: EVENT_COLORS.class,
    description: "Chapter 4 review – Quadratic Equations and their applications.",
  },
  {
    id: "CAL002", title: "Staff Planning Meeting",
    date: "2026-01-21", startTime: "14:00", endTime: "15:30",
    type: "meeting", subject: null, teacher: "Principal Mr. Thomas",
    room: "Conference Room A", role: ["admin","teacher"],
    color: EVENT_COLORS.meeting,
    description: "Term-2 curriculum planning and exam schedule discussion.",
  },
  {
    id: "CAL003", title: "Science Fair Preparation",
    date: "2026-01-27", startTime: "15:00", endTime: "17:00",
    type: "event", subject: null, teacher: "Dr. Emily Brown",
    room: "Science Lab", role: ["admin","teacher","student"],
    color: EVENT_COLORS.event,
    description: "Preparation session for the annual science fair projects.",
  },
  /* ── February 2026 ── */
  {
    id: "CAL004", title: "Physics – Kinematics",
    date: "2026-02-02", startTime: "09:00", endTime: "10:30",
    type: "class", subject: "Physics", teacher: "Prof. John Smith",
    room: "Block-C, Room 305", role: ["admin","teacher","student"],
    color: EVENT_COLORS.class,
    description: "Newton's Laws of Motion and their real-world applications.",
  },
  {
    id: "CAL005", title: "Department Heads Meeting",
    date: "2026-02-02", startTime: "14:00", endTime: "15:00",
    type: "meeting", subject: null, teacher: "Principal Mr. Thomas",
    room: "Admin Block, Office 1", role: ["admin","teacher"],
    color: EVENT_COLORS.meeting,
    description: "Monthly department heads coordination and progress review.",
  },
  {
    id: "CAL006", title: "English Literature",
    date: "2026-02-03", startTime: "11:00", endTime: "12:30",
    type: "class", subject: "English", teacher: "Ms. Lisa Anderson",
    room: "Block-A, Room 102", role: ["admin","teacher","student"],
    color: EVENT_COLORS.class,
    description: "Shakespeare – A Midsummer Night's Dream character analysis.",
  },
  {
    id: "CAL007", title: "Chemistry Lab Session",
    date: "2026-02-05", startTime: "09:30", endTime: "11:00",
    type: "class", subject: "Chemistry", teacher: "Dr. Emily Brown",
    room: "Chemistry Lab-1", role: ["admin","teacher","student"],
    color: EVENT_COLORS.class,
    description: "Acid-Base Titration practical experiment.",
  },
  {
    id: "CAL008", title: "Math Homework Due",
    date: "2026-02-07", startTime: "08:00", endTime: "08:30",
    type: "homework", subject: "Mathematics", teacher: "Dr. Sarah Johnson",
    room: null, role: ["admin","student"],
    color: EVENT_COLORS.homework,
    description: "Submit Exercise 6.1–6.5 (Calculus Introduction).",
  },
  {
    id: "CAL009", title: "History – Colonial Era",
    date: "2026-02-09", startTime: "10:00", endTime: "11:30",
    type: "class", subject: "History", teacher: "Prof. Robert Wilson",
    room: "Block-A, Room 201", role: ["admin","teacher","student"],
    color: EVENT_COLORS.class,
    description: "Colonial period in South Asia – key events and lasting impact.",
  },
  {
    id: "CAL010", title: "Biology – Cell Division",
    date: "2026-02-10", startTime: "09:00", endTime: "10:30",
    type: "class", subject: "Biology", teacher: "Ms. Patricia Lee",
    room: "Biology Lab", role: ["admin","teacher","student"],
    color: EVENT_COLORS.class,
    description: "Mitosis and Meiosis – detailed process study with diagrams.",
  },
  {
    id: "CAL011", title: "Mathematics Mid-Term Exam",
    date: "2026-02-11", startTime: "09:00", endTime: "11:00",
    type: "exam", subject: "Mathematics", teacher: "Dr. Sarah Johnson",
    room: "Block-C, Exam Hall", role: ["admin","teacher","student"],
    color: EVENT_COLORS.exam,
    description: "Mid-term examination covering Chapters 1–6.",
  },
  {
    id: "CAL012", title: "Physics Mid-Term Exam",
    date: "2026-02-12", startTime: "09:00", endTime: "11:00",
    type: "exam", subject: "Physics", teacher: "Prof. John Smith",
    room: "Block-C, Exam Hall", role: ["admin","teacher","student"],
    color: EVENT_COLORS.exam,
    description: "Mid-term exam covering Mechanics and Thermodynamics.",
  },
  {
    id: "CAL013", title: "Cultural Celebration Day",
    date: "2026-02-14", startTime: "14:00", endTime: "16:00",
    type: "event", subject: null, teacher: "Ms. Lisa Anderson",
    room: "School Auditorium", role: ["admin","teacher","student"],
    color: EVENT_COLORS.event,
    description: "Annual school cultural celebration – music, art, and performances.",
  },
  {
    id: "CAL014", title: "Mid-Term Break",
    date: "2026-02-15", startTime: "00:00", endTime: "23:59",
    type: "holiday", subject: null, teacher: null,
    room: null, role: ["admin","teacher","student"],
    color: EVENT_COLORS.holiday,
    description: "Mid-term break – no classes today.",
  },
  {
    id: "CAL015", title: "Parent-Teacher Conference",
    date: "2026-02-16", startTime: "09:00", endTime: "13:00",
    type: "meeting", subject: null, teacher: "All Teachers",
    room: "Main Hall", role: ["admin","teacher"],
    color: EVENT_COLORS.meeting,
    description: "Scheduled parent-teacher meetings to discuss student progress.",
  },
  {
    id: "CAL016", title: "Chemistry Mid-Term Exam",
    date: "2026-02-17", startTime: "09:00", endTime: "11:00",
    type: "exam", subject: "Chemistry", teacher: "Dr. Emily Brown",
    room: "Block-C, Exam Hall", role: ["admin","teacher","student"],
    color: EVENT_COLORS.exam,
    description: "Mid-term exam on Organic Chemistry chapters.",
  },
  {
    id: "CAL017", title: "Computer Science – OOP",
    date: "2026-02-18", startTime: "11:00", endTime: "12:30",
    type: "class", subject: "Computer Science", teacher: "Mr. Kevin Zhang",
    room: "Computer Lab-2", role: ["admin","teacher","student"],
    color: EVENT_COLORS.class,
    description: "Object-Oriented Programming – Classes and Inheritance.",
  },
  {
    id: "CAL018", title: "English Essay Due",
    date: "2026-02-19", startTime: "08:00", endTime: "08:30",
    type: "homework", subject: "English", teacher: "Ms. Lisa Anderson",
    room: null, role: ["admin","student"],
    color: EVENT_COLORS.homework,
    description: "Submit 800-word essay on 'The Role of Technology in Education'.",
  },
  {
    id: "CAL019", title: "English Literature",
    date: "2026-02-20", startTime: "09:00", endTime: "10:30",
    type: "class", subject: "English", teacher: "Ms. Lisa Anderson",
    room: "Block-A, Room 102", role: ["admin","teacher","student"],
    color: EVENT_COLORS.class,
    description: "The Great Gatsby – Chapter analysis and discussion.",
  },
  {
    id: "CAL020", title: "Mathematics – Calculus",
    date: "2026-02-23", startTime: "09:00", endTime: "10:30",
    type: "class", subject: "Mathematics", teacher: "Dr. Sarah Johnson",
    room: "Block-B, Room 201", role: ["admin","teacher","student"],
    color: EVENT_COLORS.class,
    description: "Introduction to derivatives and differentiation rules.",
  },
  {
    id: "CAL021", title: "Annual Science Fair",
    date: "2026-02-23", startTime: "13:00", endTime: "17:00",
    type: "event", subject: null, teacher: "Dr. Emily Brown",
    room: "School Grounds", role: ["admin","teacher","student"],
    color: EVENT_COLORS.event,
    description: "Annual Science Fair – students present their research projects.",
  },
  {
    id: "CAL022", title: "Board of Directors Meeting",
    date: "2026-02-24", startTime: "10:00", endTime: "12:00",
    type: "meeting", subject: null, teacher: "Principal Mr. Thomas",
    room: "Boardroom", role: ["admin"],
    color: EVENT_COLORS.meeting,
    description: "Quarterly board meeting – budget review and policy discussion.",
  },
  {
    id: "CAL023", title: "Physics – Electromagnetism",
    date: "2026-02-25", startTime: "09:00", endTime: "10:30",
    type: "class", subject: "Physics", teacher: "Prof. John Smith",
    room: "Block-C, Room 305", role: ["admin","teacher","student"],
    color: EVENT_COLORS.class,
    description: "Faraday's Law and electromagnetic induction concepts.",
  },
  {
    id: "CAL024", title: "Annual Sports Day",
    date: "2026-02-26", startTime: "08:00", endTime: "16:00",
    type: "event", subject: null, teacher: "Mr. David Coach",
    room: "Sports Ground", role: ["admin","teacher","student"],
    color: EVENT_COLORS.event,
    description: "Annual Sports Day – track, field, and team sports competitions.",
  },
  {
    id: "CAL025", title: "History Assignment Due",
    date: "2026-02-27", startTime: "08:00", endTime: "08:30",
    type: "homework", subject: "History", teacher: "Prof. Robert Wilson",
    room: null, role: ["admin","student"],
    color: EVENT_COLORS.homework,
    description: "Research paper on Industrial Revolution – minimum 5 pages.",
  },
  {
    id: "CAL026", title: "Mathematics Assignment Due",
    date: "2026-02-28", startTime: "08:00", endTime: "08:30",
    type: "homework", subject: "Mathematics", teacher: "Dr. Sarah Johnson",
    room: null, role: ["admin","student"],
    color: EVENT_COLORS.homework,
    description: "Complete Integration problems – Exercise 7.1 to 7.8.",
  },
  /* ── March 2026 ── */
  {
    id: "CAL027", title: "Mathematics – Integration",
    date: "2026-03-02", startTime: "09:00", endTime: "10:30",
    type: "class", subject: "Mathematics", teacher: "Dr. Sarah Johnson",
    room: "Block-B, Room 201", role: ["admin","teacher","student"],
    color: EVENT_COLORS.class,
    description: "Integration by substitution and integration by parts.",
  },
  {
    id: "CAL028", title: "Chemistry – Organic Compounds",
    date: "2026-03-04", startTime: "09:30", endTime: "11:00",
    type: "class", subject: "Chemistry", teacher: "Dr. Emily Brown",
    room: "Chemistry Lab-1", role: ["admin","teacher","student"],
    color: EVENT_COLORS.class,
    description: "Hydrocarbons and functional groups in organic chemistry.",
  },
  {
    id: "CAL029", title: "Final Exam Schedule Meeting",
    date: "2026-03-06", startTime: "14:00", endTime: "15:30",
    type: "meeting", subject: null, teacher: "Principal Mr. Thomas",
    room: "Conference Room A", role: ["admin","teacher"],
    color: EVENT_COLORS.meeting,
    description: "Finalize the timetable for end-of-term examinations.",
  },
  {
    id: "CAL030", title: "Mathematics Final Exam",
    date: "2026-03-16", startTime: "09:00", endTime: "12:00",
    type: "exam", subject: "Mathematics", teacher: "Dr. Sarah Johnson",
    room: "Block-C, Exam Hall", role: ["admin","teacher","student"],
    color: EVENT_COLORS.exam,
    description: "Final term examination – all chapters covered this term.",
  },
  {
    id: "CAL031", title: "Spring Break Begins",
    date: "2026-03-20", startTime: "00:00", endTime: "23:59",
    type: "holiday", subject: null, teacher: null,
    room: null, role: ["admin","teacher","student"],
    color: EVENT_COLORS.holiday,
    description: "Spring break begins – school resumes March 30.",
  },
];

export const seedCalendar = () => {
  if (!localStorage.getItem(CAL_KEY))
    localStorage.setItem(CAL_KEY, JSON.stringify(calendarEvents));
};
export const getCalendarEventsFromStorage = () => {
  try { const r = localStorage.getItem(CAL_KEY); return r ? JSON.parse(r) : calendarEvents; }
  catch { return calendarEvents; }
};
export const saveCalendarEventsToStorage = (events) => {
  try { localStorage.setItem(CAL_KEY, JSON.stringify(events)); } catch {}
};

/* ═══════════════════════════════════════════════════
   SCHEDULE ITEMS
═══════════════════════════════════════════════════ */
const SCH_KEY = "schoolScheduleItems_v1";

export const scheduleItems = [
  /* ── Past ── */
  {
    id: "SCH001",
    title: "Term-1 Kick-off Meeting",
    date: "2026-01-05", startTime: "09:00", endTime: "10:30",
    type: "meeting", scope: "team",
    description: "Kick-off meeting for Term-1 covering academic goals, teacher assignments, and resource allocation for the new semester.",
    tags: ["admin", "planning", "term-1"],
    members: [
      { id: "M1", name: "Mr. Thomas",     role: "Principal",    avatar: null },
      { id: "M2", name: "Dr. Sarah J.",   role: "Math Teacher", avatar: null },
      { id: "M3", name: "Prof. J. Smith", role: "Physics Head", avatar: null },
    ],
    attachments: [
      { id: "A1", name: "Term-1 Agenda.pdf",     size: "124 KB", type: "pdf" },
      { id: "A2", name: "Resource Allocation.xlsx", size: "88 KB", type: "xlsx" },
    ],
    activityLog: [
      { id: "L1", user: "Mr. Thomas",   action: "created this schedule",         time: "2026-01-02 10:00" },
      { id: "L2", user: "Dr. Sarah J.", action: "accepted the invite",            time: "2026-01-03 08:45" },
      { id: "L3", user: "Mr. Thomas",   action: "uploaded Term-1 Agenda.pdf",    time: "2026-01-04 16:30" },
    ],
    comments: [],
    color: "rgb(69,198,238)",
  },
  {
    id: "SCH002",
    title: "Science Lab Orientation",
    date: "2026-01-12", startTime: "10:00", endTime: "11:30",
    type: "event", scope: "team",
    description: "Orientation session for new students on lab safety protocols, equipment usage, and experimental guidelines.",
    tags: ["science", "students", "orientation"],
    members: [
      { id: "M1", name: "Dr. Emily Brown",  role: "Chemistry", avatar: null },
      { id: "M4", name: "Ms. Patricia Lee", role: "Biology",   avatar: null },
    ],
    attachments: [
      { id: "A3", name: "Lab Safety Manual.pdf", size: "2.1 MB", type: "pdf" },
    ],
    activityLog: [
      { id: "L4", user: "Dr. Emily Brown", action: "created this schedule",            time: "2026-01-08 09:00" },
      { id: "L5", user: "Dr. Emily Brown", action: "uploaded Lab Safety Manual.pdf",   time: "2026-01-10 14:00" },
    ],
    comments: [
      { id: "C1", user: "Ms. Patricia Lee", text: "Should we include microscope usage?", time: "2026-01-11 11:00" },
    ],
    color: "rgb(100,196,178)",
  },
  {
    id: "SCH003",
    title: "Mid-Term Exam Preparation",
    date: "2026-02-08", startTime: "14:00", endTime: "16:00",
    type: "exam", scope: "my",
    description: "Preparation and revision session before mid-term exams. Focus on key topics across Mathematics, Physics, and Chemistry.",
    tags: ["exam", "revision", "mid-term"],
    members: [
      { id: "M2", name: "Dr. Sarah J.",   role: "Math",    avatar: null },
      { id: "M3", name: "Prof. J. Smith", role: "Physics", avatar: null },
    ],
    attachments: [
      { id: "A4", name: "Revision Notes – Math.pdf",    size: "540 KB", type: "pdf"  },
      { id: "A5", name: "Physics Formula Sheet.pdf",     size: "210 KB", type: "pdf"  },
      { id: "A6", name: "Past Papers Bundle.zip",        size: "4.8 MB", type: "zip"  },
    ],
    activityLog: [
      { id: "L6", user: "Dr. Sarah J.",   action: "created this schedule",                   time: "2026-02-01 08:00" },
      { id: "L7", user: "Prof. J. Smith", action: "added Physics Formula Sheet.pdf",         time: "2026-02-05 13:00" },
      { id: "L8", user: "Dr. Sarah J.",   action: "added Past Papers Bundle.zip",            time: "2026-02-06 17:00" },
    ],
    comments: [
      { id: "C2", user: "Prof. J. Smith", text: "I'll cover thermodynamics in the last 30 min.", time: "2026-02-07 09:00" },
    ],
    color: "rgb(232,19,123)",
  },
  /* ── Today (2026-02-24) ── */
  {
    id: "SCH004",
    title: "Board of Directors Q1 Review",
    date: "2026-02-24", startTime: "10:00", endTime: "12:00",
    type: "meeting", scope: "my",
    description: "Quarterly review with the Board of Directors covering Q1 budget utilization, academic performance KPIs, and infrastructure progress.",
    tags: ["board", "q1-review", "admin"],
    members: [
      { id: "M1", name: "Mr. Thomas",    role: "Principal",   avatar: null },
      { id: "M5", name: "Ms. Clark",     role: "Finance Head", avatar: null },
      { id: "M6", name: "Mr. Harrison",  role: "Board Member", avatar: null },
    ],
    attachments: [
      { id: "A7", name: "Q1 Report 2026.pdf",      size: "1.8 MB", type: "pdf"  },
      { id: "A8", name: "Budget Summary.xlsx",      size: "320 KB", type: "xlsx" },
    ],
    activityLog: [
      { id: "L9",  user: "Mr. Thomas",   action: "created this schedule",           time: "2026-02-18 10:00" },
      { id: "L10", user: "Ms. Clark",    action: "uploaded Q1 Report 2026.pdf",     time: "2026-02-22 15:00" },
      { id: "L11", user: "Mr. Harrison", action: "accepted the invite",             time: "2026-02-23 09:00" },
    ],
    comments: [
      { id: "C3", user: "Ms. Clark", text: "Slide 12 has updated infrastructure figures.", time: "2026-02-23 16:00" },
    ],
    color: "rgb(69,198,238)",
  },
  {
    id: "SCH005",
    title: "New Teacher Interview – CS Department",
    date: "2026-02-24", startTime: "14:00", endTime: "15:30",
    type: "interview", scope: "my",
    description: "Interview panel for shortlisted candidates applying for the Computer Science teaching position. Panel includes HOD and Principal.",
    tags: ["hiring", "interview", "cs-dept"],
    members: [
      { id: "M1", name: "Mr. Thomas",    role: "Principal", avatar: null },
      { id: "M7", name: "Mr. Kevin Z.",  role: "CS HOD",    avatar: null },
    ],
    attachments: [
      { id: "A9",  name: "Candidate CVs.zip",         size: "3.2 MB", type: "zip" },
      { id: "A10", name: "Interview Questions.docx",   size: "45 KB",  type: "docx" },
    ],
    activityLog: [
      { id: "L12", user: "Mr. Thomas",  action: "scheduled the interview panel",         time: "2026-02-20 11:00" },
      { id: "L13", user: "Mr. Kevin Z.", action: "uploaded Interview Questions.docx",   time: "2026-02-23 10:30" },
    ],
    comments: [],
    color: "rgb(82,107,177)",
  },
  {
    id: "SCH006",
    title: "Student Council Meeting",
    date: "2026-02-24", startTime: "15:30", endTime: "16:30",
    type: "meeting", scope: "team",
    description: "Monthly student council meeting to discuss upcoming school events, student welfare concerns, and feedback on academic programs.",
    tags: ["students", "council", "monthly"],
    members: [
      { id: "M8",  name: "Ali Hassan",   role: "President",     avatar: null },
      { id: "M9",  name: "Sara Malik",   role: "Vice President", avatar: null },
      { id: "M10", name: "Usman Tariq",  role: "Secretary",     avatar: null },
    ],
    attachments: [],
    activityLog: [
      { id: "L14", user: "Ali Hassan", action: "created this schedule", time: "2026-02-21 14:00" },
    ],
    comments: [
      { id: "C4", user: "Sara Malik",  text: "Agenda includes sports day feedback – please come prepared.", time: "2026-02-23 20:00" },
    ],
    color: "rgb(100,196,178)",
  },
  /* ── Upcoming ── */
  {
    id: "SCH007",
    title: "Physics Final Exam",
    date: "2026-02-25", startTime: "09:00", endTime: "11:00",
    type: "exam", scope: "my",
    description: "Final term examination for Physics covering Mechanics, Thermodynamics, Waves, and Electromagnetism.",
    tags: ["exam", "physics", "final"],
    members: [
      { id: "M3", name: "Prof. J. Smith", role: "Physics",  avatar: null },
      { id: "M1", name: "Mr. Thomas",     role: "Invigilator", avatar: null },
    ],
    attachments: [
      { id: "A11", name: "Exam Seating Plan.pdf", size: "380 KB", type: "pdf" },
    ],
    activityLog: [
      { id: "L15", user: "Prof. J. Smith", action: "created this schedule",              time: "2026-02-10 09:00" },
      { id: "L16", user: "Mr. Thomas",     action: "uploaded Exam Seating Plan.pdf",     time: "2026-02-22 11:00" },
    ],
    comments: [],
    color: "rgb(232,19,123)",
  },
  {
    id: "SCH008",
    title: "Annual Sports Day Planning",
    date: "2026-02-26", startTime: "08:00", endTime: "09:30",
    type: "meeting", scope: "team",
    description: "Final planning session for the Annual Sports Day event including event schedule, volunteer assignments, and equipment checklist.",
    tags: ["sports", "planning", "event"],
    members: [
      { id: "M11", name: "Mr. D. Coach",  role: "Sports Head",  avatar: null },
      { id: "M1",  name: "Mr. Thomas",    role: "Principal",    avatar: null },
      { id: "M8",  name: "Ali Hassan",    role: "Stu. Council", avatar: null },
    ],
    attachments: [
      { id: "A12", name: "Sports Day Schedule.pdf",    size: "220 KB", type: "pdf"  },
      { id: "A13", name: "Equipment Checklist.xlsx",   size: "95 KB",  type: "xlsx" },
    ],
    activityLog: [
      { id: "L17", user: "Mr. D. Coach", action: "created this schedule",               time: "2026-02-15 10:00" },
      { id: "L18", user: "Mr. D. Coach", action: "uploaded Sports Day Schedule.pdf",    time: "2026-02-20 12:00" },
    ],
    comments: [
      { id: "C5", user: "Ali Hassan", text: "Student volunteers list has been shared separately.", time: "2026-02-24 08:00" },
    ],
    color: "rgb(100,196,178)",
  },
  {
    id: "SCH009",
    title: "Chemistry – Polymer Lab",
    date: "2026-02-27", startTime: "09:30", endTime: "11:30",
    type: "class", scope: "my",
    description: "Practical lab session on polymer chemistry – synthesis and properties of common polymers. Safety equipment mandatory.",
    tags: ["chemistry", "lab", "practical"],
    members: [
      { id: "M12", name: "Dr. Emily Brown", role: "Chemistry", avatar: null },
    ],
    attachments: [
      { id: "A14", name: "Polymer Lab Guide.pdf", size: "1.1 MB", type: "pdf" },
    ],
    activityLog: [
      { id: "L19", user: "Dr. Emily Brown", action: "created this schedule",             time: "2026-02-17 09:00" },
    ],
    comments: [],
    color: "rgb(82,107,177)",
  },
  {
    id: "SCH010",
    title: "History Assignment Review",
    date: "2026-02-27", startTime: "14:00", endTime: "15:00",
    type: "meeting", scope: "my",
    description: "Review session for the Industrial Revolution research paper submissions. Grading rubric and feedback discussion.",
    tags: ["history", "assignment", "grading"],
    members: [
      { id: "M13", name: "Prof. Robert W.", role: "History", avatar: null },
    ],
    attachments: [],
    activityLog: [
      { id: "L20", user: "Prof. Robert W.", action: "created this schedule", time: "2026-02-23 16:00" },
    ],
    comments: [],
    color: "rgb(247,212,71)",
  },
  {
    id: "SCH011",
    title: "New Teacher Interview – Biology",
    date: "2026-02-28", startTime: "10:00", endTime: "12:00",
    type: "interview", scope: "my",
    description: "Interview session for Biology teacher vacancy. Two candidates shortlisted. Interview to be conducted by HOD and Principal.",
    tags: ["hiring", "interview", "biology"],
    members: [
      { id: "M1",  name: "Mr. Thomas",     role: "Principal",   avatar: null },
      { id: "M4",  name: "Ms. Patricia L.", role: "Biology HOD", avatar: null },
    ],
    attachments: [
      { id: "A15", name: "Biology Candidate CVs.pdf",  size: "2.4 MB", type: "pdf" },
    ],
    activityLog: [
      { id: "L21", user: "Mr. Thomas", action: "scheduled the interview panel", time: "2026-02-21 09:00" },
    ],
    comments: [],
    color: "rgb(82,107,177)",
  },
  {
    id: "SCH012",
    title: "Mathematics – Integration Workshop",
    date: "2026-03-02", startTime: "09:00", endTime: "11:00",
    type: "class", scope: "team",
    description: "Hands-on workshop on integral calculus — substitution, by parts, and definite integrals with real-world problem sets.",
    tags: ["math", "calculus", "workshop"],
    members: [
      { id: "M2",  name: "Dr. Sarah J.",  role: "Math Teacher", avatar: null },
      { id: "M14", name: "Ms. Aisha K.",  role: "Math Assist.", avatar: null },
    ],
    attachments: [
      { id: "A16", name: "Integration Worksheet.pdf", size: "490 KB", type: "pdf" },
    ],
    activityLog: [
      { id: "L22", user: "Dr. Sarah J.", action: "created this schedule",                time: "2026-02-24 10:00" },
    ],
    comments: [],
    color: "rgb(82,107,177)",
  },
  {
    id: "SCH013",
    title: "Staff Wellness Session",
    date: "2026-03-04", startTime: "13:00", endTime: "14:30",
    type: "event", scope: "team",
    description: "Monthly staff wellness and mindfulness session organized by the HR department. Participation encouraged for all teaching staff.",
    tags: ["wellness", "staff", "hr"],
    members: [
      { id: "M15", name: "Ms. Hina Raza",  role: "HR Manager",  avatar: null },
      { id: "M1",  name: "Mr. Thomas",     role: "Principal",   avatar: null },
    ],
    attachments: [
      { id: "A17", name: "Wellness Agenda.pdf", size: "150 KB", type: "pdf" },
    ],
    activityLog: [
      { id: "L23", user: "Ms. Hina Raza", action: "created this schedule", time: "2026-02-24 11:00" },
    ],
    comments: [
      { id: "C6", user: "Mr. Thomas", text: "Please confirm attendance by March 2.", time: "2026-02-24 14:00" },
    ],
    color: "rgb(100,196,178)",
  },
  {
    id: "SCH014",
    title: "Final Exam Timetable Finalisation",
    date: "2026-03-06", startTime: "14:00", endTime: "15:30",
    type: "meeting", scope: "team",
    description: "Department heads meeting to finalize the end-of-term examination timetable, hall assignments, and invigilation duties.",
    tags: ["exams", "planning", "final"],
    members: [
      { id: "M1",  name: "Mr. Thomas",     role: "Principal",  avatar: null },
      { id: "M2",  name: "Dr. Sarah J.",   role: "Math HOD",   avatar: null },
      { id: "M3",  name: "Prof. J. Smith", role: "Physics HOD", avatar: null },
      { id: "M12", name: "Dr. Emily B.",   role: "Chem HOD",   avatar: null },
    ],
    attachments: [
      { id: "A18", name: "Draft Timetable.pdf",        size: "680 KB", type: "pdf"  },
      { id: "A19", name: "Hall Capacity Sheet.xlsx",   size: "110 KB", type: "xlsx" },
    ],
    activityLog: [
      { id: "L24", user: "Mr. Thomas",   action: "created this schedule",              time: "2026-02-24 09:00" },
      { id: "L25", user: "Dr. Sarah J.", action: "uploaded Draft Timetable.pdf",       time: "2026-02-24 13:00" },
    ],
    comments: [
      { id: "C7", user: "Prof. J. Smith", text: "Physics exam on March 17 works for us.", time: "2026-02-24 15:00" },
    ],
    color: "rgb(69,198,238)",
  },
  {
    id: "SCH015",
    title: "Mathematics Final Examination",
    date: "2026-03-16", startTime: "09:00", endTime: "12:00",
    type: "exam", scope: "my",
    description: "End-of-term Mathematics examination. Topics include Algebra, Calculus, and Trigonometry. Closed book. Calculators permitted.",
    tags: ["math", "final-exam", "term-end"],
    members: [
      { id: "M2", name: "Dr. Sarah J.",  role: "Examiner",   avatar: null },
      { id: "M1", name: "Mr. Thomas",    role: "Invigilator", avatar: null },
    ],
    attachments: [
      { id: "A20", name: "Mathematics Paper Draft.pdf", size: "820 KB", type: "pdf"  },
      { id: "A21", name: "Marking Scheme.pdf",          size: "195 KB", type: "pdf"  },
    ],
    activityLog: [
      { id: "L26", user: "Dr. Sarah J.", action: "created this schedule",               time: "2026-02-24 09:30" },
      { id: "L27", user: "Dr. Sarah J.", action: "uploaded Mathematics Paper Draft.pdf", time: "2026-02-24 14:00" },
    ],
    comments: [],
    color: "rgb(232,19,123)",
  },
];

export const seedSchedules = () => {
  if (!localStorage.getItem(SCH_KEY))
    localStorage.setItem(SCH_KEY, JSON.stringify(scheduleItems));
};
export const getSchedulesFromStorage = () => {
  try { const r = localStorage.getItem(SCH_KEY); return r ? JSON.parse(r) : scheduleItems; }
  catch { return scheduleItems; }
};
export const saveSchedulesToStorage = (items) => {
  try { localStorage.setItem(SCH_KEY, JSON.stringify(items)); } catch {}
};

export default calendarEvents;
