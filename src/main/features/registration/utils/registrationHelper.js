import { GraduationCap, BookOpen, Users, Shield, Wrench } from "lucide-react";

/**
 * Role definitions for the role selection cards
 */
export const roleOptions = [
  {
    key: "Student",
    label: "Student",
    icon: GraduationCap,
    description: "Enroll as a student",
    color: "#4c5df9",
  },
  {
    key: "Teacher",
    label: "Teacher",
    icon: BookOpen,
    description: "Join as a teacher",
    color: "#64C4B2",
  },
  {
    key: "Parent",
    label: "Parent",
    icon: Users,
    description: "Register as a parent/guardian",
    color: "#DA1D81",
  },
  {
    key: "Admin",
    label: "Admin",
    icon: Shield,
    description: "Administrative access",
    color: "#526BB1",
  },
  {
    key: "Staff",
    label: "Staff",
    icon: Wrench,
    description: "Cleaning, Security & Other staff",
    color: "#45C6EE",
  },
];

/**
 * Role-specific field configurations
 * Each field: { name, label, type, required, placeholder, options (for select) }
 */
export const roleFieldConfigs = {
  Student: [
    { name: "studentId", label: "Student ID / Roll Number", type: "text", required: true, placeholder: "e.g., STD-2024-001" },
    {
      name: "classGrade",
      label: "Class / Grade",
      type: "select",
      required: true,
      placeholder: "Select class",
      options: ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"],
    },
    {
      name: "section",
      label: "Section",
      type: "select",
      required: true,
      placeholder: "Select section",
      options: ["A", "B", "C", "D"],
    },
    { name: "dateOfBirth", label: "Date of Birth", type: "date", required: true, placeholder: "" },
    {
      name: "gender",
      label: "Gender",
      type: "select",
      required: true,
      placeholder: "Select gender",
      options: ["Male", "Female", "Other"],
    },
    { name: "guardianName", label: "Parent/Guardian Name", type: "text", required: true, placeholder: "Enter guardian name" },
    { name: "guardianPhone", label: "Parent/Guardian Phone", type: "tel", required: true, placeholder: "e.g., +1 234 567 8901" },
    { name: "address", label: "Address", type: "textarea", required: true, placeholder: "Enter full address" },
  ],

  Teacher: [
    { name: "employeeId", label: "Employee ID", type: "text", required: true, placeholder: "e.g., TCH-2024-001" },
    {
      name: "department",
      label: "Department",
      type: "select",
      required: true,
      placeholder: "Select department",
      options: ["Mathematics", "Science", "English", "Urdu", "Computer Science", "Social Studies", "Arts", "Physical Education", "Other"],
    },
    {
      name: "qualification",
      label: "Qualification",
      type: "select",
      required: true,
      placeholder: "Select qualification",
      options: ["Bachelor's", "Master's", "PhD", "Other"],
    },
    {
      name: "subjects",
      label: "Subjects",
      type: "multiselect",
      required: true,
      placeholder: "Select subjects",
      options: ["Math", "Science", "English", "Urdu", "Computer", "Social Studies", "Arts", "PE"],
    },
    { name: "dateOfJoining", label: "Date of Joining", type: "date", required: true, placeholder: "" },
    { name: "experience", label: "Experience (Years)", type: "number", required: false, placeholder: "e.g., 5" },
    {
      name: "gender",
      label: "Gender",
      type: "select",
      required: true,
      placeholder: "Select gender",
      options: ["Male", "Female", "Other"],
    },
    { name: "address", label: "Address", type: "textarea", required: true, placeholder: "Enter full address" },
  ],

  Parent: [
    {
      name: "relation",
      label: "Relation to Student",
      type: "select",
      required: true,
      placeholder: "Select relation",
      options: ["Father", "Mother", "Guardian", "Other"],
    },
    { name: "studentName", label: "Student Name", type: "text", required: true, placeholder: "Enter student's full name" },
    { name: "studentRollNumber", label: "Student Roll Number", type: "text", required: true, placeholder: "e.g., STD-2024-001" },
    { name: "occupation", label: "Occupation", type: "text", required: false, placeholder: "Enter occupation" },
    { name: "address", label: "Address", type: "textarea", required: true, placeholder: "Enter full address" },
  ],

  Admin: [
    { name: "employeeId", label: "Employee ID", type: "text", required: true, placeholder: "e.g., ADM-2024-001" },
    {
      name: "adminRole",
      label: "Admin Role",
      type: "select",
      required: true,
      placeholder: "Select admin role",
      options: ["Super Admin", "Academic Admin", "Finance Admin", "HR Admin"],
    },
    { name: "department", label: "Department", type: "text", required: true, placeholder: "Enter department" },
    { name: "dateOfJoining", label: "Date of Joining", type: "date", required: true, placeholder: "" },
    {
      name: "gender",
      label: "Gender",
      type: "select",
      required: true,
      placeholder: "Select gender",
      options: ["Male", "Female", "Other"],
    },
    { name: "address", label: "Address", type: "textarea", required: true, placeholder: "Enter full address" },
  ],

  Staff: [
    { name: "employeeId", label: "Employee ID", type: "text", required: true, placeholder: "e.g., STF-2024-001" },
    {
      name: "staffType",
      label: "Staff Type",
      type: "select",
      required: true,
      placeholder: "Select staff type",
      options: ["Cleaning", "Security", "Maintenance", "Cafeteria", "Transport", "Other"],
    },
    {
      name: "shift",
      label: "Shift",
      type: "select",
      required: true,
      placeholder: "Select shift",
      options: ["Morning", "Evening", "Night", "Full Day"],
    },
    { name: "dateOfJoining", label: "Date of Joining", type: "date", required: true, placeholder: "" },
    {
      name: "gender",
      label: "Gender",
      type: "select",
      required: true,
      placeholder: "Select gender",
      options: ["Male", "Female", "Other"],
    },
    { name: "address", label: "Address", type: "textarea", required: true, placeholder: "Enter full address" },
  ],
};

/**
 * Validate email format
 */
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Get password strength: weak, medium, strong
 */
export const getPasswordStrength = (password) => {
  if (!password) return { level: "", color: "", width: "0%" };

  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return { level: "Weak", color: "#ef4444", width: "33%" };
  if (score <= 3) return { level: "Medium", color: "#f59e0b", width: "66%" };
  return { level: "Strong", color: "#22c55e", width: "100%" };
};

/**
 * Validate common fields
 */
export const validateCommonFields = (form) => {
  const errors = {};

  if (!form.fullName?.trim()) errors.fullName = "Full name is required";
  if (!form.email?.trim()) {
    errors.email = "Email is required";
  } else if (!validateEmail(form.email)) {
    errors.email = "Invalid email format";
  }
  if (!form.phone?.trim()) errors.phone = "Phone number is required";
  if (!form.password) {
    errors.password = "Password is required";
  } else if (form.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }
  if (!form.confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

/**
 * Validate role-specific fields
 */
export const validateRoleFields = (roleData, role) => {
  const errors = {};
  const fields = roleFieldConfigs[role] || [];

  fields.forEach((field) => {
    if (field.required) {
      const value = roleData[field.name];
      if (field.type === "multiselect") {
        if (!value || value.length === 0) {
          errors[field.name] = `${field.label} is required`;
        }
      } else if (!value || (typeof value === "string" && !value.trim())) {
        errors[field.name] = `${field.label} is required`;
      }
    }
  });

  return errors;
};

/**
 * Generate unique user ID
 */
export const generateUserId = () => {
  return `REG-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
};
