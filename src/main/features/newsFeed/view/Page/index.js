import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Button,
  Modal,
  Divider,
  Tooltip,
  Card,
} from "antd";
import {
  FileTextOutlined,
  PictureOutlined,
  BarChartOutlined,
  PaperClipOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import NewsFeedHeader from "./header";
import NewsFeedComposer from "./composer";
import NewsFeedListing from "./Listing";
import {
  TableContainer,
  ContBody,
} from "../../../../sharedComponents/MainFlexContainer";
import {
  seedPosts,
  getPostsFromStorage,
  savePostsToStorage,
  CURRENT_USER,
} from "../../utils/newsFeedDummyData";
import { setPosts } from "../../store/newsFeedSlice";

/* ── Quick-type definitions for the compose bar ── */
const QUICK_TYPES = [
  {
    key: "text",
    label: "Text",
    icon: <FileTextOutlined />,
    color: "var(--color-blue)",
  },
  {
    key: "photo",
    label: "Photo",
    icon: <PictureOutlined />,
    color: "#22c55e",
  },
  {
    key: "poll",
    label: "Poll",
    icon: <BarChartOutlined />,
    color: "#f59e0b",
  },
  {
    key: "document",
    label: "Document",
    icon: <PaperClipOutlined />,
    color: "#8b5cf6",
  },
];

/* ── Scheduled classes for right panel ── */
const SCHEDULED_CLASSES = [
  { id: 1, subject: "Mathematics",      teacher: "Mr. Johnson",   time: "8:00 AM",  duration: "45 min", color: "#3b82f6" },
  { id: 2, subject: "Science",          teacher: "Ms. Rodriguez", time: "9:00 AM",  duration: "60 min", color: "#22c55e" },
  { id: 3, subject: "English",          teacher: "Mrs. Thompson", time: "10:30 AM", duration: "45 min", color: "#ef4444" },
  { id: 4, subject: "History",          teacher: "Mr. Williams",  time: "11:30 AM", duration: "45 min", color: "#8b5cf6" },
  { id: 5, subject: "Physics",          teacher: "Dr. Chen",      time: "1:00 PM",  duration: "60 min", color: "#f97316" },
  { id: 6, subject: "Art",              teacher: "Ms. Davis",     time: "2:00 PM",  duration: "30 min", color: "#ec4899" },
  { id: 7, subject: "Computer Science", teacher: "Mr. Patel",     time: "3:30 PM",  duration: "45 min", color: "#6366f1" },
];

/* ── Today's date card ── */
const TodayCard = () => {
  const now = new Date();
  const dayName = now.toLocaleDateString("en-US", { weekday: "long" });
  const monthYear = now.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  return (
    <Card
      bordered={false}
      className="shadow-sm rounded-xl mb-4 border border-gray-100"
      styles={{ body: { padding: "16px" } }}
    >
      <div className="text-center">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
          Today
        </div>
        <div
          className="text-4xl font-bold leading-none mb-1"
          style={{ color: "var(--color-blue)" }}
        >
          {now.getDate()}
        </div>
        <div className="text-sm font-semibold text-gray-700 mt-1">
          {dayName}
        </div>
        <div className="text-xs text-gray-400 mt-0.5">{monthYear}</div>
      </div>
    </Card>
  );
};

/* ── Scheduled Classes card ── */
const ScheduledClassesCard = () => (
  <Card
    bordered={false}
    className="shadow-sm rounded-xl border border-gray-100"
    title={
      <div className="flex items-center gap-2">
        <ScheduleOutlined style={{ color: "var(--color-blue)" }} />
        <span className="text-sm font-semibold text-gray-700">
          Scheduled Classes
        </span>
      </div>
    }
    styles={{ body: { padding: "8px 0 4px" } }}
  >
    <div className="flex flex-col">
      {SCHEDULED_CLASSES.map((cls, i) => (
        <div
          key={cls.id}
          className={`flex items-center gap-0 px-3 py-2.5 hover:bg-gray-50 transition-colors cursor-pointer ${
            i < SCHEDULED_CLASSES.length - 1 ? "border-b border-gray-100" : ""
          }`}
        >
          {/* Colored left border strip */}
          <div
            className="w-1 self-stretch rounded-full mr-3 shrink-0"
            style={{ backgroundColor: cls.color }}
          />

          {/* Subject + teacher */}
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-gray-800 truncate leading-tight">
              {cls.subject}
            </div>
            <div className="text-xs text-gray-400 mt-0.5 truncate">
              {cls.teacher}
            </div>
          </div>

          {/* Time + duration */}
          <div className="text-right shrink-0 ml-2">
            <div className="text-xs font-medium text-gray-700">{cls.time}</div>
            <div className="text-[11px] text-gray-400 mt-0.5">{cls.duration}</div>
          </div>
        </div>
      ))}
    </div>
  </Card>
);

/* ── Right panel (sticky) ── */
const RightPanel = () => (
  <div className="sticky top-4">
    <TodayCard />
    <ScheduledClassesCard />
  </div>
);

/* ── Facebook-style compose bar ── */
const ComposeBar = ({ onOpen }) => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 px-5 py-4 mb-4">
    {/* Row 1 — avatar + clickable prompt + icon buttons */}
    <div className="flex items-center gap-3">
      <Avatar src={CURRENT_USER.avatar} size={40} />
      <div
        className="flex-1 bg-gray-100 hover:bg-gray-200 transition-colors rounded-full px-4 py-2.5 cursor-pointer text-gray-400 text-sm select-none"
        onClick={() => onOpen("text")}
      >
        What's on your mind, {CURRENT_USER.name.split(" ")[0]}?
      </div>

      {/* Row 1 icon buttons — keep individual colors for visual distinction */}
      <div className="flex items-center gap-0.5">
        {QUICK_TYPES.map(({ key, label, icon, color }) => (
          <Tooltip key={key} title={label} placement="top">
            <Button
              type="text"
              size="small"
              onClick={() => onOpen(key)}
              className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100"
              icon={
                <span style={{ color, fontSize: 17, lineHeight: 1 }}>
                  {icon}
                </span>
              }
            />
          </Tooltip>
        ))}
      </div>
    </div>

    <Divider className="my-3" />

    {/* Row 2 — labelled type buttons, gray text */}
    <div className="flex">
      {QUICK_TYPES.map(({ key, label, icon, color }) => (
        <button
          key={key}
          type="button"
          onClick={() => onOpen(key)}
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium text-gray-500 hover:text-gray-600"
        >
          <span style={{ color, fontSize: 16 }}>{icon}</span>
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  </div>
);

/* ── Page ── */
const NewsFeedPage = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.newsFeed.posts);

  const [modal, setModal] = useState({ open: false, postType: "text" });
  const [activeFilter, setActiveFilter] = useState("posts");

  const filteredPosts = useMemo(() => {
    const sorted = [...posts].sort((a, b) => b.createdAt - a.createdAt);
    if (activeFilter === "posts" || activeFilter === "tagged") return sorted;
    const typeMap = { photos: "photo", polls: "poll", documents: "document" };
    return sorted.filter((p) => p.postType === typeMap[activeFilter]);
  }, [posts, activeFilter]);

  const openModal = (postType = "text") =>
    setModal({ open: true, postType });

  const closeModal = () =>
    setModal((prev) => ({ ...prev, open: false }));

  /* Load from localStorage on mount */
  useEffect(() => {
    seedPosts();
    const stored = getPostsFromStorage();
    dispatch(setPosts(stored));
  }, [dispatch]);

  /* Persist to localStorage whenever posts change in Redux */
  useEffect(() => {
    if (posts.length > 0) {
      savePostsToStorage(posts);
    }
  }, [posts]);

  return (
    <TableContainer>
      <NewsFeedHeader activeFilter={activeFilter} onChange={setActiveFilter} />

      <ContBody style={{ overflowY: "hidden", paddingBottom: 0 }}>
        {/* 3-column layout: center feed + right panel — only posts scroll */}
        <div className="flex gap-5 w-full px-4 h-full overflow-hidden">
          {/* Center column — flex column, only posts area scrolls */}
          <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
            <div className="shrink-0">
              <ComposeBar onOpen={openModal} />
            </div>
            <div className="flex-1 overflow-y-auto no-scrollbar pb-4 min-h-0">
              <NewsFeedListing posts={filteredPosts} />
            </div>
          </div>

          {/* Right panel — fixed 280px, scrolls independently */}
          <div className="w-[280px] shrink-0 hidden lg:block overflow-y-auto no-scrollbar pb-4">
            <RightPanel />
          </div>
        </div>

        {/* Composer modal */}
        <Modal
          open={modal.open}
          onCancel={closeModal}
          footer={null}
          width={580}
          destroyOnClose
          title={
            <div className="flex items-center gap-3 py-1">
              <Avatar src={CURRENT_USER.avatar} size={38} />
              <div>
                <div className="font-semibold text-gray-900 leading-tight">
                  {CURRENT_USER.name}
                </div>
                <div className="text-xs text-gray-400 font-normal leading-tight mt-0.5">
                  Create Post
                </div>
              </div>
            </div>
          }
        >
          <NewsFeedComposer
            initialPostType={modal.postType}
            onClose={closeModal}
          />
        </Modal>
      </ContBody>
    </TableContainer>
  );
};

export default NewsFeedPage;
