import React, { useState } from "react";
import { Button } from "antd";
import { X } from "lucide-react";

const Card = ({ children }) => (
  <div className="bg-white rounded border shadow-sm">
    {children}
  </div>
);

const Section = ({ title, children }) => (
  <div className="px-5 py-5">
    <h3 className="text-[15px] font-semibold text-gray-800 mb-4">
      {title}
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {children}
    </div>

    {/* SECTION SEPARATOR */}
    <div className="mt-6 border-t" />
  </div>
);

const Field = ({ label, type = "text", placeholder }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-600">
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      className="
        border rounded-md px-3 py-2 text-sm
        focus:outline-none focus:ring-1 focus:ring-blue-500
      "
    />
  </div>
);

const SelectField = ({ label, options = [] }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-600">
      {label}
    </label>
    <select
      className="
        border rounded-md px-3 py-2 text-sm bg-white
        focus:outline-none focus:ring-1 focus:ring-blue-500
      "
    >
      <option value="">-- Select {label} --</option>
      {options.map((opt, idx) => (
        <option key={idx} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const TextAreaField = ({ label, placeholder, rows = 4 }) => (
  <div className="flex flex-col gap-1 col-span-2">
    <label className="text-sm font-medium text-gray-600">
      {label}
    </label>
    <textarea
      placeholder={placeholder}
      rows={rows}
      className="
        border rounded-md px-3 py-2 text-sm
        focus:outline-none focus:ring-1 focus:ring-blue-500
      "
    />
  </div>
);

const CreateCourse = ({ onCancel }) => {
  const [formData, setFormData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Course Data:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Card>
        <Section title="Course Information">
          <Field label="Course Code" placeholder="e.g., CS101" />
          <Field label="Course Name" placeholder="e.g., Computer Science" />
          <Field label="Instructor Name" placeholder="Enter instructor name" />
          <SelectField
            label="Semester"
            options={[
              "Fall 2024",
              "Spring 2025",
              "Summer 2024",
              "Winter 2024",
            ]}
          />
        </Section>

        <Section title="Course Details">
          <Field label="Credits" type="number" placeholder="e.g., 3" />
          <SelectField
            label="Status"
            options={["Active", "Completed", "Pending"]}
          />
          <Field label="Start Date" type="date" />
          <Field label="End Date" type="date" />
        </Section>

        <Section title="Academic Information">
          <SelectField
            label="Grade"
            options={["A+", "A", "A-", "B+", "B", "B-", "C", "D", "F"]}
          />
          <Field label="Progress (%)" type="number" placeholder="0-100" />
          <Field label="Mid Term Grade" type="text" placeholder="Enter grade" />
          <Field label="Final Grade" type="text" placeholder="Enter grade" />
        </Section>

        <div className="px-5 py-5">
          <TextAreaField
            label="Description"
            placeholder="Enter course description..."
            rows={3}
          />
        </div>

        {/* ACTION BUTTONS */}
        <div className="px-5 py-4 border-t flex justify-end gap-3">
          <Button onClick={onCancel} className="px-6">
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" className="px-6">
            Add Course
          </Button>
        </div>
      </Card>
    </form>
  );
};

export default CreateCourse;
