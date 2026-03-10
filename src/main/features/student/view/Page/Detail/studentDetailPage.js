import React, { useState } from "react";
import {
  Avatar,
  Button,
  Divider,
  Tag,
  Breadcrumb,
  ConfigProvider,
} from "antd";
import {
  Mail,
  Phone,
  Download,
  MapPin,
  User,
  Calendar,
  Clock,
  ClipboardList,
  Library,
  Wallet,
  BookOpen,
} from "lucide-react";

/* ---------------- MOCK DATA ---------------- */
const studentData = {
  id: "STD123456",
  name: "Janet Daniel",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Janet",
  status: "Active",
  roll: "12",
  gender: "Female",
  dob: "25 Jan 2008",
  bloodGroup: "O +ve",
  religion: "Christianity",
  category: "OBC",
  motherTongue: "English",
  phone: "+1 46548 84498",
  email: "jan@example.com",
  parents: [
    {
      name: "Jerald Vicinius",
      role: "Father",
      phone: "+1 45545 46464",
      email: "jera@example.com",
    },
    {
      name: "Roberta Webber",
      role: "Mother",
      phone: "+1 46499 24357",
      email: "robe@example.com",
    },
  ],
  documents: ["BirthCertificate.pdf", "Transfer Certificate.pdf"],
  currentAddress: "3495 Red Hawk Road, Buffalo Lake, MN 55314",
  permanentAddress: "3495 Red Hawk Road, Buffalo Lake, MN 55314",
  previousSchool: "Oxford Matriculation, USA",
  schoolAddress: "1852 Barnes Avenue, Cincinnati, OH 45202",
  bankName: "Bank of America",
  branch: "Cincinnati",
  ifsc: "BOA83209832",
  allergies: "Rashes",
  medications: "-",
};

/* ---------------- REUSABLE UI ---------------- */
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
    <div className="text-[11px] uppercase text-gray-400 font-semibold mb-1">
      {label}
    </div>
    <div className="text-[14px] font-semibold text-gray-800">{value}</div>
  </div>
);

/* ---------------- MAIN COMPONENT ---------------- */
const StudentDetailPage = () => {
  const [activeTab, setActiveTab] = useState("1");

  const tabs = [
    { key: "1", label: "Student Details", icon: <User size={16} /> },
    { key: "2", label: "Time Table", icon: <Clock size={16} /> },
    { key: "3", label: "Attendance", icon: <Calendar size={16} /> },
    { key: "4", label: "Fees", icon: <Wallet size={16} /> },
    { key: "5", label: "Exam & Results", icon: <ClipboardList size={16} /> },
    { key: "6", label: "Library", icon: <Library size={16} /> },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#3d5ee1",
          borderRadius: 10,
          fontFamily: "Inter, sans-serif",
        },
      }}
    >
      <div className="min-h-screen bg-[#f7f8f9] p-6">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* PAGE HEADER */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Student Details
              </h1>
              <Breadcrumb
                className="mt-1 text-xs"
                items={[
                  { title: "Dashboard" },
                  { title: "Students" },
                  { title: "Details" },
                ]}
              />
            </div>

            <div className="flex gap-3">
              <Button>Login Details</Button>
              <Button type="primary">Edit Student</Button>
            </div>
          </div>

          {/* MAIN CARD */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 md:p-6">
            <div className="flex flex-col xl:flex-row gap-6 items-start">

              {/* LEFT SIDEBAR */}
              <div className="w-full xl:w-[320px] space-y-6">
                <div className="bg-white rounded-xl border p-6 text-center">
                  <Avatar
                    src={studentData.avatar}
                    size={96}
                    className="mb-3 border-4 border-white shadow"
                  />
                  <h2 className="text-lg font-bold">{studentData.name}</h2>
                  <p className="text-sm text-[#3d5ee1] font-semibold">
                    {studentData.id}
                  </p>

                  <Tag color="success" className="mt-2">
                    {studentData.status}
                  </Tag>

                  <Divider />

                  <InfoRow label="Roll No" value={studentData.roll} />
                  <InfoRow label="Gender" value={studentData.gender} />
                  <InfoRow label="DOB" value={studentData.dob} />
                  <InfoRow label="Blood Group" value={studentData.bloodGroup} />

                  <Button type="primary" block className="mt-4">
                    Add Fees
                  </Button>
                </div>

                <SectionCard title="Contact Info">
                  <div className="space-y-4">
                    <div className="flex gap-3 items-center">
                      <Phone size={16} />
                      <span className="text-sm">{studentData.phone}</span>
                    </div>
                    <div className="flex gap-3 items-center">
                      <Mail size={16} />
                      <span className="text-sm">{studentData.email}</span>
                    </div>
                  </div>
                </SectionCard>
              </div>

              {/* RIGHT CONTENT */}
              <div className="flex-1 space-y-6">

                {/* TABS */}
                <div className="bg-white rounded-xl border sticky top-0 z-10">
                  <div className="flex overflow-x-auto">
                    {tabs.map((tab) => (
                      <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold border-b-2 transition ${
                          activeTab === tab.key
                            ? "border-[#3d5ee1] text-[#3d5ee1]"
                            : "border-transparent text-gray-500"
                        }`}
                      >
                        {tab.icon}
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* PARENTS */}
                <SectionCard title="Parents Information">
                  <div className="grid md:grid-cols-2 gap-4">
                    {studentData.parents.map((p, i) => (
                      <div
                        key={i}
                        className="border rounded-lg p-4 bg-gray-50"
                      >
                        <div className="font-bold">{p.name}</div>
                        <div className="text-xs text-[#3d5ee1] font-semibold">
                          {p.role}
                        </div>
                        <div className="text-sm mt-2">{p.phone}</div>
                        <div className="text-sm">{p.email}</div>
                      </div>
                    ))}
                  </div>
                </SectionCard>

                {/* DOCUMENTS + ADDRESS */}
                <div className="grid md:grid-cols-2 gap-6">
                  <SectionCard title="Documents">
                    {studentData.documents.map((doc, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center border p-3 rounded-lg mb-2"
                      >
                        <div className="flex gap-3 items-center">
                          <BookOpen size={18} />
                          <span>{doc}</span>
                        </div>
                        <Download size={16} />
                      </div>
                    ))}
                  </SectionCard>

                  <SectionCard title="Address">
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <MapPin size={16} />
                        <span>{studentData.currentAddress}</span>
                      </div>
                      <div className="flex gap-2">
                        <MapPin size={16} />
                        <span>{studentData.permanentAddress}</span>
                      </div>
                    </div>
                  </SectionCard>
                </div>

                {/* SCHOOL + BANK */}
                <div className="grid md:grid-cols-2 gap-6">
                  <SectionCard title="Previous School">
                    <DetailField
                      label="School Name"
                      value={studentData.previousSchool}
                    />
                    <DetailField
                      label="Address"
                      value={studentData.schoolAddress}
                    />
                  </SectionCard>

                  <SectionCard title="Bank Details">
                    <DetailField label="Bank" value={studentData.bankName} />
                    <DetailField label="Branch" value={studentData.branch} />
                    <DetailField label="IFSC" value={studentData.ifsc} />
                  </SectionCard>
                </div>

                {/* MEDICAL */}
                <SectionCard title="Medical History">
                  <DetailField
                    label="Allergies"
                    value={studentData.allergies}
                  />
                  <DetailField
                    label="Medications"
                    value={studentData.medications}
                  />
                </SectionCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default StudentDetailPage;
