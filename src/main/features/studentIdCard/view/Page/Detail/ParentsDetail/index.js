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

const ParentCard = ({ title, data, extra }) => (
  <div
    className="bg-white rounded-lg overflow-hidden"
    style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}
  >
    <div
      className="px-6 py-3 flex items-center justify-between"
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
      {extra}
    </div>
    <div className="p-5 grid grid-cols-2 gap-x-6 gap-y-4">
      <InfoRow label="Full Name" value={data?.name} />
      <InfoRow label="Occupation" value={data?.occupation} />
      <InfoRow label="Phone" value={data?.phone} />
      <InfoRow label="Email" value={data?.email} />
      <InfoRow label="CNIC" value={data?.cnic} />
      {data?.employer && <InfoRow label="Employer" value={data?.employer} />}
      {data?.relation && <InfoRow label="Relation" value={data?.relation} />}
      {data?.address && <InfoRow label="Address" value={data?.address} />}
    </div>
  </div>
);

const ParentsDetail = ({ student }) => (
  <div className="p-5 flex flex-col gap-4">
    <ParentCard title="Father's Information" data={student.father} />
    <ParentCard title="Mother's Information" data={student.mother} />
    <ParentCard
      title="Guardian Information"
      data={student.guardian}
      extra={
        student.guardian?.isPrimary && (
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{
              backgroundColor: "rgba(255,255,255,0.2)",
              color: "#fff",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            Primary Contact
          </span>
        )
      }
    />
  </div>
);

export default ParentsDetail;
