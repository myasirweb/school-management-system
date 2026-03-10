import { Form, Input, Select, Button } from "antd";
import { useDispatch } from "react-redux";
import { addReward, toggleCreateDrawer } from "../../../store/rewardsSlice";

const { TextArea } = Input;
const { Option } = Select;

const SCHOOL_BLUE = "rgb(82,107,177)";

const REWARD_CATEGORIES = [
  "Excellence Award",
  "Best Performance",
  "Star Student",
  "Leadership Award",
  "Innovation Award",
  "Attendance Award",
];

const fontStyle = { fontFamily: "Montserrat, sans-serif" };

const labelStyle = {
  ...fontStyle,
  fontSize: 12,
  fontWeight: 600,
  color: "#374151",
};

const CreateReward = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleClose = () => {
    form.resetFields();
    dispatch(toggleCreateDrawer(false));
  };

  const handleSubmit = (values) => {
    dispatch(
      addReward({
        recipientName: values.recipientName,
        recipientAvatar: null,
        recipientRole: values.recipientRole,
        category: values.category,
        name: values.name,
        reason: values.reason,
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
          {REWARD_CATEGORIES.map((c) => (
            <Option key={c} value={c}>
              {c}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* Reward Name */}
      <Form.Item
        label={<span style={labelStyle}>Reward Name</span>}
        name="name"
        rules={[{ required: true, message: "Please enter reward name" }]}
      >
        <Input
          placeholder="e.g. Best Teacher 2025"
          showCount
          maxLength={20}
          style={{ ...fontStyle, borderRadius: 8 }}
        />
      </Form.Item>

      {/* Reason */}
      <Form.Item
        label={<span style={labelStyle}>Reason</span>}
        name="reason"
        rules={[{ required: true, message: "Please enter reason" }]}
      >
        <Input
          placeholder="e.g. Outstanding performance"
          showCount
          maxLength={20}
          style={{ ...fontStyle, borderRadius: 8 }}
        />
      </Form.Item>

      {/* Recipient Name */}
      <Form.Item
        label={<span style={labelStyle}>Recipient Name</span>}
        name="recipientName"
        rules={[{ required: true, message: "Please enter recipient name" }]}
      >
        <Input
          placeholder="e.g. Ahmed Khan"
          style={{ ...fontStyle, borderRadius: 8 }}
        />
      </Form.Item>

      {/* Recipient Role */}
      <Form.Item
        label={<span style={labelStyle}>Recipient Role</span>}
        name="recipientRole"
        rules={[{ required: true, message: "Please enter recipient role" }]}
      >
        <Input
          placeholder="e.g. Mathematics Teacher or Grade 9 - A"
          style={{ ...fontStyle, borderRadius: 8 }}
        />
      </Form.Item>

      {/* Description */}
      <Form.Item
        label={<span style={labelStyle}>Description</span>}
        name="description"
        rules={[{ required: true, message: "Please enter a description" }]}
      >
        <TextArea
          rows={4}
          placeholder="Describe why this reward is being given..."
          showCount
          maxLength={500}
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
          Create Reward
        </Button>
      </div>
    </Form>
  );
};

export default CreateReward;
