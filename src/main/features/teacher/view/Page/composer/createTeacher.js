import React from "react";

const Card = ({ children }) => (
  <div className="bg-white rounded border shadow-sm">{children}</div>
);

const Section = ({ title, children }) => (
  <div className="px-5 py-5">
    <h3 className="text-[15px] font-semibold text-gray-800 mb-4">{title}</h3>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">{children}</div>

    <div className="mt-6 border-t" />
  </div>
);

const Field = ({ label, type = "text", placeholder }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-600">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
  </div>
);

const SelectField = ({ label, options = [] }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-600">{label}</label>
    <select className="border rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500">
      <option value="">Select</option>
      {options.map((opt, i) => (
        <option key={i} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

const Textarea = ({ label }) => (
  <div className="col-span-full flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-600">{label}</label>
    <textarea rows={3} className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
  </div>
);

const CreateTeacher = ({ onCancel }) => {
  return (
    <div>
      <Card>
        <Section title="Personal & Employment Information">
          <SelectField label="Academic Year" />
          <Field label="Employee ID" />
          <Field label="Joining Date" type="date" />
          <Field label="Designation" />

          <Field label="First Name" />
          <Field label="Last Name" />
          <SelectField label="Department" />
          <SelectField label="Subjects" />

          <Field label="Date of Birth" type="date" />
          <SelectField label="Gender" options={["Male", "Female"]} />
          <Field label="Primary Contact Number" />
          <Field label="Email Address" />
        </Section>

        <Section title="Address & Bank">
          <Textarea label="Current Address" />
          <Textarea label="Permanent Address" />

          <Field label="Bank Name" />
          <Field label="Branch" />
          <Field label="IFSC Code" />
        </Section>

        <Section title="Other Details">
          <Field label="Qualifications" />
          <Field label="Experience (years)" />
          <Field label="Other Information" />
        </Section>

        <div className="flex justify-end gap-3 px-5 py-4">
          <button onClick={onCancel} className="px-5 py-2 border rounded-md text-sm">Cancel</button>
          <button className="px-5 py-2 bg-blue-600 text-white rounded-md text-sm">Add Teacher</button>
        </div>
      </Card>
    </div>
  );
};

export default CreateTeacher;
