import React, { useState } from "react";
import { Button } from "antd";

const Field = ({ label, ...rest }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-600">{label}</label>
    <input className="border rounded-md px-3 py-2 text-sm" {...rest} />
  </div>
);

const AssignCourse = ({ onCancel }) => {
  const [form, setForm] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Assign Data:", form);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded border p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Course ID / Code" placeholder="Enter course code" onChange={(e) => setForm((p) => ({ ...p, course: e.target.value }))} />
        <Field label="Student ID / Name" placeholder="Enter student id or name" onChange={(e) => setForm((p) => ({ ...p, student: e.target.value }))} />
        <Field label="Assigned Date" type="date" onChange={(e) => setForm((p) => ({ ...p, assignedDate: e.target.value }))} />
        <Field label="Due Date" type="date" onChange={(e) => setForm((p) => ({ ...p, dueDate: e.target.value }))} />
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="primary" htmlType="submit">Assign</Button>
      </div>
    </form>
  );
};

export default AssignCourse;
