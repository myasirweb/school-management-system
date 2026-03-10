import { useState } from "react";
import { Button, Form, Input, Select, Tooltip } from "antd";
import { GlobalOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addPage, toggleCreateDrawer } from "../../../store/pagesSlice";

const { TextArea } = Input;

const SCHOOL_BLUE = "rgb(82,107,177)";

const CATEGORY_OPTIONS = [
  { value: "Academic",       label: "Academic"       },
  { value: "Administrative", label: "Administrative" },
  { value: "Student Life",   label: "Student Life"   },
  { value: "Sports",         label: "Sports"         },
  { value: "Events",         label: "Events"         },
  { value: "General",        label: "General"        },
];

const COLLABORATOR_OPTIONS = [
  { value: "Ahmed Khan",     label: "Ahmed Khan"     },
  { value: "Sara Ali",       label: "Sara Ali"       },
  { value: "Muhammad Bilal", label: "Muhammad Bilal" },
  { value: "Fatima Sheikh",  label: "Fatima Sheikh"  },
  { value: "Work Test",      label: "Work Test"      },
  { value: "Hadiqa Shakil",  label: "Hadiqa Shakil"  },
  { value: "James One",      label: "James One"      },
  { value: "Louis Vuitton",  label: "Louis Vuitton"  },
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

const CreatePage = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [privacy, setPrivacy] = useState("Public");

  const handleSubmit = (values) => {
    const page = {
      name: values.name,
      description: values.description,
      category: values.category,
      tags: values.tags || [],
      collaborators: (values.collaborators || []).map((name) => ({ name, avatar: "" })),
      reader: "",
      creator: { name: "Administrator", avatar: "" },
      privacy,
    };
    dispatch(addPage(page));
    dispatch(toggleCreateDrawer(false));
    form.resetFields();
    setPrivacy("Public");
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      {/* Name */}
      <div style={cardStyle}>
        <span style={labelStyle}>Name</span>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Page name is required" }]}
          style={{ marginBottom: 0 }}
        >
          <Input
            placeholder="Enter Name"
            style={{ borderRadius: 8, fontFamily: "Montserrat, sans-serif" }}
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

      {/* Tags */}
      <div style={cardStyle}>
        <span style={labelStyle}>Tags</span>
        <Form.Item
          name="tags"
          rules={[{ required: true, message: "At least one tag is required" }]}
          style={{ marginBottom: 0 }}
        >
          <Select
            mode="tags"
            placeholder="Enter Tags"
            style={{ width: "100%" }}
            tokenSeparators={[","]}
          />
        </Form.Item>
      </div>

      {/* Collaborators */}
      <div style={cardStyle}>
        <span style={labelStyle}>Collaborators</span>
        <Form.Item name="collaborators" style={{ marginBottom: 0 }}>
          <Select
            mode="multiple"
            placeholder="Select Collaborators"
            options={COLLABORATOR_OPTIONS}
            style={{ width: "100%" }}
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

      {/* Action row: privacy toggle + submit */}
      <div className="flex items-center gap-3 mt-2">
        {/* Privacy toggle button */}
        <Tooltip title={privacy === "Public" ? "Set to Private" : "Set to Public"}>
          <Button
            shape="circle"
            icon={
              privacy === "Private" ? (
                <LockOutlined style={{ color: SCHOOL_BLUE }} />
              ) : (
                <GlobalOutlined style={{ color: "#6b7280" }} />
              )
            }
            onClick={() => setPrivacy((p) => (p === "Public" ? "Private" : "Public"))}
            style={{
              border: "1px solid #e5e7eb",
              backgroundColor: "#fff",
              flexShrink: 0,
              width: 40,
              height: 40,
            }}
          />
        </Tooltip>

        {/* Create Page button */}
        <Button
          type="primary"
          htmlType="submit"
          block
          size="large"
          style={{
            flex: 1,
            backgroundColor: SCHOOL_BLUE,
            borderColor: SCHOOL_BLUE,
            borderRadius: 8,
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 600,
            fontSize: 14,
            height: 44,
          }}
        >
          Create Page
        </Button>
      </div>
    </Form>
  );
};

export default CreatePage;
