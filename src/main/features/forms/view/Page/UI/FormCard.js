import { Avatar, Button, Tag, Tooltip } from "antd";
import {
  BellOutlined,
  DeleteOutlined,
  PlusCircleFilled,
} from "@ant-design/icons";
import FormStatusTag from "./FormStatusTag";

const SCHOOL_BLUE = "rgb(82,107,177)";

const getInitials = (name = "") =>
  name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();

const getAvatarColor = (name = "") => {
  const palette = [
    "rgb(100,196,178)",
    "rgb(69,198,238)",
    "rgb(82,107,177)",
    "rgb(232,19,123)",
    "rgb(247,212,71)",
  ];
  return palette[name.charCodeAt(0) % palette.length];
};

const getTimeAgo = (dateStr) => {
  if (!dateStr) return "";
  const diffDays = Math.floor((Date.now() - new Date(dateStr + "T00:00:00")) / 86400000);
  if (diffDays === 0) return "today";
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 30) return `${diffDays} days ago`;
  if (diffDays < 60) return "1 month ago";
  return `${Math.floor(diffDays / 30)} months ago`;
};

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  const d = new Date(dateStr + "T00:00:00");
  return d
    .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    .replace(",", "");
};

const cellLabel = {
  fontFamily: "Montserrat, sans-serif",
  fontSize: 11,
  fontWeight: 400,
  color: "#6b7280",
  textAlign: "center",
  display: "block",
};

const cellValue = {
  fontFamily: "Montserrat, sans-serif",
  fontSize: 12,
  fontWeight: 600,
  color: SCHOOL_BLUE,
  textAlign: "center",
  display: "block",
};

const FormCard = ({ form, onClick }) => {
  const handleCardClick = () => onClick && onClick(form.id);

  const handleDetailsClick = (e) => {
    e.stopPropagation();
    onClick && onClick(form.id);
  };

  return (
    <div
      onClick={handleCardClick}
      className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden cursor-pointer
                 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
      style={{ fontFamily: "Montserrat, sans-serif", backgroundColor: "#fff" }}
    >
      {/* ══ WHITE TOP SECTION ══════════════════════════════════ */}
      <div className="px-5 pt-4 pb-3 flex-1 flex flex-col">

        {/* Row 1 — avatar + name/role/time | bell + formId tag + status + delete */}
        <div className="flex items-start justify-between gap-3">

          {/* Left: avatar with green dot + name block */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative flex-shrink-0">
              <Avatar
                size={44}
                src={form.creatorAvatar}
                style={{
                  backgroundColor: getAvatarColor(form.creatorName),
                  fontWeight: 700,
                  fontSize: 16,
                }}
              >
                {getInitials(form.creatorName)}
              </Avatar>
              <span
                className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full"
                style={{ border: "2px solid #fff" }}
              />
            </div>

            <div className="min-w-0">
              <div
                className="text-sm font-semibold text-gray-800 truncate"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {form.creatorName}
              </div>
              <div
                className="text-xs text-gray-400 truncate"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {form.creatorRole}&nbsp;•&nbsp;{getTimeAgo(form.createDate)}
              </div>
            </div>
          </div>

          {/* Right: bell + formId tag + status + delete */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <BellOutlined style={{ fontSize: 14, color: "#d1d5db" }} />
            <Tag
              style={{
                border: "1px solid #e5e7eb",
                color: "#6b7280",
                backgroundColor: "#fff",
                fontFamily: "Montserrat, sans-serif",
                fontSize: 10,
                fontWeight: 400,
                borderRadius: 6,
                padding: "0 6px",
                margin: 0,
                letterSpacing: "0.04em",
              }}
            >
              {form.formId}
            </Tag>
            <FormStatusTag status={form.status} />
            <DeleteOutlined
              onClick={(e) => e.stopPropagation()}
              style={{ fontSize: 13, color: "#d1d5db", cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#f87171")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#d1d5db")}
            />
          </div>
        </div>

        {/* Row 2 — title */}
        <div
          className="text-sm font-bold text-gray-900 mt-2"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {form.title}
        </div>

        {/* Row 3 — description (2-line clamp) */}
        <p
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: 13,
            fontWeight: 400,
            color: "#6b7280",
            lineHeight: 1.6,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            margin: "6px 0 0",
          }}
        >
          {form.description}
        </p>

        {/* Row 4 — action buttons */}
        <div className="mt-3 flex flex-wrap gap-2">
          <Button
            size="small"
            onClick={handleDetailsClick}
            style={{
              backgroundColor: SCHOOL_BLUE,
              color: "#fff",
              border: "none",
              borderRadius: 6,
              fontFamily: "Montserrat, sans-serif",
              fontSize: 12,
              fontWeight: 500,
              height: 26,
              padding: "0 12px",
            }}
          >
            Details
          </Button>

          {form.status === "Approved" && (
            <>
              <Button
                size="small"
                onClick={(e) => e.stopPropagation()}
                style={{
                  borderColor: SCHOOL_BLUE,
                  color: SCHOOL_BLUE,
                  borderRadius: 6,
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: 12,
                  height: 26,
                  padding: "0 10px",
                }}
              >
                Copy Link
              </Button>
              <Button
                size="small"
                onClick={(e) => e.stopPropagation()}
                style={{
                  borderColor: SCHOOL_BLUE,
                  color: SCHOOL_BLUE,
                  borderRadius: 6,
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: 12,
                  height: 26,
                  padding: "0 10px",
                }}
              >
                Attempt
              </Button>
              <Button
                size="small"
                onClick={(e) => e.stopPropagation()}
                style={{
                  borderColor: SCHOOL_BLUE,
                  color: SCHOOL_BLUE,
                  borderRadius: 6,
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: 12,
                  height: 26,
                  padding: "0 10px",
                }}
              >
                My Submissions
              </Button>
            </>
          )}
        </div>
      </div>

      {/* ══ GRAY BOTTOM SECTION ════════════════════════════════ */}
      <div className="bg-gray-50 border-t border-gray-100 rounded-b-2xl">
        <div className="grid grid-cols-5 divide-x divide-gray-200 py-3">

          {/* Create Date */}
          <div className="flex flex-col items-center gap-0.5 px-2">
            <span style={cellLabel}>Create Date</span>
            <span style={cellValue}>{formatDate(form.createDate)}</span>
          </div>

          {/* Privacy */}
          <div className="flex flex-col items-center gap-0.5 px-2">
            <span style={cellLabel}>Privacy</span>
            <span style={cellValue}>{form.privacy}</span>
          </div>

          {/* Update Date */}
          <div className="flex flex-col items-center gap-0.5 px-2">
            <span style={cellLabel}>Update Date</span>
            <span style={cellValue}>{formatDate(form.updateDate)}</span>
          </div>

          {/* Approvers */}
          <div className="flex flex-col items-center gap-0.5 px-2">
            <span style={cellLabel}>Approvers</span>
            <div className="flex items-center gap-1 mt-1">
              <Avatar.Group maxCount={2} size={18}>
                {(form.approvers || []).map((a, i) => (
                  <Tooltip key={i} title={a.name}>
                    <Avatar
                      size={18}
                      style={{
                        backgroundColor: getAvatarColor(a.name),
                        fontSize: 7,
                        fontWeight: 700,
                      }}
                    >
                      {getInitials(a.name)}
                    </Avatar>
                  </Tooltip>
                ))}
              </Avatar.Group>
              <PlusCircleFilled
                style={{ fontSize: 14, color: SCHOOL_BLUE, cursor: "pointer" }}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          {/* Observers */}
          <div className="flex flex-col items-center gap-0.5 px-2">
            <span style={cellLabel}>Observers</span>
            <div className="flex items-center gap-1 mt-1">
              <Avatar.Group maxCount={2} size={18}>
                {(form.observers || []).map((o, i) => (
                  <Tooltip key={i} title={o.name}>
                    <Avatar
                      size={18}
                      style={{
                        backgroundColor: getAvatarColor(o.name),
                        fontSize: 7,
                        fontWeight: 700,
                      }}
                    >
                      {getInitials(o.name)}
                    </Avatar>
                  </Tooltip>
                ))}
              </Avatar.Group>
              <PlusCircleFilled
                style={{ fontSize: 14, color: SCHOOL_BLUE, cursor: "pointer" }}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormCard;
