import { Form, Input, Select, DatePicker, Button } from "antd";
import { useDispatch } from "react-redux";
import { addLeave, toggleCreateDrawer } from "../../../store/slice";
import SideDrawer from "../../../../../sharedComponents/SharedDrawer";

const { TextArea } = Input;
const { Option } = Select;

const SCHOOL_BLUE = "rgb(82,107,177)";

const LEAVE_TYPES = [
  "Sick Leave",
  "Annual Leave",
  "Casual Leave",
  "Medical Leave",
  "Maternity Leave",
  "Exam Leave",
  "Family Emergency",
];

const fontStyle = { fontFamily: "Montserrat, sans-serif" };

const labelStyle = {
  ...fontStyle,
  fontSize: 12,
  fontWeight: 600,
  color: "#374151",
};

const CreateLeave = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleClose = () => {
    form.resetFields();
    dispatch(toggleCreateDrawer(false));
  };

  const handleSubmit = (values) => {
    const start = values.startDate.toDate();
    const end = values.endDate.toDate();
    const days =
      Math.ceil((end - start) / 86400000) + 1;

    dispatch(
      addLeave({
        applicantName: values.applicantName,
        applicantAvatar: null,
        applicantRole: values.applicantRole,
        leaveFor: values.leaveFor,
        leaveType: values.leaveType,
        startDate: values.startDate.format("YYYY-MM-DD"),
        endDate: values.endDate.format("YYYY-MM-DD"),
        days,
        description: values.description,
        approvers: [],
        hasAttachment: false,
        attachmentType: null,
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
        {/* Applicant Name */}
        <Form.Item
          label={<span style={labelStyle}>Applicant Name</span>}
          name="applicantName"
          rules={[{ required: true, message: "Please enter applicant name" }]}
        >
          <Input
            placeholder="e.g. Ahmed Khan"
            style={{ ...fontStyle, borderRadius: 8 }}
          />
        </Form.Item>

        {/* Role / Class */}
        <Form.Item
          label={<span style={labelStyle}>Role / Class</span>}
          name="applicantRole"
          rules={[{ required: true, message: "Please enter role or class" }]}
        >
          <Input
            placeholder="e.g. Mathematics Teacher or Grade 9 - A"
            style={{ ...fontStyle, borderRadius: 8 }}
          />
        </Form.Item>

        {/* Leave For */}
        <Form.Item
          label={<span style={labelStyle}>Leave For</span>}
          name="leaveFor"
          rules={[{ required: true, message: "Please select leave for" }]}
        >
          <Select
            placeholder="Select"
            style={{ ...fontStyle, borderRadius: 8 }}
          >
            <Option value="teacher">Teacher</Option>
            <Option value="student">Student</Option>
          </Select>
        </Form.Item>

        {/* Leave Type */}
        <Form.Item
          label={<span style={labelStyle}>Leave Type</span>}
          name="leaveType"
          rules={[{ required: true, message: "Please select leave type" }]}
        >
          <Select
            placeholder="Select"
            style={{ ...fontStyle, borderRadius: 8 }}
          >
            {LEAVE_TYPES.map((t) => (
              <Option key={t} value={t}>
                {t}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Start & End Date */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Form.Item
            label={<span style={labelStyle}>Start Date</span>}
            name="startDate"
            rules={[{ required: true, message: "Required" }]}
          >
            <DatePicker
              style={{ width: "100%", borderRadius: 8, ...fontStyle }}
              format="DD MMM YYYY"
            />
          </Form.Item>

          <Form.Item
            label={<span style={labelStyle}>End Date</span>}
            name="endDate"
            rules={[{ required: true, message: "Required" }]}
          >
            <DatePicker
              style={{ width: "100%", borderRadius: 8, ...fontStyle }}
              format="DD MMM YYYY"
            />
          </Form.Item>
        </div>

        {/* Description */}
        <Form.Item
          label={<span style={labelStyle}>Description</span>}
          name="description"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <TextArea
            rows={4}
            placeholder="Reason for leave..."
            style={{ ...fontStyle, borderRadius: 8, resize: "none" }}
          />
        </Form.Item>

        {/* Actions */}
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
            }}
          >
            Create Leave
          </Button>
        </div>
      </Form>
  );
};

export default CreateLeave;
