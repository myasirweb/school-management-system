import { useState } from "react";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addProject, toggleCreateDrawer } from "../../../store/projectsSlice";

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const SCHOOL_BLUE = "rgb(82,107,177)";

const DUMMY_MEMBERS = [
  { value: "Ahmed Khan",      label: "Ahmed Khan"      },
  { value: "Fatima Malik",    label: "Fatima Malik"    },
  { value: "Hassan Raza",     label: "Hassan Raza"     },
  { value: "Tariq Mahmood",   label: "Tariq Mahmood"   },
  { value: "Nadia Iqbal",     label: "Nadia Iqbal"     },
  { value: "Ali Hassan",      label: "Ali Hassan"      },
  { value: "Sara Ahmed",      label: "Sara Ahmed"      },
  { value: "Bilal Ahmad",     label: "Bilal Ahmad"     },
  { value: "Hina Khan",       label: "Hina Khan"       },
  { value: "Usman Ali",       label: "Usman Ali"       },
  { value: "Zain Ul Abidin",  label: "Zain Ul Abidin"  },
  { value: "Maria Sheikh",    label: "Maria Sheikh"    },
];

const STATUS_OPTIONS = [
  { value: "Associate", label: "Associate" },
  { value: "Active",    label: "Active"    },
  { value: "On Hold",   label: "On Hold"   },
  { value: "Completed", label: "Completed" },
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

const CreateProject = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [coverImageHover, setCoverImageHover] = useState(false);

  const handleSubmit = (values) => {
    const [start, end] = values.dateRange || [];
    const project = {
      name: values.name,
      code: values.code || "",
      description: values.description,
      category: values.category,
      status: values.status || values.category,
      date: {
        start: start ? start.format("YYYY-MM-DD") : "",
        end: end ? end.format("YYYY-MM-DD") : "",
      },
      adminUser: { name: values.admin || "Administrator", avatar: "" },
      users: (values.users || []).map((name) => ({ name, avatar: "" })),
      coverImage: `https://picsum.photos/seed/${encodeURIComponent(values.name)}/400/200`,
    };
    dispatch(addProject(project));
    dispatch(toggleCreateDrawer(false));
    form.resetFields();
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
              rules={[{ required: true, message: "Project name is required" }]}
              style={{ marginBottom: 0 }}
            >
              <Input
                placeholder="Enter Name"
                style={{ borderRadius: 8, fontFamily: "Montserrat, sans-serif" }}
              />
            </Form.Item>
          </div>

          {/* Code */}
          <div style={{ width: 110 }}>
            <div className="flex items-center justify-between mb-1.5">
              <span style={{ ...labelStyle, marginBottom: 0 }}>Code</span>
            </div>
            <Form.Item name="code" style={{ marginBottom: 0 }}>
              <Input
                placeholder="Code"
                style={{ borderRadius: 8, fontFamily: "Montserrat, sans-serif" }}
              />
            </Form.Item>
            <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: 10, color: "#9ca3af", marginTop: 3, display: "block" }}>
              E.g. P (for a project name)
            </span>
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
            rows={4}
            maxLength={500}
            showCount
            style={{ borderRadius: 8, fontFamily: "Montserrat, sans-serif", resize: "none" }}
          />
        </Form.Item>
      </div>

      {/* Date */}
      <div style={cardStyle}>
        <span style={labelStyle}>Date</span>
        <Form.Item name="dateRange" style={{ marginBottom: 0 }}>
          <RangePicker
            placeholder={["Start Date", "End Date"]}
            style={{ width: "100%", borderRadius: 8 }}
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
            options={DUMMY_MEMBERS}
            style={{ width: "100%", borderRadius: 8 }}
          />
        </Form.Item>
      </div>

      {/* Users */}
      <div style={cardStyle}>
        <span style={labelStyle}>Users</span>
        <Form.Item name="users" style={{ marginBottom: 0 }}>
          <Select
            mode="multiple"
            placeholder="Select User"
            options={DUMMY_MEMBERS}
            style={{ width: "100%", borderRadius: 8 }}
          />
        </Form.Item>
      </div>

      {/* Status */}
      <div style={cardStyle}>
        <span style={labelStyle}>Status</span>
        <Form.Item name="status" style={{ marginBottom: 0 }}>
          <Select
            placeholder="Select Status"
            options={STATUS_OPTIONS}
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
        Create Project
      </Button>
    </Form>
  );
};

export default CreateProject;
