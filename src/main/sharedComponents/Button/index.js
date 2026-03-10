import React from "react";

const variants = {
  primary: {
    backgroundColor: "var(--RoyalBlue)",
    color: "#ffffff",
    borderColor: "var(--RoyalBlue)",
  },
  secondary: {
    backgroundColor: "#ffffff",
    color: "var(--RoyalBlue)",
    borderColor: "var(--RoyalBlue)",
  },
  danger: {
    backgroundColor: "#ef4444",
    color: "#ffffff",
    borderColor: "#ef4444",
  },
};

const sizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

const SharedButton = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  loading = false,
  type = "button",
  onClick,
  className = "",
  style = {},
  ...rest
}) => {
  const variantStyle = variants[variant] || variants.primary;
  const sizeClass = sizes[size] || sizes.md;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        inline-flex items-center justify-center gap-2
        font-semibold rounded-lg border transition duration-200
        hover:opacity-90 active:scale-[0.98]
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizeClass}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      style={{ ...variantStyle, ...style }}
      {...rest}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};

export default SharedButton;
