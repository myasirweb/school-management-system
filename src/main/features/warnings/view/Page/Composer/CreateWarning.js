import { Form, Input, Select, Button } from "antd";
import { useDispatch } from "react-redux";
import { addWarning, toggleCreateDrawer } from "../../../store/warningsSlice";

const { TextArea } = Input;
const { Option } = Select;

const SCHOOL_BLUE = "rgb(82,107,177)";

const CATEGORIES = [
  "Misconduct",
  "Late Attendance",
  "Poor Performance",
  "Dress Code Violation",
  "Insubordination",
  "Academic Dishonesty",
];

const MEMBERS = [
  "Ahmed Khan",
  "Sara Ali",
  "Muhammad Bilal",
  "Fatima Sheikh",
  "Omar Farooq",
  "Ayesha Malik",
  "Hassan Raza",
  "Nadia Rahman",
];

const fontStyle = { fontFamily: "Montserrat, sans-serif" };

const labelStyle = {
  ...fontStyle,
  fontSize: 12,
  fontWeight: 600,
  color: "#374151",
};

const CreateWarning = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleClose = () => {
    form.resetFields();
    dispatch(toggleCreateDrawer(false));
  };

  const handleSubmit = (values) => {
    dispatch(
      addWarning({
        recipientName: values.warningTo,
        recipientAvatar: null,
        recipientRole: "",
        category: values.category,
        warningTo: { name: values.warningTo, avatar: null },
        description: values.description,
      })
    );
    handleClose();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      style={fontStyle}
    >
      {/* Category */}
      <Form.Item
        label={<span style={labelStyle}>Category</span>}
        name="category"
        rules={[{ required: true, message: "Please select a category" }]}
      >
        <Select
          placeholder="Select category"
          style={{ ...fontStyle, borderRadius: 8 }}
        >
          {CATEGORIES.map((c) => (
            <Option key={c} value={c}>
              {c}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* Warning To */}
      <Form.Item
        label={<span style={labelStyle}>Warning To</span>}
        name="warningTo"
        rules={[{ required: true, message: "Please select a member" }]}
      >
        <Select
          placeholder="Select Member"
          style={{ ...fontStyle, borderRadius: 8 }}
        >
          {MEMBERS.map((m) => (
            <Option key={m} value={m}>
              {m}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* Approvers row with + Add Level */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 4,
        }}
      >
        <span style={labelStyle}>Approvers</span>
        <button
          type="button"
          style={{
            background: "none",
            border: "none",
            color: SCHOOL_BLUE,
            fontFamily: "Montserrat, sans-serif",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          + Add Level
        </button>
      </div>
      <Form.Item name="approvers" style={{ marginTop: 0 }}>
        <Select
          placeholder="Select Approvers"
          style={{ ...fontStyle, borderRadius: 8 }}
        >
          {MEMBERS.map((m) => (
            <Option key={m} value={m}>
              {m}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* Description */}
      <Form.Item
        label={<span style={labelStyle}>Description</span>}
        name="description"
        rules={[{ required: true, message: "Please enter description" }]}
      >
        <TextArea
          rows={4}
          placeholder="Enter Description"
          showCount
          maxLength={500}
          style={{ ...fontStyle, borderRadius: 8, resize: "none" }}
        />
      </Form.Item>

      {/* Submit */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
        <Button
          type="primary"
          htmlType="submit"
          style={{
            ...fontStyle,
            borderRadius: 8,
            backgroundColor: SCHOOL_BLUE,
            borderColor: SCHOOL_BLUE,
            width: "100%",
            height: 40,
            fontWeight: 600,
          }}
        >
          Create Warning
        </Button>
      </div>
    </Form>
  );
};

export default CreateWarning;
