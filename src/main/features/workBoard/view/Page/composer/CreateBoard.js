import { useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addBoard, toggleCreateDrawer } from "../../../store/workBoardSlice";

const { TextArea } = Input;

const SCHOOL_BLUE = "rgb(82,107,177)";

const CATEGORIES = ["Kanban", "Scrum", "To-Do", "Planning", "Retrospective", "Sprint"];

const STATUS_OPTIONS = [
  { value: "Active",    label: "Active"    },
  { value: "Archived",  label: "Archived"  },
  { value: "On Hold",   label: "On Hold"   },
  { value: "Completed", label: "Completed" },
];

const DUMMY_MEMBERS = [
  { value: "Ahmed Khan",      label: "Ahmed Khan"      },
  { value: "Sara Ali",        label: "Sara Ali"        },
  { value: "Muhammad Bilal",  label: "Muhammad Bilal"  },
  { value: "Fatima Sheikh",   label: "Fatima Sheikh"   },
  { value: "Omar Farooq",     label: "Omar Farooq"     },
  { value: "Ayesha Malik",    label: "Ayesha Malik"    },
  { value: "Admin User",      label: "Admin User"      },
];

const DUMMY_ADMINS = [
  { value: "Ahmed Khan",    label: "Ahmed Khan"    },
  { value: "Fatima Malik",  label: "Fatima Malik"  },
  { value: "Hassan Raza",   label: "Hassan Raza"   },
  { value: "Tariq Mahmood", label: "Tariq Mahmood" },
  { value: "Nadia Iqbal",   label: "Nadia Iqbal"   },
  { value: "Administrator", label: "Administrator" },
];

const cardStyle = {
  background: "#f9fafb",
  border: "1px solid #f3f4f6",
  borderRadius: 12,
  padding: "16px",
  marginBottom: 12,
};

const labelStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontSize: 12,
  fontWeight: 600,
  color: "#374151",
  marginBottom: 6,
  display: "block",
};

const CreateBoard = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [coverImageHover, setCoverImageHover] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const handleSubmit = (values) => {
    const board = {
      name: values.name,
      code: values.code || "",
      description: values.description,
      category: activeCategory || "Kanban",
      status: values.status || "Active",
      adminUser: { name: values.admin || "Administrator", avatar: "" },
      members: (values.members || []).map((name) => ({ name, avatar: "" })),
      coverImage: `https://picsum.photos/seed/${encodeURIComponent(values.name)}/400/200`,
    };
    dispatch(addBoard(board));
    dispatch(toggleCreateDrawer(false));
    form.resetFields();
    setActiveCategory(null);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      {/* Cover Image Upload */}
      <div style={{ ...cardStyle, marginBottom: 16 }}>
        <span style={labelStyle}>Cover Image</span>
        <div
          className="flex items-center justify-center rounded-xl transition-all"
          style={{
            width: 120,
            height: 120,
            border: `2px dashed ${coverImageHover ? SCHOOL_BLUE : "#e5e7eb"}`,
            borderRadius: 12,
            cursor: "pointer",
            flexDirection: "column",
            display: "flex",
            gap: 6,
          }}
          onMouseEnter={() => setCoverImageHover(true)}
          onMouseLeave={() => setCoverImageHover(false)}
        >
          <PlusOutlined style={{ fontSize: 24, color: "#d1d5db" }} />
          <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: 12, color: "#9ca3af" }}>
            Upload
          </span>
        </div>
      </div>

      {/* Name + Code */}
      <div style={cardStyle}>
        <div className="flex gap-4">
          {/* Name */}
          <div className="flex-1">
            <span style={labelStyle}>Name</span>
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Board name is required" }]}
              style={{ marginBottom: 0 }}
            >
              <Input
                placeholder="Enter Board Name"
                style={{ borderRadius: 8, fontFamily: "Montserrat, sans-serif" }}
              />
            </Form.Item>
          </div>

          {/* Code */}
          <div style={{ width: 100 }}>
            <span style={labelStyle}>Code</span>
            <Form.Item name="code" style={{ marginBottom: 0 }}>
              <Input
                placeholder="Code"
                style={{ borderRadius: 8, fontFamily: "Montserrat, sans-serif" }}
              />
            </Form.Item>
          </div>
        </div>
      </div>

      {/* Description */}
      <div style={cardStyle}>
        <span style={labelStyle}>Description</span>
        <Form.Item
          name="description"
          rules={[{ required: true, message: "Description is required" }]}
          style={{ marginBottom: 0 }}
        >
          <TextArea
            placeholder="Enter Description"
            rows={3}
            maxLength={500}
            showCount
            style={{ borderRadius: 8, fontFamily: "Montserrat, sans-serif", resize: "none" }}
          />
        </Form.Item>
      </div>

      {/* Category toggle pills */}
      <div style={cardStyle}>
        <span style={labelStyle}>Category</span>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(isActive ? null : cat)}
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 400,
                  borderRadius: 8,
                  padding: "6px 12px",
                  border: `1px solid ${isActive ? SCHOOL_BLUE : "#e5e7eb"}`,
                  backgroundColor: isActive ? "#eff3fc" : "#fff",
                  color: isActive ? SCHOOL_BLUE : "#4b5563",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = SCHOOL_BLUE;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = "#e5e7eb";
                  }
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Status */}
      <div style={cardStyle}>
        <span style={labelStyle}>Status</span>
        <Form.Item
          name="status"
          rules={[{ required: true, message: "Status is required" }]}
          style={{ marginBottom: 0 }}
        >
          <Select
            placeholder="Select Status"
            options={STATUS_OPTIONS}
            style={{ width: "100%", borderRadius: 8 }}
          />
        </Form.Item>
      </div>

      {/* Admin */}
      <div style={cardStyle}>
        <span style={labelStyle}>Admin</span>
        <Form.Item name="admin" style={{ marginBottom: 0 }}>
          <Select
            placeholder="Select Admin"
            options={DUMMY_ADMINS}
            style={{ width: "100%", borderRadius: 8 }}
          />
        </Form.Item>
      </div>

      {/* Members */}
      <div style={cardStyle}>
        <span style={labelStyle}>Members</span>
        <Form.Item name="members" style={{ marginBottom: 0 }}>
          <Select
            mode="multiple"
            placeholder="Select Members"
            options={DUMMY_MEMBERS}
            style={{ width: "100%", borderRadius: 8 }}
          />
        </Form.Item>
      </div>

      {/* Submit */}
      <Button
        type="primary"
        htmlType="submit"
        block
        size="large"
        style={{
          backgroundColor: SCHOOL_BLUE,
          borderColor: SCHOOL_BLUE,
          borderRadius: 8,
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 600,
          fontSize: 14,
          height: 44,
          marginTop: 4,
        }}
      >
        Create Board
      </Button>
    </Form>
  );
};

export default CreateBoard;
