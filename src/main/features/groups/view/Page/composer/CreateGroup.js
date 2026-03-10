import { useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { PlusOutlined, GlobalOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addGroup, toggleCreateDrawer } from "../../../store/groupsSlice";

const { TextArea } = Input;

const SCHOOL_BLUE = "rgb(82,107,177)";
const SCHOOL_PINK = "rgb(232,19,123)";

const DUMMY_MEMBERS = [
  { value: "Ahmed Khan",     label: "Ahmed Khan"     },
  { value: "Sara Ali",       label: "Sara Ali"       },
  { value: "Muhammad Bilal", label: "Muhammad Bilal" },
  { value: "Fatima Sheikh",  label: "Fatima Sheikh"  },
  { value: "Omar Farooq",    label: "Omar Farooq"    },
  { value: "Ayesha Malik",   label: "Ayesha Malik"   },
  { value: "Admin User",     label: "Admin User"     },
  { value: "Mr. Robert Smith",  label: "Mr. Robert Smith"  },
  { value: "Ms. Emily Davis",   label: "Ms. Emily Davis"   },
];

const CATEGORY_OPTIONS = [
  { value: "Public",      label: "Public"      },
  { value: "Private",     label: "Private"     },
  { value: "Class Group", label: "Class Group" },
  { value: "Study Group", label: "Study Group" },
  { value: "Sports",      label: "Sports"      },
  { value: "Club",        label: "Club"        },
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

const CreateGroup = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [coverHover, setCoverHover] = useState(false);
  const [selectedType, setSelectedType] = useState("Public");

  const handleSubmit = (values) => {
    const group = {
      name: values.name,
      code: (values.code || values.name.slice(0, 4)).toUpperCase(),
      description: values.description,
      category: values.category,
      type: selectedType,
      adminUser: { name: values.admin || "Administrator", avatar: "" },
      members: (values.members || []).map((name) => ({ name, avatar: "" })),
      coverImage: `https://picsum.photos/seed/${encodeURIComponent(values.name)}/400/200`,
    };
    dispatch(addGroup(group));
    dispatch(toggleCreateDrawer(false));
    form.resetFields();
    setSelectedType("Public");
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
            border: `2px dashed ${coverHover ? SCHOOL_BLUE : "#e5e7eb"}`,
            borderRadius: 12,
            cursor: "pointer",
            flexDirection: "column",
            display: "flex",
            gap: 6,
          }}
          onMouseEnter={() => setCoverHover(true)}
          onMouseLeave={() => setCoverHover(false)}
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
          <div className="flex-1">
            <span style={labelStyle}>Group Name</span>
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Group name is required" }]}
              style={{ marginBottom: 0 }}
            >
              <Input
                placeholder="Enter Group Name"
                style={{ borderRadius: 8, fontFamily: "Montserrat, sans-serif" }}
              />
            </Form.Item>
          </div>
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

      {/* Category */}
      <div style={cardStyle}>
        <span style={labelStyle}>Category</span>
        <Form.Item
          name="category"
          rules={[{ required: true, message: "Category is required" }]}
          style={{ marginBottom: 0 }}
        >
          <Select
            placeholder="Select Category"
            options={CATEGORY_OPTIONS}
            style={{ width: "100%" }}
          />
        </Form.Item>
      </div>

      {/* Type — toggle pill buttons */}
      <div style={cardStyle}>
        <span style={labelStyle}>Type</span>
        <div className="flex gap-3">
          {[
            {
              key: "Public",
              label: "Public",
              icon: <GlobalOutlined />,
              activeColor: SCHOOL_BLUE,
              activeBg: "#eef1fd",
              activeBorder: SCHOOL_BLUE,
            },
            {
              key: "Private",
              label: "Private",
              icon: <LockOutlined />,
              activeColor: SCHOOL_PINK,
              activeBg: "#fef2f2",
              activeBorder: SCHOOL_PINK,
            },
          ].map((t) => {
            const isActive = selectedType === t.key;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setSelectedType(t.key)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "7px 20px",
                  borderRadius: 8,
                  border: isActive ? `2px solid ${t.activeBorder}` : "1px solid #e5e7eb",
                  background: isActive ? t.activeBg : "#fff",
                  color: isActive ? t.activeColor : "#4b5563",
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 400,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {t.icon}
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Admin */}
      <div style={cardStyle}>
        <span style={labelStyle}>Admin</span>
        <Form.Item name="admin" style={{ marginBottom: 0 }}>
          <Select
            placeholder="Select Admin"
            options={DUMMY_MEMBERS}
            style={{ width: "100%" }}
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
            style={{ width: "100%" }}
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
        Create Group
      </Button>
    </Form>
  );
};

export default CreateGroup;
