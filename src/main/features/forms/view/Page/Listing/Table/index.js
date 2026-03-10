import { Avatar, Button, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { setActiveForm, toggleDetailDrawer } from "../../../../store/formsSlice";
import FormStatusTag from "../../UI/FormStatusTag";
import SharedTable from "../../../../../../sharedComponents/SharedTable";

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

const labelStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontSize: 12,
  color: "#111827",
};

const subStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontSize: 11,
  color: "#9ca3af",
};

const FormsTable = ({ forms }) => {
  const dispatch = useDispatch();

  const handleRowClick = (formId) => {
    dispatch(setActiveForm(formId));
    dispatch(toggleDetailDrawer(true));
  };

  const columns = [
    {
      title: "Creator",
      dataIndex: "creatorName",
      key: "creator",
      width: 200,
      render: (_, form) => (
        <div className="flex items-center gap-2">
          <Avatar
            size={34}
            src={form.creatorAvatar}
            style={{ backgroundColor: getAvatarColor(form.creatorName), fontWeight: 700, fontSize: 12, flexShrink: 0 }}
          >
            {getInitials(form.creatorName)}
          </Avatar>
          <div>
            <div style={labelStyle}>{form.creatorName}</div>
            <div style={subStyle}>{form.creatorRole}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Form ID",
      dataIndex: "formId",
      key: "formId",
      width: 120,
      render: (formId) => (
        <span
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: 11,
            color: "#6b7280",
            border: "1px solid #e5e7eb",
            borderRadius: 6,
            padding: "2px 8px",
            background: "#fff",
          }}
        >
          {formId}
        </span>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 180,
      render: (title) => (
        <span style={{ ...labelStyle, fontWeight: 600 }}>{title}</span>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 220,
      render: (desc) => (
        <span
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: 12,
            color: "#6b7280",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {desc}
        </span>
      ),
    },
    {
      title: "Privacy",
      dataIndex: "privacy",
      key: "privacy",
      width: 90,
      render: (privacy) => (
        <span
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: 11,
            color: privacy === "Public" ? "rgb(100,196,178)" : "rgb(82,107,177)",
            border: `1px solid ${privacy === "Public" ? "rgb(100,196,178)" : "rgb(82,107,177)"}`,
            borderRadius: 6,
            padding: "2px 8px",
            background: "#fff",
          }}
        >
          {privacy}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 110,
      render: (status) => <FormStatusTag status={status} />,
    },
    {
      title: "Approvers",
      dataIndex: "approvers",
      key: "approvers",
      width: 100,
      render: (approvers = []) => (
        <Avatar.Group maxCount={3} size={24}>
          {approvers.map((a, i) => (
            <Tooltip key={i} title={a.name}>
              <Avatar
                size={24}
                style={{ backgroundColor: getAvatarColor(a.name), fontSize: 9, fontWeight: 700 }}
              >
                {getInitials(a.name)}
              </Avatar>
            </Tooltip>
          ))}
        </Avatar.Group>
      ),
    },
    {
      title: "Observers",
      dataIndex: "observers",
      key: "observers",
      width: 100,
      render: (observers = []) => (
        <Avatar.Group maxCount={3} size={24}>
          {observers.map((o, i) => (
            <Tooltip key={i} title={o.name}>
              <Avatar
                size={24}
                style={{ backgroundColor: getAvatarColor(o.name), fontSize: 9, fontWeight: 700 }}
              >
                {getInitials(o.name)}
              </Avatar>
            </Tooltip>
          ))}
        </Avatar.Group>
      ),
    },
    {
      title: "Create Date",
      dataIndex: "createDate",
      key: "createDate",
      width: 110,
      render: (d) => <span style={subStyle}>{formatDate(d)}</span>,
    },
    {
      title: "Update Date",
      dataIndex: "updateDate",
      key: "updateDate",
      width: 110,
      render: (d) => <span style={subStyle}>{formatDate(d)}</span>,
    },
    {
      title: "Actions",
      key: "actions",
      width: 130,
      render: (_, form) => (
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <Button
            size="small"
            onClick={(e) => { e.stopPropagation(); handleRowClick(form.id); }}
            style={{
              backgroundColor: SCHOOL_BLUE,
              color: "#fff",
              border: "none",
              borderRadius: 6,
              fontFamily: "Montserrat, sans-serif",
              fontSize: 11,
              fontWeight: 500,
              height: 24,
              padding: "0 10px",
            }}
          >
            Details
          </Button>
          <DeleteOutlined
            style={{ fontSize: 13, color: "#d1d5db", cursor: "pointer" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f87171")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#d1d5db")}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="mx-6 mt-4 mb-4">
      <SharedTable
        columns={columns}
        dataSource={forms}
        rowKey="id"
        scroll={{ x: 1400 }}
        pagination={{
          pageSize: 15,
          showSizeChanger: true,
          pageSizeOptions: ["15", "30", "50"],
          showTotal: (total, range) => (
            <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: 12, color: "#6b7280" }}>
              {range[0]}–{range[1]} of {total} forms
            </span>
          ),
        }}
      />
    </div>
  );
};

export default FormsTable;
