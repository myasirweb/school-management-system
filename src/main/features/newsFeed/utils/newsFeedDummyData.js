/* ── Current user (matches dummy login user) ── */
export const CURRENT_USER = {
  id: "USR001",
  name: "Admin User",
  avatar: "https://i.pravatar.cc/150?img=3",
  role: "Admin",
};

/* ── localStorage helpers ── */
const STORAGE_KEY = "sms_newsfeed_posts";

export const seedPosts = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dummyPosts));
  }
};

export const getPostsFromStorage = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : dummyPosts;
};

export const savePostsToStorage = (posts) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
};

/* ── Seed data ── */
const now = Date.now();
const h = 3_600_000;
const d = 86_400_000;

const dummyPosts = [
  {
    id: "POST001",
    authorName: "Mr. Robert Smith",
    authorAvatar: "https://i.pravatar.cc/150?img=11",
    authorRole: "Teacher",
    postType: "text",
    content:
      "Reminder: Mid-term examinations are scheduled for next week. All students must bring their admit cards. Study hard and best of luck to everyone! 📚",
    image: null,
    pollOptions: null,
    documentName: null,
    likes: 24,
    likedByCurrentUser: false,
    comments: [
      {
        id: "CMT001",
        authorName: "Sarah Johnson",
        authorAvatar: "https://i.pravatar.cc/150?img=20",
        text: "Thank you for the reminder, Sir!",
      },
      {
        id: "CMT002",
        authorName: "James Wilson",
        authorAvatar: "https://i.pravatar.cc/150?img=15",
        text: "Will the syllabus be the same as mentioned in the portal?",
      },
    ],
    shares: 8,
    createdAt: now - 1 * h,
  },
  {
    id: "POST002",
    authorName: "Principal David Brown",
    authorAvatar: "https://i.pravatar.cc/150?img=7",
    authorRole: "Admin",
    postType: "photo",
    content:
      "Our students showcased incredible talent at the Annual Science Fair today! Proud of every single participant. 🏆 Keep it up!",
    image: "https://picsum.photos/seed/sciencefair/800/450",
    pollOptions: null,
    documentName: null,
    likes: 67,
    likedByCurrentUser: false,
    comments: [
      {
        id: "CMT003",
        authorName: "Ms. Emily Johnson",
        authorAvatar: "https://i.pravatar.cc/150?img=25",
        text: "The projects were absolutely outstanding this year!",
      },
    ],
    shares: 21,
    createdAt: now - 3 * h,
  },
  {
    id: "POST003",
    authorName: "Ms. Emily Johnson",
    authorAvatar: "https://i.pravatar.cc/150?img=25",
    authorRole: "Teacher",
    postType: "poll",
    content:
      "Which subject do you find most challenging this semester? Share your thoughts so we can arrange extra support sessions.",
    image: null,
    pollOptions: [
      { option: "Mathematics", votes: 45 },
      { option: "Physics", votes: 32 },
      { option: "Chemistry", votes: 28 },
      { option: "English Literature", votes: 15 },
    ],
    documentName: null,
    likes: 39,
    likedByCurrentUser: false,
    comments: [
      {
        id: "CMT004",
        authorName: "Ali Hassan",
        authorAvatar: "https://i.pravatar.cc/150?img=30",
        text: "Definitely Mathematics for me!",
      },
    ],
    shares: 5,
    createdAt: now - 5 * h,
  },
  {
    id: "POST004",
    authorName: "Ms. Sarah Williams",
    authorAvatar: "https://i.pravatar.cc/150?img=27",
    authorRole: "Teacher",
    postType: "document",
    content:
      "Please find attached the updated Class 9 Science syllabus for the upcoming term. Make sure to download and review it before the first session.",
    image: null,
    pollOptions: null,
    documentName: "Class_9_Science_Syllabus_2025.pdf",
    likes: 18,
    likedByCurrentUser: false,
    comments: [],
    shares: 12,
    createdAt: now - 8 * h,
  },
  {
    id: "POST005",
    authorName: "Ahmed Khan",
    authorAvatar: "https://i.pravatar.cc/150?img=33",
    authorRole: "Student",
    postType: "photo",
    content:
      "Amazing day at the Inter-School Sports Meet! Our team brought home the trophy in Cricket. Go Team SMS! 🏏🎉",
    image: "https://picsum.photos/seed/sports2025/800/450",
    pollOptions: null,
    documentName: null,
    likes: 92,
    likedByCurrentUser: false,
    comments: [
      {
        id: "CMT005",
        authorName: "Mr. Robert Smith",
        authorAvatar: "https://i.pravatar.cc/150?img=11",
        text: "Congratulations! Well played team!",
      },
      {
        id: "CMT006",
        authorName: "Zara Ahmed",
        authorAvatar: "https://i.pravatar.cc/150?img=44",
        text: "So proud of our school! 🙌",
      },
    ],
    shares: 35,
    createdAt: now - 1 * d,
  },
  {
    id: "POST006",
    authorName: "Principal David Brown",
    authorAvatar: "https://i.pravatar.cc/150?img=7",
    authorRole: "Admin",
    postType: "poll",
    content:
      "What time slot works best for the upcoming Parent-Teacher meeting? Please vote so we can finalise the schedule.",
    image: null,
    pollOptions: [
      { option: "Saturday Morning (9 AM – 12 PM)", votes: 58 },
      { option: "Saturday Afternoon (2 PM – 5 PM)", votes: 41 },
      { option: "Sunday Morning (10 AM – 1 PM)", votes: 22 },
    ],
    documentName: null,
    likes: 31,
    likedByCurrentUser: false,
    comments: [
      {
        id: "CMT007",
        authorName: "Ms. Sarah Williams",
        authorAvatar: "https://i.pravatar.cc/150?img=27",
        text: "Saturday morning works best for most parents.",
      },
    ],
    shares: 9,
    createdAt: now - 1.5 * d,
  },
  {
    id: "POST007",
    authorName: "Library Admin",
    authorAvatar: "https://i.pravatar.cc/150?img=9",
    authorRole: "Admin",
    postType: "document",
    content:
      "New books have been added to the school library! Download the updated catalog to explore the latest additions across all subjects.",
    image: null,
    pollOptions: null,
    documentName: "Library_New_Arrivals_Feb2025.pdf",
    likes: 22,
    likedByCurrentUser: false,
    comments: [
      {
        id: "CMT008",
        authorName: "Ahmed Khan",
        authorAvatar: "https://i.pravatar.cc/150?img=33",
        text: "Looking forward to checking out the new science books!",
      },
    ],
    shares: 7,
    createdAt: now - 2 * d,
  },
  {
    id: "POST008",
    authorName: "Dr. Michael Brown",
    authorAvatar: "https://i.pravatar.cc/150?img=13",
    authorRole: "Teacher",
    postType: "photo",
    content:
      "Today's Chemistry lab session was a success! Students demonstrated the principles of electrolysis perfectly. Great job, Class X! ⚗️",
    image: "https://picsum.photos/seed/chemlab/800/450",
    pollOptions: null,
    documentName: null,
    likes: 44,
    likedByCurrentUser: false,
    comments: [
      {
        id: "CMT009",
        authorName: "Zara Ahmed",
        authorAvatar: "https://i.pravatar.cc/150?img=44",
        text: "It was such a fun experiment!",
      },
    ],
    shares: 11,
    createdAt: now - 2.5 * d,
  },
  {
    id: "POST009",
    authorName: "Sports Coach",
    authorAvatar: "https://i.pravatar.cc/150?img=5",
    authorRole: "Teacher",
    postType: "text",
    content:
      "Annual Sports Day registration is now OPEN! 🏃‍♂️ Students can register for: 100m Sprint, Long Jump, Shot Put, Relay Race, and Football.\n\nRegister at the PE office before March 5th. Limited spots available!",
    image: null,
    pollOptions: null,
    documentName: null,
    likes: 56,
    likedByCurrentUser: false,
    comments: [
      {
        id: "CMT010",
        authorName: "Ahmed Khan",
        authorAvatar: "https://i.pravatar.cc/150?img=33",
        text: "Registered for Sprint and Relay! Can't wait!",
      },
      {
        id: "CMT011",
        authorName: "Zara Ahmed",
        authorAvatar: "https://i.pravatar.cc/150?img=44",
        text: "Is there a girls' football team this year?",
      },
    ],
    shares: 28,
    createdAt: now - 3 * d,
  },
  {
    id: "POST010",
    authorName: "Ms. Jennifer Davis",
    authorAvatar: "https://i.pravatar.cc/150?img=23",
    authorRole: "Teacher",
    postType: "document",
    content:
      "Attached is the assignment sheet for Chapter 5 – Cell Biology. Due date is March 10th. Please submit in hardcopy to the biology lab.",
    image: null,
    pollOptions: null,
    documentName: "Biology_Assignment_Chapter5.docx",
    likes: 13,
    likedByCurrentUser: false,
    comments: [],
    shares: 4,
    createdAt: now - 4 * d,
  },
];
