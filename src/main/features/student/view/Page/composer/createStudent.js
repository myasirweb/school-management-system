import React from "react";

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
      <option value="">Select</option>
      {options.map((opt, i) => (
        <option key={i} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const Textarea = ({ label }) => (
  <div className="col-span-full flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-600">
      {label}
    </label>
    <textarea
      rows={3}
      className="
        w-full border rounded-md px-3 py-2 text-sm
        focus:outline-none focus:ring-1 focus:ring-blue-500
      "
    />
  </div>
);

/* =========================
   MAIN FORM COMPONENT
========================= */

const CreateStudent = ({ onCancel }) => {
  return (
    <div>
      <Card>

        {/* PERSONAL INFORMATION */}
        <Section title="Personal Information">
          <SelectField label="Academic Year" />
          <Field label="Admission Number" />
          <Field label="Admission Date" type="date" />
          <Field label="Roll Number" />

          <Field label="First Name" />
          <Field label="Last Name" />
          <SelectField label="Class" />
          <SelectField label="Section" />

          <Field label="Date of Birth" type="date" />
          <SelectField label="Gender" options={["Male", "Female"]} />
          <SelectField label="Blood Group" />
          <SelectField label="Religion" />

          <Field label="Primary Contact Number" />
          <Field label="Email Address" />
          <SelectField label="Category" />
          <SelectField label="House" />
        </Section>

        {/* PARENTS & GUARDIAN */}
        <Section title="Parents & Guardian Information">
          <Field label="Father Name" />
          <Field label="Father Email" />
          <Field label="Father Phone" />
          <Field label="Father Occupation" />

          <Field label="Mother Name" />
          <Field label="Mother Email" />
          <Field label="Mother Phone" />
          <Field label="Mother Occupation" />

          <Field label="Guardian Name" />
          <Field label="Guardian Relation" />
          <Field label="Guardian Phone" />
          <Field label="Guardian Email" />
        </Section>

        {/* ADDRESS */}
        <Section title="Address">
          <Textarea label="Current Address" />
          <Textarea label="Permanent Address" />
        </Section>

        {/* TRANSPORT */}
        <Section title="Transport Information">
          <SelectField label="Route" />
          <SelectField label="Vehicle Number" />
          <SelectField label="Pickup Point" />
        </Section>

        {/* HOSTEL */}
        <Section title="Hostel Information">
          <SelectField label="Hostel" />
          <SelectField label="Room Number" />
        </Section>

        {/* MEDICAL */}
        <Section title="Medical History">
          <SelectField
            label="Medical Condition"
            options={["Good", "Bad", "Other"]}
          />
          <Field label="Allergies" />
          <Field label="Medications" />
        </Section>

        {/* PREVIOUS SCHOOL */}
        <Section title="Previous School Details">
          <Field label="School Name" />
          <Field label="School Address" />
        </Section>

        {/* OTHER DETAILS */}
        <Section title="Other Details">
          <Field label="Bank Name" />
          <Field label="Branch" />
          <Field label="IFSC Code" />
          <Field label="Other Information" />
        </Section>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-3 px-5 py-4">
          <button
            onClick={onCancel}
            className="px-5 py-2 border rounded-md text-sm"
          >
            Cancel
          </button>
          <button
            className="px-5 py-2 bg-blue-600 text-white rounded-md text-sm"
          >
            Add Student
          </button>
        </div>

      </Card>
    </div>
  );
};

export default CreateStudent;
