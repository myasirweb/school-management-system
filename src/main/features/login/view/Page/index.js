import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Mail, Lock, LogIn, Shield } from "lucide-react";
import { Form, Input, Button, Checkbox, Alert } from "antd";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  clearError,
} from "../../store/loginSlice";
import {
  loginUser,
  getRememberedEmail,
} from "../../services/loginService";
import schoolLogo from "../../../../../assets/images/main-logo/workwise.png";
import "../../style/login.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, error, loading, role } = useSelector(
    (state) => state.login
  );

  const [form] = Form.useForm();
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const remembered = getRememberedEmail();
    if (remembered) {
      form.setFieldsValue({ email: remembered });
      setRememberMe(true);
    }
  }, [form]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard/admin", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (values) => {
    dispatch(clearError());
    dispatch(loginStart());

    const result = loginUser(values.email, values.password, rememberMe);

    if (result.success) {
      dispatch(loginSuccess(result.user));
    } else {
      dispatch(loginFailure(result.error));
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Logo & Title */}
        <div className="login-logo">
          <img src={schoolLogo} alt="School Logo" />
          <h1>School Management</h1>
          <p>Sign in to your account</p>
        </div>

        {/* Error Message */}
        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            closable
            onClose={() => dispatch(clearError())}
            className="mb-5"
          />
        )}

        {/* Role Badge */}
        {role && (
          <div className="flex justify-center mb-4">
            <div className="login-role-badge">
              <Shield size={14} />
              Logged in as {role}
            </div>
          </div>
        )}

        {/* Login Form */}
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
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input
              prefix={<Mail size={16} className="text-gray-400 mr-1" />}
              placeholder="Enter your email"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              prefix={<Lock size={16} className="text-gray-400 mr-1" />}
              placeholder="Enter your password"
              size="large"
            />
          </Form.Item>

          {/* Remember Me */}
          <Form.Item className="mb-3">
            <Checkbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            >
              <span className="text-sm text-gray-600">Remember me</span>
            </Checkbox>
          </Form.Item>

          {/* Submit Button */}
          <Form.Item className="mb-0">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
              icon={<LogIn size={16} />}
              style={{
                backgroundColor: "var(--RoyalBlue)",
                borderColor: "var(--RoyalBlue)",
              }}
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>

        {/* Links */}
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
          <Link
            to="/register"
            className="text-sm font-medium hover:underline transition"
            style={{ color: "var(--RoyalBlue)" }}
          >
            Register
          </Link>
          <Link
            to="/forgot-password"
            className="text-sm font-medium hover:underline transition"
            style={{ color: "var(--RoyalBlue)" }}
          >
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
