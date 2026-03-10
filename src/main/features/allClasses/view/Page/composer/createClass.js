import React, { useState } from "react";
import { Button } from "antd";

const Field = ({ label, ...rest }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-600">{label}</label>
    <input className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2" style={{ "--tw-ring-color": "var(--RoyalBlue)" }} {...rest} />
  </div>
);

const SelectField = ({ label, options = [] }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-600">{label}</label>
    <select className="border rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2" style={{ "--tw-ring-color": "var(--RoyalBlue)" }}>
      <option>-- Select {label} --</option>
      {options.map((o, i) => (
        <option key={i} value={o}>
          {o}
        </option>
      ))}
    </select>
  </div>
);

const CreateClass = ({ onCancel }) => {
  const [form, setForm] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Class Form:", form);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg border p-6 space-y-5">
      <div className="border-b pb-4">
        <h3 className="text-lg font-bold text-gray-900">Create New Class</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Field label="Class Name" placeholder="e.g., Class X-A" onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
        <SelectField label="Class Level" options={["6", "7", "8", "9", "10", "11", "12"]} />
        <SelectField label="Section" options={["A", "B", "C", "D", "E"]} />
        <Field label="Room Number" placeholder="e.g., Block-A, Room 101" onChange={(e) => setForm((p) => ({ ...p, room: e.target.value }))} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Class Teacher" placeholder="Select teacher name" onChange={(e) => setForm((p) => ({ ...p, teacher: e.target.value }))} />
        <Field label="Total Strength" type="number" placeholder="e.g., 45" onChange={(e) => setForm((p) => ({ ...p, strength: e.target.value }))} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Class Timings" placeholder="e.g., 08:00 AM - 2:00 PM" onChange={(e) => setForm((p) => ({ ...p, timings: e.target.value }))} />
        <Field label="Session Start Date" type="date" onChange={(e) => setForm((p) => ({ ...p, startDate: e.target.value }))} />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="primary" htmlType="submit" style={{ backgroundColor: "var(--RoyalBlue)" }}>
          Create Class
        </Button>
      </div>
    </form>
  );
};

export default CreateClass;
