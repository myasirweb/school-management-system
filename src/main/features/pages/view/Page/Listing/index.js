import { useMemo } from "react";
import { Table, Avatar, Tag, Checkbox, Dropdown, Tooltip, Badge } from "antd";
import {
  GlobalOutlined,
  LockOutlined,
  PlusCircleFilled,
  EllipsisOutlined,
  EditOutlined,
  DeleteOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { togglePageSelection, selectAllPages } from "../../../store/pagesSlice";

const SCHOOL_BLUE  = "rgb(82,107,177)";
const SCHOOL_SKY   = "rgb(69,198,238)";
const SCHOOL_PINK  = "rgb(232,19,123)";

const getInitials = (name = "") =>
  name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

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

const actionMenuItems = [
  {
    key: "edit",
    label: (
      <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: 13 }}>
        <EditOutlined style={{ marginRight: 8 }} />Edit
      </span>
    ),
  },
  {
    key: "delete",
    label: (
      <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: 13, color: "#ef4444" }}>
        <DeleteOutlined style={{ marginRight: 8 }} />Delete
      </span>
    ),
  },
  {
    key: "duplicate",
    label: (
      <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: 13 }}>
        <CopyOutlined style={{ marginRight: 8 }} />Duplicate
      </span>
    ),
  },
];

const PagesListing = ({ pages, loading = false }) => {
  const dispatch = useDispatch();
  const selectedPageIds = useSelector((s) => s.pages.selectedPageIds);

  const allSelected =
    pages.length > 0 && selectedPageIds.length === pages.length;
  const someSelected =
    selectedPageIds.length > 0 && selectedPageIds.length < pages.length;

  const columns = useMemo(
    () => [
      /* ── Checkbox ── */
      {
        title: () => (
          <Checkbox
            checked={allSelected}
            indeterminate={someSelected}
            onChange={(e) =>
              dispatch(selectAllPages(e.target.checked ? pages.map((p) => p.id) : []))
            }
          />
        ),
        key: "checkbox",
        width: 44,
        render: (_, r) => (
          <Checkbox
            checked={selectedPageIds.includes(r.id)}
            onChange={() => dispatch(togglePageSelection(r.id))}
            onClick={(e) => e.stopPropagation()}
          />
        ),
      },

      /* ── Name ── */
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        sorter: (a, b) => a.name.localeCompare(b.name),
        minWidth: 140,
        render: (v) => (
          <span
            className="text-sm font-medium text-gray-800"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {v}
          </span>
        ),
      },

      /* ── Description ── */
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        width: 260,
        render: (v) => (
          <span
            className="text-sm text-gray-500"
            style={{
              fontFamily: "Montserrat, sans-serif",
              display: "block",
              maxWidth: 240,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {v}
          </span>
        ),
      },

      /* ── Status ── */
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: 140,
        render: (v) =>
          v === "Published" ? (
            <Tag
              style={{
                backgroundColor: "#52c41a",
                color: "#fff",
                border: "none",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 600,
                fontSize: 11,
                borderRadius: 6,
                padding: "1px 10px",
              }}
            >
              Published
            </Tag>
          ) : (
            <Tag
              style={{
                backgroundColor: "#ff4d4f",
                color: "#fff",
                border: "none",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 600,
                fontSize: 11,
                borderRadius: 6,
                padding: "1px 10px",
              }}
            >
              Not Published
            </Tag>
          ),
      },

      /* ── Tags ── */
      {
        title: "Tags",
        dataIndex: "tags",
        key: "tags",
        width: 140,
        render: (tags = []) => {
          const visible = tags.slice(0, 2);
          const extra = tags.length - 2;
          return (
            <div className="flex flex-wrap gap-1 items-center">
              {visible.map((t, i) => (
                <span
                  key={i}
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: 11,
                    fontWeight: 500,
                    color: SCHOOL_SKY,
                    cursor: "pointer",
                  }}
                >
                  {t}
                </span>
              ))}
              {extra > 0 && (
                <span
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: 11,
                    fontWeight: 500,
                    color: "#9ca3af",
                  }}
                >
                  +{extra} more
                </span>
              )}
            </div>
          );
        },
      },

      /* ── Collaborators ── */
      {
        title: "Collaborators",
        dataIndex: "collaborators",
        key: "collaborators",
        width: 140,
        render: (colls = []) => (
          <div className="flex items-center gap-1">
            <Avatar.Group maxCount={2} size="small">
              {colls.map((c, i) => (
                <Tooltip key={i} title={c.name}>
                  <Avatar
                    size={24}
                    style={{
                      backgroundColor: getAvatarColor(c.name),
                      fontSize: 9,
                      fontWeight: 700,
                    }}
                  >
                    {getInitials(c.name)}
                  </Avatar>
                </Tooltip>
              ))}
            </Avatar.Group>
            <PlusCircleFilled
              style={{ fontSize: 16, color: SCHOOL_BLUE, cursor: "pointer", marginLeft: 2 }}
            />
          </div>
        ),
      },

      /* ── Reader ── */
      {
        title: "Reader",
        dataIndex: "reader",
        key: "reader",
        width: 130,
        render: (v) => (
          <span
            className="text-sm text-gray-500"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {v || "—"}
          </span>
        ),
      },

      /* ── Creator ── */
      {
        title: "Creator",
        dataIndex: "creator",
        key: "creator",
        width: 170,
        render: (c) => (
          <div className="flex items-center gap-2">
            <Avatar
              size={24}
              style={{
                backgroundColor: getAvatarColor(c?.name || ""),
                fontSize: 9,
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {getInitials(c?.name || "")}
            </Avatar>
            <span
              className="text-sm font-medium text-gray-700"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {c?.name || "—"}
            </span>
          </div>
        ),
      },

      /* ── Create Date ── */
      {
        title: "Create Date",
        dataIndex: "createDate",
        key: "createDate",
        width: 120,
        render: (v) => (
          <span
            className="text-sm text-gray-500"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {formatDate(v)}
          </span>
        ),
      },

      /* ── Update Date ── */
      {
        title: "Update Date",
        dataIndex: "updateDate",
        key: "updateDate",
        width: 120,
        render: (v) => (
          <span
            className="text-sm text-gray-500"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {formatDate(v)}
          </span>
        ),
      },

      /* ── Privacy ── */
      {
        title: "Privacy",
        dataIndex: "privacy",
        key: "privacy",
        width: 70,
        align: "center",
        render: (v) =>
          v === "Private" ? (
            <Tooltip title="Private">
              <LockOutlined style={{ fontSize: 14, color: "#9ca3af" }} />
            </Tooltip>
          ) : (
            <Tooltip title="Public">
              <GlobalOutlined style={{ fontSize: 14, color: "#9ca3af" }} />
            </Tooltip>
          ),
      },

      /* ── Action (Not Published only) ── */
      {
        title: "Action",
        key: "action",
        width: 60,
        align: "center",
        render: (_, r) => {
          if (r.status === "Published") return null;
          return (
            <Dropdown menu={{ items: actionMenuItems }} trigger={["click"]} placement="bottomRight">
              <EllipsisOutlined
                style={{ fontSize: 18, color: "#9ca3af", cursor: "pointer", fontWeight: 700 }}
                onClick={(e) => e.stopPropagation()}
              />
            </Dropdown>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pages, selectedPageIds, allSelected, someSelected]
  );

  return (
    <div className="mx-6 mt-4 mb-4 rounded-xl overflow-hidden border border-gray-100 shadow-sm bg-white">
      <Table
        columns={columns}
        dataSource={pages}
        loading={loading}
        rowKey="id"
        scroll={{ x: 1400 }}
        style={{ fontFamily: "Montserrat, sans-serif" }}
        rowClassName={() => "hover:bg-blue-50 transition-all duration-150"}
        pagination={{
          pageSize: 20,
          showSizeChanger: true,
          pageSizeOptions: ["20", "50", "100"],
          showTotal: (total, range) => (
            <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: 13, color: "#6b7280" }}>
              {range[0]}–{range[1]} of {total} pages
            </span>
          ),
          position: ["bottomRight"],
        }}
        components={{
          header: {
            cell: (props) => (
              <th
                {...props}
                style={{
                  ...props.style,
                  backgroundColor: "#f9fafb",
                  color: "#6b7280",
                  fontSize: "11px",
                  fontWeight: 600,
                  fontFamily: "Montserrat, sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  borderBottom: "1px solid #e5e7eb",
                  padding: "10px 16px",
                }}
              />
            ),
          },
        }}
      />
    </div>
  );
};

export default PagesListing;
