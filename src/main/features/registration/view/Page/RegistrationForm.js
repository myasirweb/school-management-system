import React, { useState } from "react";
import { User, Mail, Phone, Lock, Camera } from "lucide-react";
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Upload,
} from "antd";
import {
  roleFieldConfigs,
  getPasswordStrength,
  validateCommonFields,
  validateRoleFields,
  roleOptions,
} from "../../utils/registrationHelper";

const RegistrationForm = ({
  selectedRole,
  commonData,
  roleData,
  onCommonChange,
  onRoleChange,
  onBack,
  onNext,
}) => {
  const [errors, setErrors] = useState({});
  const roleConfig = roleFieldConfigs[selectedRole] || [];
  const passwordStrength = getPasswordStrength(commonData.password);
  const roleInfo = roleOptions.find((r) => r.key === selectedRole);

  const handleValidateAndNext = () => {
    const commonErrors = validateCommonFields(commonData);
    const roleErrors = validateRoleFields(roleData, selectedRole);
    const allErrors = { ...commonErrors, ...roleErrors };

    setErrors(allErrors);

    if (Object.keys(allErrors).length === 0) {
      onNext();
    }
  };

  /* ── Field renderer for role-specific fields ── */
  const renderRoleField = (field) => {
    const value = roleData[field.name];
    const fieldError = errors[field.name];

    const label = (
      <span>
        {field.label}
        {field.required && (
          <span className="text-red-400 ml-0.5">*</span>
        )}
      </span>
    );

    switch (field.type) {
      case "select":
        return (
          <Form.Item
            key={field.name}
            label={label}
            validateStatus={fieldError ? "error" : ""}
            help={fieldError}
          >
            <Select
              value={value || undefined}
              onChange={(val) => onRoleChange({ [field.name]: val })}
              placeholder={field.placeholder || `Select ${field.label}`}
              size="large"
              options={field.options.map((opt) => ({
                value: opt,
                label: opt,
              }))}
            />
          </Form.Item>
        );

      case "textarea":
        return (
          <Form.Item
            key={field.name}
            label={label}
            validateStatus={fieldError ? "error" : ""}
            help={fieldError}
          >
            <Input.TextArea
              value={value || ""}
              onChange={(e) => onRoleChange({ [field.name]: e.target.value })}
              placeholder={field.placeholder}
              rows={3}
              size="large"
            />
          </Form.Item>
        );

      case "multiselect":
        return (
          <Form.Item
            key={field.name}
            label={label}
            validateStatus={fieldError ? "error" : ""}
            help={fieldError}
          >
            <Select
              mode="multiple"
              value={value || []}
              onChange={(val) => onRoleChange({ [field.name]: val })}
              placeholder={field.placeholder || `Select ${field.label}`}
              size="large"
              options={field.options.map((opt) => ({
                value: opt,
                label: opt,
              }))}
            />
          </Form.Item>
        );

      case "date":
        return (
          <Form.Item
            key={field.name}
            label={label}
            validateStatus={fieldError ? "error" : ""}
            help={fieldError}
          >
            <DatePicker
              style={{ width: "100%" }}
              size="large"
              onChange={(_, dateString) =>
                onRoleChange({ [field.name]: dateString })
              }
              format="YYYY-MM-DD"
              placeholder={`Select ${field.label}`}
            />
          </Form.Item>
        );

      default:
        return (
          <Form.Item
            key={field.name}
            label={label}
            validateStatus={fieldError ? "error" : ""}
            help={fieldError}
          >
            <Input
              type={field.type === "number" ? "number" : "text"}
              value={value || ""}
              onChange={(e) => onRoleChange({ [field.name]: e.target.value })}
              placeholder={field.placeholder}
              size="large"
            />
          </Form.Item>
        );
    }
  };

  return (
    <div>
      {/* Selected role badge + Change Role link */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          {roleInfo && (
            <>
              <roleInfo.icon size={18} style={{ color: roleInfo.color }} />
              <span
                className="text-sm font-bold"
                style={{ color: roleInfo.color }}
              >
                {roleInfo.label} Registration
              </span>
            </>
          )}
        </div>
        <Button
          type="link"
          onClick={onBack}
          size="small"
          style={{ color: "var(--RoyalBlue)", padding: 0 }}
        >
          Change Role
        </Button>
      </div>

      <Form layout="vertical" requiredMark={false}>
        {/* ── Personal Information ── */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide pb-2 border-b mb-4">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <Form.Item
              label="Full Name *"
              validateStatus={errors.fullName ? "error" : ""}
              help={errors.fullName}
            >
              <Input
                prefix={<User size={16} className="text-gray-400 mr-1" />}
                placeholder="Enter your full name"
                value={commonData.fullName}
                onChange={(e) => onCommonChange({ fullName: e.target.value })}
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="Email Address *"
              validateStatus={errors.email ? "error" : ""}
              help={errors.email}
            >
              <Input
                prefix={<Mail size={16} className="text-gray-400 mr-1" />}
                placeholder="Enter your email"
                type="email"
                value={commonData.email}
                onChange={(e) => onCommonChange({ email: e.target.value })}
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="Phone Number *"
              validateStatus={errors.phone ? "error" : ""}
              help={errors.phone}
              className="md:col-span-2"
            >
              <Input
                prefix={<Phone size={16} className="text-gray-400 mr-1" />}
                placeholder="e.g., +1 234 567 8901"
                value={commonData.phone}
                onChange={(e) => onCommonChange({ phone: e.target.value })}
                size="large"
              />
            </Form.Item>
          </div>

          {/* Password row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <div>
              <Form.Item
                label="Password *"
                validateStatus={errors.password ? "error" : ""}
                help={errors.password}
              >
                <Input.Password
                  prefix={<Lock size={16} className="text-gray-400 mr-1" />}
                  placeholder="Minimum 6 characters"
                  value={commonData.password}
                  onChange={(e) =>
                    onCommonChange({ password: e.target.value })
                  }
                  size="large"
                />
              </Form.Item>

              {/* Password strength bar */}
              {commonData.password && (
                <div className="-mt-4 mb-4">
                  <div className="h-1 rounded bg-gray-200 overflow-hidden">
                    <div
                      className="h-full rounded transition-all duration-300"
                      style={{
                        width: passwordStrength.width,
                        backgroundColor: passwordStrength.color,
                      }}
                    />
                  </div>
                  <div
                    className="text-xs font-semibold mt-1 text-right"
                    style={{ color: passwordStrength.color }}
                  >
                    {passwordStrength.level}
                  </div>
                </div>
              )}
            </div>

            <Form.Item
              label="Confirm Password *"
              validateStatus={errors.confirmPassword ? "error" : ""}
              help={errors.confirmPassword}
            >
              <Input.Password
                prefix={<Lock size={16} className="text-gray-400 mr-1" />}
                placeholder="Re-enter your password"
                value={commonData.confirmPassword}
                onChange={(e) =>
                  onCommonChange({ confirmPassword: e.target.value })
                }
                size="large"
              />
            </Form.Item>
          </div>

          {/* Profile Photo */}
          <Form.Item label="Profile Photo (optional)">
            <Upload
              accept="image/*"
              maxCount={1}
              beforeUpload={(file) => {
                onCommonChange({ profilePhoto: file.name });
                return false;
              }}
              showUploadList={!!commonData.profilePhoto}
            >
              <Button icon={<Camera size={16} />}>Choose Photo</Button>
            </Upload>
            {commonData.profilePhoto && (
              <span className="text-xs text-gray-500 mt-1 block">
                Selected: {commonData.profilePhoto}
              </span>
            )}
          </Form.Item>
        </div>

        {/* ── Role-Specific Fields ── */}
        {roleConfig.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide pb-2 border-b mb-4">
              {selectedRole} Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
              {roleConfig.map((field) => {
                const isFullWidth =
                  field.type === "textarea" || field.type === "multiselect";

                if (isFullWidth) {
                  return (
                    <div key={field.name} className="md:col-span-2">
                      {renderRoleField(field)}
                    </div>
                  );
                }
                return renderRoleField(field);
              })}
            </div>
          </div>
        )}

        {/* ── Action Buttons ── */}
        <div className="flex justify-between gap-3 pt-4 border-t">
          <Button size="large" onClick={onBack}>
            Back
          </Button>
          <Button
            type="primary"
            size="large"
            onClick={handleValidateAndNext}
            style={{
              backgroundColor: "var(--RoyalBlue)",
              borderColor: "var(--RoyalBlue)",
            }}
          >
            Review & Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default RegistrationForm;
