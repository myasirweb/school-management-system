import React from "react";
import { Button, Alert } from "antd";
import { CheckCircle } from "lucide-react";
import { roleFieldConfigs, roleOptions } from "../../utils/registrationHelper";

const ReviewSubmit = ({
  selectedRole,
  commonData,
  roleData,
  loading,
  success,
  error,
  onBack,
  onSubmit,
}) => {
  const roleConfig = roleFieldConfigs[selectedRole] || [];
  const roleInfo = roleOptions.find((r) => r.key === selectedRole);

  /* ── Success screen ── */
  if (success) {
    return (
      <div className="text-center py-5">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} color="#22c55e" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Registration Successful!
        </h3>
        <p className="text-sm text-gray-500">
          Your account has been created. You will be redirected to the login
          page shortly.
        </p>
        <div className="mt-4">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
            style={{
              backgroundColor: "var(--BlueHaze)",
              color: "var(--RoyalBlue)",
            }}
          >
            {roleInfo && <roleInfo.icon size={16} />}
            Registered as {selectedRole}
          </div>
        </div>
      </div>
    );
  }

  const formatValue = (value) => {
    if (Array.isArray(value)) return value.join(", ");
    if (!value) return "—";
    return value;
  };

  /* ── Reusable review section ── */
  const ReviewSection = ({ title, rows }) => (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-4">
      <h4
        className="text-xs font-bold uppercase tracking-wide pb-3 mb-3 border-b border-gray-200 m-0"
        style={{ color: "var(--RoyalBlue)" }}
      >
        {title}
      </h4>
      {rows.map(({ label, value }, i) => (
        <div
          key={i}
          className={`flex justify-between items-start py-2 ${
            i < rows.length - 1 ? "border-b border-gray-100" : ""
          }`}
        >
          <span className="text-sm text-gray-500 shrink-0 min-w-[140px]">
            {label}
          </span>
          <span className="text-sm font-semibold text-gray-800 text-right break-words ml-4">
            {value}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Review Your Details
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Please verify all information before submitting
        </p>
      </div>

      {error && (
        <Alert message={error} type="error" showIcon className="mb-4" />
      )}

      <ReviewSection
        title="Account Type"
        rows={[{ label: "Role", value: selectedRole }]}
      />

      <ReviewSection
        title="Personal Information"
        rows={[
          { label: "Full Name", value: commonData.fullName },
          { label: "Email", value: commonData.email },
          { label: "Phone", value: commonData.phone },
          {
            label: "Password",
            value: "•".repeat(commonData.password.length),
          },
          ...(commonData.profilePhoto
            ? [{ label: "Profile Photo", value: commonData.profilePhoto }]
            : []),
        ]}
      />

      {roleConfig.length > 0 && (
        <ReviewSection
          title={`${selectedRole} Details`}
          rows={roleConfig.map((field) => ({
            label: field.label,
            value: formatValue(roleData[field.name]),
          }))}
        />
      )}

      {/* Action Buttons */}
      <div className="flex justify-between gap-3 pt-4 border-t mt-4">
        <Button size="large" onClick={onBack}>
          Edit Details
        </Button>
        <Button
          type="primary"
          size="large"
          loading={loading}
          onClick={onSubmit}
          style={{
            backgroundColor: "var(--RoyalBlue)",
            borderColor: "var(--RoyalBlue)",
          }}
        >
          Submit Registration
        </Button>
      </div>
    </div>
  );
};

export default ReviewSubmit;
