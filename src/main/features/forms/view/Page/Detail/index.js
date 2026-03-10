import { Avatar, Divider, Tag, Tooltip } from "antd";
import {
  CalendarOutlined,
  GlobalOutlined,
  LockOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import FormStatusTag from "../UI/FormStatusTag";

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

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  const d = new Date(dateStr + "T00:00:00");
  return d
    .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    .replace(",", "");
};

const Section = ({ title, children }) => (
  <div className="mb-5">
    <div
      style={{
        fontFamily: "Montserrat, sans-serif",
        fontSize: 11,
        fontWeight: 600,
        color: "#9ca3af",
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        marginBottom: 8,
      }}
    >
      {title}
    </div>
    {children}
  </div>
);

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-2 mb-2">
    <span style={{ color: "#9ca3af", fontSize: 13 }}>{icon}</span>
    <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: 12, color: "#6b7280", minWidth: 90 }}>
      {label}
    </span>
    <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: 12, color: "#111827", fontWeight: 500 }}>
      {value}
    </span>
  </div>
);

const QUESTION_TYPE_COLOR = {
  Text: "rgb(82,107,177)",
  "Multiple Choice": "rgb(100,196,178)",
  Checkbox: "rgb(247,212,71)",
  Date: "rgb(69,198,238)",
};

const FormDetail = ({ form }) => {
  if (!form) return null;

  return (
    <div style={{ fontFamily: "Montserrat, sans-serif" }}>
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <Avatar
          size={48}
          src={form.creatorAvatar}
          style={{ backgroundColor: getAvatarColor(form.creatorName), fontWeight: 700, fontSize: 16, flexShrink: 0 }}
        >
          {getInitials(form.creatorName)}
        </Avatar>
        <div className="flex-1 min-w-0">
          <div style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: 15, color: "#111827" }}>
            {form.title}
          </div>
          <div style={{ fontFamily: "Montserrat, sans-serif", fontSize: 12, color: "#6b7280", marginTop: 2 }}>
            {form.creatorName} &nbsp;•&nbsp; {form.creatorRole}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: 10,
                color: "#6b7280",
                border: "1px solid #e5e7eb",
                borderRadius: 6,
                padding: "1px 7px",
              }}
            >
              {form.formId}
            </span>
            <FormStatusTag status={form.status} />
          </div>
        </div>
      </div>

      <Divider style={{ margin: "12px 0" }} />

      {/* Description */}
      <Section title="Description">
        <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: 13, color: "#6b7280", lineHeight: 1.7, margin: 0 }}>
          {form.description}
        </p>
      </Section>

      {/* Info */}
      <Section title="Details">
        <InfoRow
          icon={<CalendarOutlined />}
          label="Create Date"
          value={formatDate(form.createDate)}
        />
        <InfoRow
          icon={<CalendarOutlined />}
          label="Update Date"
          value={formatDate(form.updateDate)}
        />
        <InfoRow
          icon={form.privacy === "Public" ? <GlobalOutlined /> : <LockOutlined />}
          label="Privacy"
          value={form.privacy}
        />
      </Section>

      {/* Approvers */}
      {form.approvers && form.approvers.length > 0 && (
        <Section title="Approvers">
          <div className="flex flex-col gap-2">
            {form.approvers.map((a, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar
                    size={28}
                    style={{ backgroundColor: getAvatarColor(a.name), fontSize: 10, fontWeight: 700 }}
                  >
                    {getInitials(a.name)}
                  </Avatar>
                  <div>
                    <div style={{ fontFamily: "Montserrat, sans-serif", fontSize: 12, color: "#111827", fontWeight: 500 }}>
                      {a.name}
                    </div>
                    <div style={{ fontFamily: "Montserrat, sans-serif", fontSize: 11, color: "#9ca3af" }}>
                      {a.role}
                    </div>
                  </div>
                </div>
                <Tag
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: 10,
                    borderRadius: 6,
                    padding: "1px 8px",
                    margin: 0,
                    color:
                      a.response === "Approved"
                        ? "#52c41a"
                        : a.response === "Declined"
                        ? "#ff4d4f"
                        : SCHOOL_BLUE,
                    borderColor:
                      a.response === "Approved"
                        ? "#52c41a"
                        : a.response === "Declined"
                        ? "#ff4d4f"
                        : SCHOOL_BLUE,
                    backgroundColor: "#fff",
                  }}
                >
                  {a.response === "InProcess" ? "In Process" : a.response}
                </Tag>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Observers */}
      {form.observers && form.observers.length > 0 && (
        <Section title="Observers">
          <div className="flex flex-wrap gap-2">
            {form.observers.map((o, i) => (
              <Tooltip key={i} title={o.name}>
                <div className="flex items-center gap-1.5">
                  <Avatar
                    size={24}
                    style={{ backgroundColor: getAvatarColor(o.name), fontSize: 9, fontWeight: 700 }}
                  >
                    {getInitials(o.name)}
                  </Avatar>
                  <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: 12, color: "#6b7280" }}>
                    {o.name}
                  </span>
                </div>
              </Tooltip>
            ))}
          </div>
        </Section>
      )}

      {/* Questions */}
      {form.questions && form.questions.length > 0 && (
        <>
          <Divider style={{ margin: "12px 0" }} />
          <Section title={`Questions (${form.questions.length})`}>
            <div className="flex flex-col gap-3">
              {form.questions.map((q, i) => (
                <div
                  key={q.id}
                  className="rounded-lg border border-gray-100 p-3"
                  style={{ backgroundColor: "#fafafa" }}
                >
                  <div className="flex items-start gap-2">
                    <span
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: 11,
                        fontWeight: 600,
                        color: SCHOOL_BLUE,
                        minWidth: 20,
                      }}
                    >
                      {i + 1}.
                    </span>
                    <div className="flex-1">
                      <div style={{ fontFamily: "Montserrat, sans-serif", fontSize: 13, color: "#111827", fontWeight: 500 }}>
                        {q.questionText}
                        {q.required && (
                          <span style={{ color: "#f87171", marginLeft: 4 }}>*</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Tag
                          style={{
                            fontFamily: "Montserrat, sans-serif",
                            fontSize: 10,
                            borderRadius: 6,
                            padding: "0 6px",
                            margin: 0,
                            color: QUESTION_TYPE_COLOR[q.type] || SCHOOL_BLUE,
                            borderColor: QUESTION_TYPE_COLOR[q.type] || SCHOOL_BLUE,
                            backgroundColor: "#fff",
                          }}
                        >
                          {q.type}
                        </Tag>
                      </div>
                      {q.options && q.options.length > 0 && (
                        <div className="mt-2 flex flex-col gap-1">
                          {q.options.map((opt, oi) => (
                            <div key={oi} className="flex items-center gap-1.5">
                              <div
                                style={{
                                  width: 14,
                                  height: 14,
                                  borderRadius: q.type === "Checkbox" ? 3 : "50%",
                                  border: "1.5px solid #d1d5db",
                                  flexShrink: 0,
                                }}
                              />
                              <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: 12, color: "#6b7280" }}>
                                {opt}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </>
      )}
    </div>
  );
};

export default FormDetail;
