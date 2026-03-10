/* ── Current user ── */
export const CURRENT_USER = {
  id: "USR001",
  name: "Admin User",
  avatar: "https://i.pravatar.cc/150?img=3",
  role: "Admin",
};

/* ── localStorage keys ── */
const CONTACTS_KEY    = "sms_messenger_contacts";
const CONVS_KEY       = "sms_messenger_conversations";

/* ── Contacts ── */
export const DUMMY_CONTACTS = [
  {
    id: "C001",
    name: "Mr. Robert Smith",
    avatar: "https://i.pravatar.cc/150?img=11",
    role: "Teacher",
    lastMessage: "Also, could you check the lab booking?",
    lastMessageTime: "10:42",
    unreadCount: 2,
    isOnline: true,
    bio: "Mathematics teacher with 12 years of experience. Passionate about making numbers fun.",
    phoneNumber: "+1 234 567 8901",
    username: "@rsmith",
    mostUsedEmojis: ["😊", "👍", "📚"],
  },
  {
    id: "C002",
    name: "Ms. Emily Johnson",
    avatar: "https://i.pravatar.cc/150?img=25",
    role: "Teacher",
    lastMessage: "Sure, I'll upload the results by 5 PM.",
    lastMessageTime: "11:28",
    unreadCount: 0,
    isOnline: true,
    bio: "Science teacher & lab coordinator. Loves hands-on experiments and curious students.",
    phoneNumber: "+1 234 567 8902",
    username: "@ejohnson",
    mostUsedEmojis: ["🔬", "✅", "🌟"],
  },
  {
    id: "C003",
    name: "Principal David Brown",
    avatar: "https://i.pravatar.cc/150?img=7",
    role: "Admin",
    lastMessage: "Please arrange the board meeting agenda.",
    lastMessageTime: "09:05",
    unreadCount: 5,
    isOnline: false,
    bio: "Principal of Global International School. Focused on academic excellence and student welfare.",
    phoneNumber: "+1 234 567 8903",
    username: "@dbrown",
    mostUsedEmojis: ["📋", "🎯", "🏫"],
  },
  {
    id: "C004",
    name: "Ms. Sarah Williams",
    avatar: "https://i.pravatar.cc/150?img=27",
    role: "Teacher",
    lastMessage: "The updated syllabus has been shared.",
    lastMessageTime: "14:55",
    unreadCount: 0,
    isOnline: true,
    bio: "English & Literature teacher. Believes every student has a story worth telling.",
    phoneNumber: "+1 234 567 8904",
    username: "@swilliams",
    mostUsedEmojis: ["📖", "✏️", "❤️"],
  },
  {
    id: "C005",
    name: "Ahmed Khan",
    avatar: "https://i.pravatar.cc/150?img=33",
    role: "Student",
    lastMessage: "Sir, can I submit the assignment tomorrow?",
    lastMessageTime: "13:15",
    unreadCount: 1,
    isOnline: false,
    bio: "Grade 11 student. Cricket enthusiast and aspiring engineer.",
    phoneNumber: "+1 234 567 8905",
    username: "@akhan",
    mostUsedEmojis: ["🏏", "🙏", "😅"],
  },
  {
    id: "C006",
    name: "Zara Ahmed",
    avatar: "https://i.pravatar.cc/150?img=44",
    role: "Student",
    lastMessage: "Thank you so much! 🙌",
    lastMessageTime: "16:30",
    unreadCount: 0,
    isOnline: true,
    bio: "Grade 12 student. Interested in medicine and community service.",
    phoneNumber: "+1 234 567 8906",
    username: "@zahmed",
    mostUsedEmojis: ["🙌", "💪", "🌸"],
  },
  {
    id: "C007",
    name: "Dr. Michael Brown",
    avatar: "https://i.pravatar.cc/150?img=13",
    role: "Teacher",
    lastMessage: "Chemistry lab is ready for tomorrow.",
    lastMessageTime: "08:10",
    unreadCount: 0,
    isOnline: false,
    bio: "Chemistry & Physics teacher. PhD in Applied Chemistry. Loves making science accessible.",
    phoneNumber: "+1 234 567 8907",
    username: "@mbrown",
    mostUsedEmojis: ["⚗️", "🔭", "💡"],
  },
  {
    id: "C008",
    name: "Ms. Jennifer Davis",
    avatar: "https://i.pravatar.cc/150?img=23",
    role: "Teacher",
    lastMessage: "When is the parent-teacher meeting?",
    lastMessageTime: "15:45",
    unreadCount: 3,
    isOnline: true,
    bio: "Biology teacher and school counselor. Passionate about student mental health and wellness.",
    phoneNumber: "+1 234 567 8908",
    username: "@jdavis",
    mostUsedEmojis: ["🌿", "😊", "📝"],
  },
];

/* ── Conversations (keyed by contactId) ── */
export const DUMMY_CONVERSATIONS = {
  C001: [
    { id: "M001", senderId: "C001", text: "Hello Admin, do you have the mid-term exam schedule ready?", time: "09:50", status: "read",      reaction: null },
    { id: "M002", senderId: "USR001", text: "Yes, I was just finalising it. I'll share the document shortly.", time: "09:52", status: "read", reaction: null },
    { id: "M003", senderId: "C001", text: "Perfect, thank you! The students are asking about it.", time: "09:55", status: "read",      reaction: "👍" },
    { id: "M004", senderId: "USR001", text: "Mid-terms are scheduled for next Monday–Wednesday. Three subjects per day.", time: "10:10", status: "read", reaction: null },
    { id: "M005", senderId: "C001", text: "Great, I'll inform my class. Also, could you check the physics lab booking?", time: "10:40", status: "delivered", reaction: null },
    { id: "M006", senderId: "C001", text: "Also, could you check the lab booking?", time: "10:42", status: "delivered", reaction: null },
  ],
  C002: [
    { id: "M007", senderId: "USR001", text: "Hi Emily, how did the students perform in last week's quiz?", time: "11:00", status: "read",      reaction: null },
    { id: "M008", senderId: "C002", text: "Most did really well! About 80% scored above average.", time: "11:05", status: "read",      reaction: null },
    { id: "M009", senderId: "USR001", text: "That's great to hear. Could you upload the results to the portal?", time: "11:15", status: "read", reaction: null },
    { id: "M010", senderId: "C002", text: "Of course. Should I include detailed question-wise breakdown too?", time: "11:20", status: "read", reaction: null },
    { id: "M011", senderId: "USR001", text: "Yes please, that would be very helpful for the review meeting.", time: "11:25", status: "read", reaction: null },
    { id: "M012", senderId: "C002", text: "Sure, I'll upload the results by 5 PM.", time: "11:28", status: "read",      reaction: null },
  ],
  C003: [
    { id: "M013", senderId: "C003", text: "Good morning. I need to discuss the upcoming board meeting.", time: "08:30", status: "read",      reaction: null },
    { id: "M014", senderId: "USR001", text: "Good morning, Principal. Of course, what do you need?", time: "08:35", status: "read", reaction: null },
    { id: "M015", senderId: "C003", text: "The meeting is on Friday. We need a full attendance and progress report ready.", time: "08:40", status: "read", reaction: null },
    { id: "M016", senderId: "USR001", text: "Understood. I'll prepare the reports by Thursday evening.", time: "08:45", status: "read", reaction: null },
    { id: "M017", senderId: "C003", text: "Also include the budget utilisation summary for Q1.", time: "08:50", status: "read",      reaction: null },
    { id: "M018", senderId: "C003", text: "Please arrange the board meeting agenda.", time: "09:05", status: "delivered", reaction: null },
  ],
  C004: [
    { id: "M019", senderId: "USR001", text: "Hi Sarah, has the new English syllabus been approved?", time: "14:00", status: "read",      reaction: null },
    { id: "M020", senderId: "C004", text: "Yes! The department head signed off on it this morning.", time: "14:10", status: "read",      reaction: null },
    { id: "M021", senderId: "USR001", text: "Wonderful. Please share it with all Grade 9–11 students.", time: "14:30", status: "read", reaction: null },
    { id: "M022", senderId: "C004", text: "Already done — posted it on the notice board and sent the PDF to class group chats.", time: "14:50", status: "read", reaction: "❤️" },
    { id: "M023", senderId: "C004", text: "The updated syllabus has been shared.", time: "14:55", status: "read",      reaction: null },
  ],
  C005: [
    { id: "M024", senderId: "C005", text: "Sir, I couldn't complete the assignment due to football practice yesterday.", time: "13:00", status: "read", reaction: null },
    { id: "M025", senderId: "USR001", text: "Ahmed, assignments need to be submitted on time regardless of other activities.", time: "13:05", status: "read", reaction: null },
    { id: "M026", senderId: "C005", text: "I understand Sir, I'm really sorry. I'll finish it tonight, I promise.", time: "13:10", status: "read", reaction: null },
    { id: "M027", senderId: "C005", text: "Sir, can I submit the assignment tomorrow?", time: "13:15", status: "delivered", reaction: null },
  ],
  C006: [
    { id: "M028", senderId: "USR001", text: "Congratulations Zara! You topped the biology exam this term.", time: "16:10", status: "read",      reaction: null },
    { id: "M029", senderId: "C006", text: "Oh my goodness! Really? I worked so hard for it!", time: "16:15", status: "read",      reaction: null },
    { id: "M030", senderId: "USR001", text: "Yes! Highest score in Grade 12. Well done.", time: "16:20", status: "read",      reaction: null },
    { id: "M031", senderId: "C006", text: "Thank you so much! 🙌", time: "16:30", status: "read",      reaction: null },
  ],
  C007: [
    { id: "M032", senderId: "C007", text: "Good morning. The electrolysis lab equipment has been calibrated.", time: "07:45", status: "read", reaction: null },
    { id: "M033", senderId: "USR001", text: "Great, thank you for setting that up early.", time: "07:50", status: "read", reaction: null },
    { id: "M034", senderId: "C007", text: "Also need to requisition new safety goggles — we're running low.", time: "07:55", status: "read", reaction: null },
    { id: "M035", senderId: "USR001", text: "I'll raise the purchase order today. How many pairs do you need?", time: "08:00", status: "read", reaction: null },
    { id: "M036", senderId: "C007", text: "At least 30 pairs should do. Chemistry lab is ready for tomorrow.", time: "08:10", status: "read", reaction: null },
  ],
  C008: [
    { id: "M037", senderId: "C008", text: "Hi, I wanted to follow up on the student counselling session schedule.", time: "15:10", status: "read", reaction: null },
    { id: "M038", senderId: "USR001", text: "Hi Jennifer. I've blocked Wednesday afternoons for counselling.", time: "15:20", status: "read", reaction: null },
    { id: "M039", senderId: "C008", text: "Perfect. Also, three students need priority sessions this week.", time: "15:30", status: "read", reaction: null },
    { id: "M040", senderId: "USR001", text: "Understood. I'll make sure the room is available.", time: "15:35", status: "read",      reaction: null },
    { id: "M041", senderId: "C008", text: "When is the parent-teacher meeting?", time: "15:45", status: "delivered", reaction: null },
  ],
};

/* ── localStorage helpers ── */
export const seedMessenger = () => {
  if (!localStorage.getItem(CONTACTS_KEY)) {
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(DUMMY_CONTACTS));
  }
  if (!localStorage.getItem(CONVS_KEY)) {
    localStorage.setItem(CONVS_KEY, JSON.stringify(DUMMY_CONVERSATIONS));
  }
};

export const getContactsFromStorage = () => {
  const stored = localStorage.getItem(CONTACTS_KEY);
  return stored ? JSON.parse(stored) : DUMMY_CONTACTS;
};

export const getConversationsFromStorage = () => {
  const stored = localStorage.getItem(CONVS_KEY);
  return stored ? JSON.parse(stored) : DUMMY_CONVERSATIONS;
};

export const saveContactsToStorage = (contacts) => {
  localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
};

export const saveConversationsToStorage = (conversations) => {
  localStorage.setItem(CONVS_KEY, JSON.stringify(conversations));
};
