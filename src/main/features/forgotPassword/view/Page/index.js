import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, CheckCircle, Send } from "lucide-react";
import { Form, Input, Button } from "antd";
import schoolLogo from "../../../../../assets/images/main-logo/workwise.png";
import "../../../login/style/login.css";

const ForgotPasswordPage = () => {
  const [sent, setSent] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    setSubmittedEmail(values.email);
    setSent(true);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Logo */}
        <div className="flex flex-col items-center gap-2 mb-6">
          <img
            src={schoolLogo}
            alt="School Logo"
            className="h-10 object-contain"
          />
          <h1 className="text-lg font-bold text-gray-900">Reset Password</h1>
          {!sent && (
            <p className="text-sm text-gray-500 text-center">
              Enter your email and we'll send you a reset link
            </p>
          )}
        </div>

        {sent ? (
          /* ── Success state ── */
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} color="#22c55e" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Check Your Email
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Password reset link has been sent to{" "}
              <span className="font-semibold text-gray-700">
                {submittedEmail}
              </span>
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm font-medium hover:underline transition"
              style={{ color: "var(--RoyalBlue)" }}
            >
              <ArrowLeft size={16} />
              Back to Login
            </Link>
          </div>
        ) : (
          /* ── Form state ── */
          <>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              requiredMark={false}
            >
              <Form.Item
                label="Email Address"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please enter your email address",
                  },
                  {
                    type: "email",
                    message: "Please enter a valid email address",
                  },
                ]}
              >
                <Input
                  prefix={<Mail size={16} className="text-gray-400 mr-1" />}
                  placeholder="Enter your registered email"
                  size="large"
                />
              </Form.Item>

              <Form.Item className="mb-0">
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  icon={<Send size={16} />}
                  style={{
                    backgroundColor: "var(--RoyalBlue)",
                    borderColor: "var(--RoyalBlue)",
                  }}
                >
                  Send Reset Link
                </Button>
              </Form.Item>
            </Form>

            <div className="text-center mt-5 pt-4 border-t border-gray-100">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm font-medium hover:underline transition"
                style={{ color: "var(--RoyalBlue)" }}
              >
                <ArrowLeft size={16} />
                Back to Login
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
