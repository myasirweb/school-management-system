import React, { useState } from "react";
import { Avatar, Button, Divider, Tag, Breadcrumb, ConfigProvider } from "antd";
import { Mail, Phone, Download, MapPin, User, Calendar, Clock, ClipboardList, Wallet, BookOpen } from "lucide-react";

const teacherData = {
  id: "T849127",
  name: "Teresa",
  avatar: "https://i.pravatar.cc/100?img=32",
  status: "Active",
  subject: "Physics",
  designation: "Senior Teacher",
  department: "Science",
  phone: "+1 82392 37359",
  email: "teresa@example.com",
  documents: ["Resume.pdf", "Certifications.pdf"],
  currentAddress: "123 Main Street, City, Country",
  permanentAddress: "123 Main Street, City, Country",
  bankName: "Bank of Example",
  branch: "Central",
  ifsc: "EXAMP000123",
};

const SectionCard = ({ title, children }) => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
    <div className="px-5 py-4 border-b border-gray-100">
      <h4 className="text-sm font-bold text-gray-800 uppercase">{title}</h4>
    </div>
    <div className="p-5">{children}</div>
  </div>
);

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between py-2 text-[13px]">
    <span className="text-gray-500">{label}</span>
    <span className="font-semibold text-gray-800">{value}</span>
  </div>
);

const DetailField = ({ label, value }) => (
  <div>
    <div className="text-[11px] uppercase text-gray-400 font-semibold mb-1">{label}</div>
    <div className="text-[14px] font-semibold text-gray-800">{value}</div>
  </div>
);

const TeacherDetailPage = () => {
  const [activeTab, setActiveTab] = useState("1");

  const tabs = [
    { key: "1", label: "Profile", icon: <User size={16} /> },
    { key: "2", label: "Time Table", icon: <Clock size={16} /> },
    { key: "3", label: "Attendance", icon: <Calendar size={16} /> },
    { key: "4", label: "Payroll", icon: <Wallet size={16} /> },
    { key: "5", label: "Documents", icon: <ClipboardList size={16} /> },
  ];

  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#3d5ee1", borderRadius: 10, fontFamily: "Inter, sans-serif" } }}>
      <div className="min-h-screen bg-[#f7f8f9] p-6">
        <div className="max-w-7xl mx-auto space-y-6">

          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Teacher Details</h1>
              <Breadcrumb className="mt-1 text-xs" items={[{ title: "Dashboard" }, { title: "Teachers" }, { title: "Details" }]} />
            </div>

            <div className="flex gap-3">
              <Button>Login Details</Button>
              <Button type="primary">Edit Teacher</Button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 md:p-6">
            <div className="flex flex-col xl:flex-row gap-6 items-start">

              <div className="w-full xl:w-[320px] space-y-6">
                <div className="bg-white rounded-xl border p-6 text-center">
                  <Avatar src={teacherData.avatar} size={96} className="mb-3 border-4 border-white shadow" />
                  <h2 className="text-lg font-bold">{teacherData.name}</h2>
                  <p className="text-sm text-[#3d5ee1] font-semibold">{teacherData.id}</p>

                  <Tag color="success" className="mt-2">{teacherData.status}</Tag>

                  <Divider />

                  <InfoRow label="Subject" value={teacherData.subject} />
                  <InfoRow label="Designation" value={teacherData.designation} />
                  <InfoRow label="Department" value={teacherData.department} />

                  <Button type="primary" block className="mt-4">Assign Class</Button>
                </div>

                <SectionCard title="Contact Info">
                  <div className="space-y-4">
                    <div className="flex gap-3 items-center"><Phone size={16} /><span className="text-sm">{teacherData.phone}</span></div>
                    <div className="flex gap-3 items-center"><Mail size={16} /><span className="text-sm">{teacherData.email}</span></div>
                  </div>
                </SectionCard>
              </div>

              <div className="flex-1 space-y-6">

                <div className="bg-white rounded-xl border sticky top-0 z-10">
                  <div className="flex overflow-x-auto">
                    {tabs.map((tab) => (
                      <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold border-b-2 transition ${activeTab === tab.key ? "border-[#3d5ee1] text-[#3d5ee1]" : "border-transparent text-gray-500"}`}>
                        {tab.icon}
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                <SectionCard title="Documents">
                  {teacherData.documents.map((doc, i) => (
                    <div key={i} className="flex justify-between items-center border p-3 rounded-lg mb-2">
                      <div className="flex gap-3 items-center"><BookOpen size={18} /><span>{doc}</span></div>
                      <Download size={16} />
                    </div>
                  ))}
                </SectionCard>

                <div className="grid md:grid-cols-2 gap-6">
                  <SectionCard title="Address">
                    <div className="space-y-4">
                      <div className="flex gap-2"><MapPin size={16} /><span>{teacherData.currentAddress}</span></div>
                      <div className="flex gap-2"><MapPin size={16} /><span>{teacherData.permanentAddress}</span></div>
                    </div>
                  </SectionCard>

                  <SectionCard title="Bank Details">
                    <DetailField label="Bank" value={teacherData.bankName} />
                    <DetailField label="Branch" value={teacherData.branch} />
                    <DetailField label="IFSC" value={teacherData.ifsc} />
                  </SectionCard>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default TeacherDetailPage;
