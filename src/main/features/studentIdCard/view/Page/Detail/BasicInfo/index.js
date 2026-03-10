const InfoRow = ({ label, value }) => (
  <div className="flex flex-col gap-0.5">
    <span
      className="text-xs text-gray-400 font-medium"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      {label}
    </span>
    <span
      className="text-sm text-gray-800 font-medium"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      {value || "—"}
    </span>
  </div>
);

const SectionCard = ({ title, children }) => (
  <div
    className="bg-white rounded-lg overflow-hidden"
    style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}
  >
    <div
      className="px-6 py-3"
      style={{
        background: "linear-gradient(135deg, rgb(82,107,177), rgb(69,198,238))",
      }}
    >
      <span
        className="text-sm font-bold text-white"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        {title}
      </span>
    </div>
    <div className="p-5">{children}</div>
  </div>
);

const BasicInfo = ({ student }) => (
  <div className="p-5 flex flex-col gap-4">
    {/* Profile header */}
    <SectionCard title="Personal Information">
      <div className="flex gap-5">
        <img
          src={student.profilePhoto}
          alt={student.fullName}
          className="w-20 h-20 rounded-full object-cover shrink-0"
          style={{ border: "3px solid rgb(82,107,177)" }}
        />
        <div className="flex flex-col justify-center gap-1">
          <div
            className="text-xl font-bold text-gray-800"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {student.fullName}
          </div>
          <div
            className="text-sm text-gray-500"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {student.studentId}
          </div>
          <div
            className="mt-1 px-2 py-0.5 rounded-full text-white text-xs font-bold self-start"
            style={{
              backgroundColor:
                student.status === "Active"
                  ? "rgb(34,197,94)"
                  : "rgb(156,163,175)",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            {student.status}
          </div>
        </div>
      </div>
    </SectionCard>

    {/* Personal details grid */}
    <div
      className="bg-white rounded-lg p-5"
      style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}
    >
      <div className="grid grid-cols-3 gap-x-6 gap-y-4">
        <InfoRow label="Gender" value={student.gender} />
        <InfoRow label="Date of Birth" value={student.dateOfBirth} />
        <InfoRow label="Age" value={`${student.age} years`} />
        <InfoRow label="Blood Group" value={student.bloodGroup} />
        <InfoRow label="Nationality" value={student.nationality} />
        <InfoRow label="Religion" value={student.religion} />
        <InfoRow label="Email" value={student.email} />
        <InfoRow label="Phone" value={student.phone} />
        <InfoRow label="City" value={student.city} />
        <InfoRow label="Address" value={student.address} />
      </div>
    </div>

    {/* Academic details */}
    <div
      className="bg-white rounded-lg p-5"
      style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}
    >
      <div
        className="text-sm font-bold text-gray-700 mb-4"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        Academic Information
      </div>
      <div className="grid grid-cols-3 gap-x-6 gap-y-4">
        <InfoRow label="Class" value={student.className} />
        <InfoRow label="Section" value={student.section} />
        <InfoRow label="Roll Number" value={student.rollNumber} />
        <InfoRow label="Academic Year" value={student.academicYear} />
        <InfoRow label="GPA" value={student.gpa} />
        <InfoRow label="Grade" value={student.grade} />
        <InfoRow label="Enrollment Date" value={student.enrollmentDate} />
      </div>
    </div>
  </div>
);

export default BasicInfo;
