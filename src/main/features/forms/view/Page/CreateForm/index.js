import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Divider, Form, Input, Select, Switch } from "antd";
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  GlobalOutlined,
  LockOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { addForm } from "../../../store/formsSlice";

const { TextArea } = Input;
const { Option } = Select;

const SCHOOL_BLUE = "rgb(82,107,177)";

const QUESTION_TYPES = ["Text", "Multiple Choice", "Checkbox", "Date"];

const cardStyle = {
  backgroundColor: "#f9fafb",
  border: "1px solid #f0f2f5",
  borderRadius: 12,
  padding: "16px",
};

const sectionTitle = {
  fontFamily: "Montserrat, sans-serif",
  fontSize: 13,
  fontWeight: 700,
  color: SCHOOL_BLUE,
  marginBottom: 14,
};

const labelStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontSize: 12,
  fontWeight: 600,
  color: "#374151",
};

const newQuestion = (id) => ({
  id,
  questionText: "",
  type: "Text",
  required: false,
  options: [],
});

const CreateForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [privacy, setPrivacy] = useState("Public");
  const [questions, setQuestions] = useState([newQuestion(1)]);
  const [nextId, setNextId] = useState(2);

  const addQuestion = () => {
    setQuestions((prev) => [...prev, newQuestion(nextId)]);
    setNextId((n) => n + 1);
  };

  const removeQuestion = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const updateQuestion = (id, field, value) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id !== id) return q;
        const updated = { ...q, [field]: value };
        if (field === "type" && (value === "Text" || value === "Date")) {
          updated.options = [];
        }
        if (
          field === "type" &&
          (value === "Multiple Choice" || value === "Checkbox") &&
          updated.options.length === 0
        ) {
          updated.options = ["Option 1"];
        }
        return updated;
      })
    );
  };

  const addOption = (qId) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id !== qId
          ? q
          : { ...q, options: [...q.options, `Option ${q.options.length + 1}`] }
      )
    );
  };

  const updateOption = (qId, optIdx, value) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id !== qId) return q;
        const opts = [...q.options];
        opts[optIdx] = value;
        return { ...q, options: opts };
      })
    );
  };

  const removeOption = (qId, optIdx) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id !== qId
          ? q
          : { ...q, options: q.options.filter((_, i) => i !== optIdx) }
      )
    );
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      dispatch(
        addForm({
          ...values,
          privacy,
          questions: questions.map(({ id, ...rest }) => rest),
          creatorName: "Current User",
          creatorRole: "Administrator",
          creatorAvatar: null,
          approvers: [],
          observers: [],
        })
      );
      form.resetFields();
      setQuestions([newQuestion(1)]);
      setNextId(2);
      setPrivacy("Public");
      navigate("/forms");
    });
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#f5f6fa", fontFamily: "Montserrat, sans-serif" }}
    >
      {/* Top bar */}
      <div
        className="flex items-center gap-3 px-6 py-4 bg-white border-b border-gray-100 shadow-sm"
        style={{ position: "sticky", top: 0, zIndex: 10 }}
      >
        <button
          onClick={() => navigate("/forms")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
            color: SCHOOL_BLUE,
            fontFamily: "Montserrat, sans-serif",
            fontSize: 13,
            fontWeight: 500,
            padding: "4px 0",
          }}
        >
          <ArrowLeftOutlined style={{ fontSize: 14 }} />
          Back to Forms
        </button>
        <Divider type="vertical" style={{ margin: "0 4px" }} />
        <span
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: 16,
            fontWeight: 700,
            color: "#111827",
          }}
        >
          Create New Form
        </span>
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto py-8 px-4">
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {/* Basic Info */}
          <div style={cardStyle} className="mb-5">
            <div style={sectionTitle}>Basic Information</div>

            <Form.Item
              name="title"
              label={<span style={labelStyle}>Form Title <span style={{ color: "#f87171" }}>*</span></span>}
              rules={[{ required: true, message: "Title is required" }]}
              style={{ marginBottom: 14 }}
            >
              <Input
                placeholder="Enter form title"
                style={{ borderRadius: 8, fontFamily: "Montserrat, sans-serif", fontSize: 13 }}
              />
            </Form.Item>

            <Form.Item
              name="description"
              label={<span style={labelStyle}>Description</span>}
              style={{ marginBottom: 14 }}
            >
              <TextArea
                placeholder="Describe the purpose of this form..."
                rows={3}
                showCount
                maxLength={500}
                style={{ borderRadius: 8, fontFamily: "Montserrat, sans-serif", fontSize: 13 }}
              />
            </Form.Item>

            {/* Privacy toggle */}
            <div className="flex items-center gap-2">
              <span style={labelStyle}>Privacy</span>
              <Button
                type="text"
                icon={
                  privacy === "Public" ? (
                    <GlobalOutlined style={{ color: "rgb(100,196,178)", fontSize: 16 }} />
                  ) : (
                    <LockOutlined style={{ color: SCHOOL_BLUE, fontSize: 16 }} />
                  )
                }
                onClick={() => setPrivacy((p) => (p === "Public" ? "Private" : "Public"))}
                style={{
                  borderRadius: "50%",
                  width: 34,
                  height: 34,
                  padding: 0,
                  border: `1px solid ${privacy === "Public" ? "rgb(100,196,178)" : SCHOOL_BLUE}`,
                  backgroundColor: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
              <span
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: 12,
                  color: privacy === "Public" ? "rgb(100,196,178)" : SCHOOL_BLUE,
                  fontWeight: 500,
                }}
              >
                {privacy}
              </span>
            </div>
          </div>

          {/* Questions */}
          <div style={cardStyle} className="mb-5">
            <div style={sectionTitle}>Questions</div>

            <div className="flex flex-col gap-4">
              {questions.map((q, idx) => (
                <div
                  key={q.id}
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: 10,
                    padding: 14,
                  }}
                >
                  {/* Question header row */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: 12,
                        fontWeight: 600,
                        color: SCHOOL_BLUE,
                      }}
                    >
                      Question {idx + 1}
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <span
                          style={{ fontFamily: "Montserrat, sans-serif", fontSize: 11, color: "#6b7280" }}
                        >
                          Required
                        </span>
                        <Switch
                          size="small"
                          checked={q.required}
                          onChange={(v) => updateQuestion(q.id, "required", v)}
                          style={{ backgroundColor: q.required ? SCHOOL_BLUE : "#d1d5db" }}
                        />
                      </div>
                      {questions.length > 1 && (
                        <DeleteOutlined
                          style={{ fontSize: 13, color: "#d1d5db", cursor: "pointer" }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = "#f87171")}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "#d1d5db")}
                          onClick={() => removeQuestion(q.id)}
                        />
                      )}
                    </div>
                  </div>

                  {/* Question text input */}
                  <Input
                    value={q.questionText}
                    onChange={(e) => updateQuestion(q.id, "questionText", e.target.value)}
                    placeholder="Enter your question..."
                    style={{
                      borderRadius: 8,
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: 13,
                      marginBottom: 10,
                    }}
                  />

                  {/* Type select */}
                  <Select
                    value={q.type}
                    onChange={(v) => updateQuestion(q.id, "type", v)}
                    style={{ width: 180 }}
                    size="small"
                  >
                    {QUESTION_TYPES.map((t) => (
                      <Option key={t} value={t}>{t}</Option>
                    ))}
                  </Select>

                  {/* Options for Multiple Choice / Checkbox */}
                  {(q.type === "Multiple Choice" || q.type === "Checkbox") && (
                    <div className="mt-3 flex flex-col gap-2">
                      {q.options.map((opt, oi) => (
                        <div key={oi} className="flex items-center gap-2">
                          <div
                            style={{
                              width: 14,
                              height: 14,
                              borderRadius: q.type === "Checkbox" ? 3 : "50%",
                              border: "1.5px solid #d1d5db",
                              flexShrink: 0,
                            }}
                          />
                          <Input
                            value={opt}
                            onChange={(e) => updateOption(q.id, oi, e.target.value)}
                            size="small"
                            style={{
                              borderRadius: 6,
                              fontFamily: "Montserrat, sans-serif",
                              fontSize: 12,
                              flex: 1,
                            }}
                          />
                          {q.options.length > 1 && (
                            <DeleteOutlined
                              style={{ fontSize: 12, color: "#d1d5db", cursor: "pointer" }}
                              onMouseEnter={(e) => (e.currentTarget.style.color = "#f87171")}
                              onMouseLeave={(e) => (e.currentTarget.style.color = "#d1d5db")}
                              onClick={() => removeOption(q.id, oi)}
                            />
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addOption(q.id)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontFamily: "Montserrat, sans-serif",
                          fontSize: 12,
                          color: SCHOOL_BLUE,
                          padding: "2px 0",
                          textAlign: "left",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <PlusOutlined style={{ fontSize: 11 }} />
                        Add option
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Add question button */}
            <button
              type="button"
              onClick={addQuestion}
              className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 rounded-lg border-2 border-dashed"
              style={{
                borderColor: SCHOOL_BLUE,
                color: SCHOOL_BLUE,
                fontFamily: "Montserrat, sans-serif",
                fontSize: 13,
                fontWeight: 500,
                background: "#f5f7ff",
                cursor: "pointer",
              }}
            >
              <PlusOutlined style={{ fontSize: 13 }} />
              Add Question
            </button>
          </div>

          {/* Footer buttons */}
          <div className="flex justify-end gap-3">
            <Button
              onClick={() => navigate("/forms")}
              style={{
                borderRadius: 8,
                fontFamily: "Montserrat, sans-serif",
                fontSize: 13,
                height: 38,
                padding: "0 20px",
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              style={{
                backgroundColor: SCHOOL_BLUE,
                borderColor: SCHOOL_BLUE,
                color: "#fff",
                borderRadius: 8,
                fontFamily: "Montserrat, sans-serif",
                fontSize: 13,
                fontWeight: 600,
                height: 38,
                padding: "0 28px",
              }}
            >
              Create Form
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateForm;
