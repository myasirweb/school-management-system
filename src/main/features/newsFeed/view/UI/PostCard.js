import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Avatar, Button, Tag, Divider, Progress } from "antd";
import {
  LikeOutlined,
  LikeFilled,
  HeartFilled,
  SmileFilled,
  StarFilled,
  FrownFilled,
  FireFilled,
  MessageOutlined,
  ShareAltOutlined,
  FileTextOutlined,
  SendOutlined,
  MoreOutlined,
  SmileOutlined,
  PaperClipOutlined,
} from "@ant-design/icons";
import { setReaction, addComment } from "../../store/newsFeedSlice";
import { CURRENT_USER } from "../../utils/newsFeedDummyData";

/* ── Role tag colors ── */
const ROLE_TAG_COLOR = {
  Teacher: "rgb(100, 196, 178)",
  Student: "rgb(69, 198, 238)",
  Admin:   "rgb(232, 19, 123)",
};

/* ── Reaction definitions ── */
const REACTIONS = [
  { key: "like",  label: "Like",  Icon: LikeFilled,  color: "rgb(82, 107, 177)"  },
  { key: "love",  label: "Love",  Icon: HeartFilled,  color: "rgb(232, 19, 123)"  },
  { key: "haha",  label: "Haha",  Icon: SmileFilled,  color: "rgb(247, 212, 71)"  },
  { key: "wow",   label: "Wow",   Icon: StarFilled,   color: "rgb(69, 198, 238)"  },
  { key: "sad",   label: "Sad",   Icon: FrownFilled,  color: "rgb(247, 212, 71)"  },
  { key: "angry", label: "Angry", Icon: FireFilled,   color: "rgb(232, 19, 123)"  },
];

const timeAgo = (timestamp) => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(timestamp).toLocaleDateString();
};

/* ── Post Card ── */
const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [showReactionPicker, setShowReactionPicker] = useState(false);

  const openTimerRef  = useRef(null);
  const closeTimerRef = useRef(null);

  const totalVotes = post.pollOptions
    ? post.pollOptions.reduce((sum, o) => sum + o.votes, 0)
    : 0;

  const activeReaction = REACTIONS.find((r) => r.key === post.selectedReaction) ?? null;
  const ActiveIcon = activeReaction?.Icon ?? null;

  /* ── Reaction picker hover ── */
  const handleButtonEnter = () => {
    clearTimeout(closeTimerRef.current);
    openTimerRef.current = setTimeout(() => setShowReactionPicker(true), 500);
  };
  const handleButtonLeave = () => {
    clearTimeout(openTimerRef.current);
    closeTimerRef.current = setTimeout(() => setShowReactionPicker(false), 300);
  };
  const handlePickerEnter = () => clearTimeout(closeTimerRef.current);
  const handlePickerLeave = () => {
    clearTimeout(closeTimerRef.current);
    setShowReactionPicker(false);
  };
  const handleReactionClick = (reactionKey) => {
    dispatch(setReaction({ postId: post.id, reactionType: reactionKey }));
    setShowReactionPicker(false);
  };
  const handleLikeClick = () =>
    dispatch(setReaction({ postId: post.id, reactionType: "like" }));

  /* ── Comment ── */
  const handleAddComment = () => {
    const text = commentText.trim();
    if (!text) return;
    dispatch(
      addComment({
        postId: post.id,
        comment: {
          id: `CMT${Date.now()}`,
          authorName: CURRENT_USER.name,
          authorAvatar: CURRENT_USER.avatar,
          text,
        },
      })
    );
    setCommentText("");
  };

  return (
    /* Card: white bg, soft border, lift on hover */
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">

      {/* ── Header ── */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3">
        <Avatar src={post.authorAvatar} size={44} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-gray-900 text-[14px]">
              {post.authorName}
            </span>
            <Tag
              color={ROLE_TAG_COLOR[post.authorRole] || "default"}
              className="text-[10px] leading-none m-0"
            >
              {post.authorRole}
            </Tag>
          </div>
          <div className="text-[11px] text-gray-400 mt-0.5">
            {timeAgo(post.createdAt)}
          </div>
        </div>
        <Button
          type="text"
          icon={<MoreOutlined style={{ fontSize: 17 }} />}
          className="text-gray-300 hover:text-gray-500 hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center shrink-0"
        />
      </div>

      {/* ── Text content ── */}
      <div className="px-5 pb-4">
        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
          {post.content}
        </p>
      </div>

      {/* ── Photo ── */}
      {post.postType === "photo" && post.image && (
        <div className="pb-3 mx-5 rounded-xl overflow-hidden">
          <img
            src={post.image}
            alt="Post"
            className="w-full object-cover max-h-80 rounded-xl"
          />
        </div>
      )}

      {/* ── Poll ── */}
      {post.postType === "poll" && post.pollOptions && (
        <div className="px-5 pb-4 space-y-2.5">
          {post.pollOptions.map((opt, i) => {
            const pct =
              totalVotes > 0
                ? Math.round((opt.votes / totalVotes) * 100)
                : 0;
            return (
              <div key={i}>
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span className="font-medium">{opt.option}</span>
                  <span className="text-gray-400">{pct}%&nbsp;({opt.votes})</span>
                </div>
                <Progress
                  percent={pct}
                  showInfo={false}
                  strokeColor="var(--color-blue)"
                  trailColor="#f1f5f9"
                  size="small"
                />
              </div>
            );
          })}
          <div className="text-[11px] text-gray-400 pt-0.5">{totalVotes} total votes</div>
        </div>
      )}

      {/* ── Document ── */}
      {post.postType === "document" && post.documentName && (
        <div className="px-5 pb-4">
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 cursor-pointer hover:bg-[rgba(82,107,177,0.05)] hover:border-[rgba(82,107,177,0.25)] transition-all duration-150">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: "rgba(82,107,177,0.12)" }}
            >
              <FileTextOutlined style={{ fontSize: 18, color: "var(--color-blue)" }} />
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-800">{post.documentName}</div>
              <div className="text-[11px] text-gray-400 mt-0.5">Click to download</div>
            </div>
          </div>
        </div>
      )}

      {/* ── Like count row — always visible ── */}
      <div className="flex items-center px-5 pb-2">
        <span className="flex items-center gap-1 text-gray-500">
          {ActiveIcon ? (
            <ActiveIcon style={{ fontSize: 15, color: activeReaction.color }} />
          ) : (
            <LikeOutlined style={{ fontSize: 15 }} />
          )}
          <span className="text-xs font-medium">{post.likes}</span>
        </span>
        {post.comments.length > 0 && (
          <button
            type="button"
            className="ml-auto text-gray-400 hover:text-[var(--color-blue)] hover:underline transition-colors cursor-pointer text-[11px]"
            onClick={() => setShowComments((p) => !p)}
          >
            {post.comments.length} comment{post.comments.length !== 1 ? "s" : ""}
          </button>
        )}
      </div>

      <Divider className="my-0" />

      {/* ── Action bar ── */}
      <div className="flex items-center px-2 py-1">

        {/* Like — with reaction picker */}
        <div
          className="flex-1 relative"
          onMouseEnter={handleButtonEnter}
          onMouseLeave={handleButtonLeave}
        >
          {showReactionPicker && (
            <div
              className="reaction-picker absolute bottom-full left-1/2 mb-2 bg-white rounded-full shadow-lg px-2 py-1.5 flex flex-row gap-1 z-50 border border-gray-100"
              onMouseEnter={handlePickerEnter}
              onMouseLeave={handlePickerLeave}
            >
              {REACTIONS.map(({ key, label, Icon, color }) => (
                <button
                  key={key}
                  type="button"
                  title={label}
                  onClick={() => handleReactionClick(key)}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-150 hover:scale-125 cursor-pointer hover:bg-gray-100"
                >
                  <Icon style={{ fontSize: 22, color }} />
                </button>
              ))}
            </div>
          )}

          <Button
            type="text"
            className="w-full flex items-center justify-center gap-1.5 font-medium rounded-lg hover:bg-gray-100"
            icon={
              ActiveIcon ? (
                <ActiveIcon style={{ color: activeReaction.color }} />
              ) : (
                <LikeOutlined style={{ color: "#6b7280" }} />
              )
            }
            style={{
              color: activeReaction ? activeReaction.color : "#6b7280",
            }}
            onClick={handleLikeClick}
          >
            <span className="text-sm">{activeReaction ? activeReaction.label : "Like"}</span>
          </Button>
        </div>

        <Button
          type="text"
          className="flex-1 flex items-center justify-center gap-1.5 font-medium rounded-lg hover:bg-gray-100"
          icon={<MessageOutlined style={{ color: "#6b7280" }} />}
          style={{ color: "#6b7280" }}
          onClick={() => setShowComments((p) => !p)}
        >
          <span className="text-sm">Comment</span>
        </Button>

        <Button
          type="text"
          className="flex-1 flex items-center justify-center gap-1.5 font-medium rounded-lg hover:bg-gray-100"
          icon={<ShareAltOutlined style={{ color: "#6b7280" }} />}
          style={{ color: "#6b7280" }}
        >
          <span className="text-sm">Share</span>
        </Button>
      </div>

      {/* ── Comments section ── */}
      {showComments && (
        <>
          <Divider className="my-0" />
          <div className="bg-slate-50 px-4 py-3 space-y-3">

            {/* Existing comments */}
            {post.comments.length > 0 ? (
              post.comments.map((c) => (
                <div key={c.id} className="flex gap-2.5">
                  <Avatar src={c.authorAvatar} size={32} />
                  <div className="bg-gray-100 rounded-2xl px-3 py-2 flex-1 min-w-0">
                    <div className="text-[11px] font-semibold text-gray-700">
                      {c.authorName}
                    </div>
                    <div className="text-sm text-gray-700 mt-0.5 leading-snug">
                      {c.text}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-sm text-gray-400 py-2">
                No comments yet. Be the first!
              </p>
            )}

            {/* Comment input */}
            <div className="flex items-center gap-2.5 pt-1">
              <Avatar src={CURRENT_USER.avatar} size={32} />
              <div className="flex flex-1 items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-1.5 focus-within:border-[rgba(82,107,177,0.5)] focus-within:ring-2 focus-within:ring-[rgba(82,107,177,0.1)] transition-all duration-150">
                <input
                  type="text"
                  placeholder="Write your comment here..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                  className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 min-w-0"
                />
                <div className="flex items-center gap-1.5 shrink-0">
                  <SmileOutlined
                    className="text-gray-400 hover:text-[var(--color-yellow)] transition-colors cursor-pointer"
                    style={{ fontSize: 15 }}
                  />
                  <PaperClipOutlined
                    className="text-gray-400 hover:text-[var(--color-blue)] transition-colors cursor-pointer"
                    style={{ fontSize: 15 }}
                  />
                  <button
                    type="button"
                    onClick={handleAddComment}
                    disabled={!commentText.trim()}
                    className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-150 disabled:opacity-30"
                    style={{
                      backgroundColor: commentText.trim()
                        ? "var(--color-blue)"
                        : "#e5e7eb",
                    }}
                  >
                    <SendOutlined
                      style={{
                        fontSize: 12,
                        color: commentText.trim() ? "#fff" : "#9ca3af",
                      }}
                    />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </>
      )}
    </div>
  );
};

export default PostCard;
