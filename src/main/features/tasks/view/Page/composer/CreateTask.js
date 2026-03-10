import { useState } from "react";
import { Button, Checkbox, DatePicker, Form, Input, Select } from "antd";
import {
  CalendarOutlined,
  FolderOutlined,
  TeamOutlined,
  BookOutlined,
  ReadOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addTask, toggleCreateDrawer } from "../../../store/tasksSlice";

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const SCHOOL_BLUE = "rgb(82,107,177)";

const TASK_TYPES = [
  { key: "General",   label: "General",   icon: <CalendarOutlined /> },
  { key: "Project",   label: "Project",   icon: <FolderOutlined />   },
  { key: "Group",     label: "Group",     icon: <TeamOutlined />     },
  { key: "Homework",  label: "Homework",  icon: <BookOutlined />     },
  { key: "Classwork", label: "Classwork", icon: <ReadOutlined />     },
];

const PRIORITIES = [
  { key: "Low",    label: "Low",    icon: <CheckCircleOutlined />,      activeColor: "#16a34a", activeBg: "#f0fdf4", activeBorder: "#16a34a" },
  { key: "Medium", label: "Medium", icon: <ClockCircleOutlined />,      activeColor: "#ca8a04", activeBg: "#fefce8", activeBorder: "#ca8a04" },
  { key: "High",   label: "High",   icon: <ExclamationCircleOutlined />, activeColor: "#dc2626", activeBg: "#fef2f2", activeBorder: "#dc2626" },
];

const DUMMY_MEMBERS = [
  { value: "Ali Hassan",     label: "Ali Hassan"     },
  { value: "Sara Ahmed",     label: "Sara Ahmed"     },
  { value: "Zain Ul Abidin", label: "Zain Ul Abidin" },
  { value: "Maria Sheikh",   label: "Maria Sheikh"   },
  { value: "Omar Farooq",    label: "Omar Farooq"    },
  { value: "Ayesha Siddiqui",label: "Ayesha Siddiqui"},
  { value: "Bilal Ahmad",    label: "Bilal Ahmad"    },
  { value: "Hina Khan",      label: "Hina Khan"      },
  { value: "Usman Ali",      label: "Usman Ali"      },
  { value: "Sana Tariq",     label: "Sana Tariq"     },
  { value: "Ahmed Khan",     label: "Ahmed Khan"     },
  { value: "Fatima Malik",   label: "Fatima Malik"   },
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

const CreateTask = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [selectedType, setSelectedType] = useState("General");
  const [selectedPriority, setSelectedPriority] = useState("Medium");
  const [assignIndividually, setAssignIndividually] = useState(false);

  const handleSubmit = (values) => {
    const [start, end] = values.dateRange || [];
    const task = {
      subject: values.subject,
      description: values.description,
      type: selectedType,
      priority: selectedPriority,
      assignTo: (values.assignTo || []).map((name) => ({ name, avatar: "" })),
      observers: (values.observers || []).map((name) => ({ name, avatar: "" })),
      taskDate: {
        start: start ? start.format("YYYY-MM-DD") : "",
        end: end ? end.format("YYYY-MM-DD") : "",
      },
      defaultStatus: "Default",
      predecessor: null,
      rating: 0,
      subTasks: 0,
      creatorName: "Current User",
      creatorRole: "Administrator",
      creatorAvatar: "",
    };
    dispatch(addTask(task));
    dispatch(toggleCreateDrawer(false));
    form.resetFields();
    setSelectedType("General");
    setSelectedPriority("Medium");
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      {/* Subject */}
      <div style={cardStyle}>
        <span style={labelStyle}>Subject</span>
        <Form.Item
          name="subject"
          rules={[{ required: true, message: "Subject is required" }]}
          style={{ marginBottom: 0 }}
        >
          <Input
            placeholder="Write Subject"
            style={{ borderRadius: 8, fontFamily: "Montserrat, sans-serif" }}
          />
        </Form.Item>
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

      {/* Type */}
      <div style={cardStyle}>
        <span style={labelStyle}>Type</span>
        <div className="flex flex-wrap gap-2">
          {TASK_TYPES.map((t) => {
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
                  padding: "6px 14px",
                  borderRadius: 8,
                  border: isActive ? `2px solid ${SCHOOL_BLUE}` : "1px solid #e5e7eb",
                  background: isActive ? "#eef1fd" : "#fff",
                  color: isActive ? SCHOOL_BLUE : "#4b5563",
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

      {/* Assign To */}
      <div style={cardStyle}>
        <div className="flex items-center justify-between mb-1.5">
          <span style={labelStyle}>Assign To</span>
          <Checkbox
            checked={assignIndividually}
            onChange={(e) => setAssignIndividually(e.target.checked)}
            style={{ fontFamily: "Montserrat, sans-serif", fontSize: 11, color: "#6b7280" }}
          >
            Assign Individually
          </Checkbox>
        </div>
        <Form.Item name="assignTo" style={{ marginBottom: 0 }}>
          <Select
            mode="multiple"
            placeholder="Select Assign To"
            options={DUMMY_MEMBERS}
            style={{ width: "100%", borderRadius: 8 }}
          />
        </Form.Item>
      </div>

      {/* Observers */}
      <div style={cardStyle}>
        <span style={labelStyle}>Observer</span>
        <Form.Item name="observers" style={{ marginBottom: 0 }}>
          <Select
            mode="multiple"
            placeholder="Select Observer"
            options={DUMMY_MEMBERS}
            style={{ width: "100%", borderRadius: 8 }}
          />
        </Form.Item>
      </div>

      {/* Priority */}
      <div style={cardStyle}>
        <span style={labelStyle}>Priority</span>
        <div className="flex gap-2">
          {PRIORITIES.map((p) => {
            const isActive = selectedPriority === p.key;
            return (
              <button
                key={p.key}
                type="button"
                onClick={() => setSelectedPriority(p.key)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 16px",
                  borderRadius: 8,
                  border: isActive
                    ? `2px solid ${p.activeBorder}`
                    : "1px solid #e5e7eb",
                  background: isActive ? p.activeBg : "#fff",
                  color: isActive ? p.activeColor : "#4b5563",
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 400,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {p.icon}
                {p.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Task Date */}
      <div style={cardStyle}>
        <span style={labelStyle}>Task Date</span>
        <Form.Item
          name="dateRange"
          rules={[{ required: true, message: "Task date is required" }]}
          style={{ marginBottom: 0 }}
        >
          <RangePicker
            style={{ width: "100%", borderRadius: 8 }}
          />
        </Form.Item>
      </div>

      {/* Attachments */}
      <div style={{ ...cardStyle, cursor: "pointer" }}>
        <span style={labelStyle}>Attachments</span>
        <div
          className="flex flex-col items-center justify-center py-6 rounded-xl transition-all"
          style={{
            border: "2px dashed #e5e7eb",
            borderRadius: 12,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = SCHOOL_BLUE)}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
        >
          <PlusOutlined style={{ fontSize: 24, color: "#d1d5db" }} />
          <span
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: 13,
              color: "#9ca3af",
              marginTop: 6,
            }}
          >
            Upload
          </span>
        </div>
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
        Create Task
      </Button>
    </Form>
  );
};

export default CreateTask;
