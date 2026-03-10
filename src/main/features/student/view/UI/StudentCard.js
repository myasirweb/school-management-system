import React from "react";
import { Avatar, Button, Tooltip } from "antd";
import { Phone, Mail, MessageCircle, ArrowRight, Calendar, GraduationCap, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

// const StudentCard = ({ s }) => {
//   const navigate = useNavigate();
//   return (
//     <div
//     onClick={() => navigate(`/allstudents/${s.id}`)}
//      className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden">
//       {/* Top Bar */}
//       <div className="flex items-center justify-between px-4 py-3 border-b">
//         <span className="text-xs text-indigo-600 font-medium cursor-pointer">
//           {s.id}
//         </span>

//         <div className="flex items-center gap-2">
//           <span className="text-[11px] px-2 py-[2px] rounded-full bg-green-100 text-green-600 font-medium">
//             ● Active
//           </span>
//           <button className="text-gray-400 hover:text-gray-600">⋮</button>
//         </div>
//       </div>

//       {/* Body */}
//       <div className="p-4">
//         {/* Profile */}
//         <div className="flex items-center gap-3 bg-gray-50 rounded-md p-3 mb-4">
//           <Avatar src={s.avatar} size={42} />
//           <div>
//             <div className="text-sm font-semibold text-gray-900">
//               {s.name}
//             </div>
//             <div className="text-xs text-gray-500 mt-[2px]">
//               {s.classLabel}
//             </div>
//           </div>
//         </div>

//         {/* Info Grid */}
//         <div className="grid grid-cols-3 gap-4 text-xs mb-4">
//           <div>
//             <div className="text-gray-500">Roll No</div>
//             <div className="text-gray-900 font-medium mt-1">
//               {s.roll}
//             </div>
//           </div>

//           <div>
//             <div className="text-gray-500">Gender</div>
//             <div className="text-gray-900 font-medium mt-1">
//               {s.gender}
//             </div>
//           </div>

//           <div>
//             <div className="text-gray-500">Joined On</div>
//             <div className="text-gray-900 font-medium mt-1">
//               {s.joinedOn}
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="flex items-center justify-between pt-3 border-t">
//           <div className="flex items-center gap-2">
//             <IconBtn icon={<MessageCircle size={14} />} />
//             <IconBtn icon={<Phone size={14} />} />
//             <IconBtn icon={<Mail size={14} />} />
//           </div>

//           <Button
//             size="small"
//             className="!text-xs !px-3 !py-1 !rounded-md !bg-gray-100 !border !border-gray-200 !text-gray-700 hover:!bg-gray-200"
//           >
//             Add Fees
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const IconBtn = ({ icon }) => (
//   <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 hover:bg-gray-100 transition">
//     {icon}
//   </button>
// );


const StudentCard = ({ s }) => {

  const colors = {
    blueHosta: "#64C4B2",
    mediumTurquoise: "#52c41a",
    waikawaGrey: "#526BB1",
    vividCerise: "#DA1D81",
    brightSun: "#FED33C",
    blueHaze: "#e8edff",
    royalBlue: "#526BB1",
  };

  
const navigate = useNavigate();
  return (
   <div
   onClick={() => navigate(`/allstudents/${s.id}`)}
   className="group relative bg-white border border-slate-200 rounded-xl overflow-hidden
shadow-sm shadow-slate-200/60
transition-all duration-300
hover:shadow-lg hover:shadow-slate-300/60 hover:-translate-y-1">

      {/* Decorative Top Accent */}
      <div 
        className="h-1 w-full" 
        
      />

      {/* Header Info */}
      <div className="px-5 py-4 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
            Student ID
          </span>
          <span className="text-xs font-semibold text-slate-600" style={{ color: colors.waikawaGrey }}>
            {s.id}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-tight">Active</span>
          </div>
          <button className="p-1 hover:bg-slate-100 rounded-full transition-colors">
            <MoreVertical size={16} className="text-slate-400" />
          </button>
        </div>
      </div>

      {/* Profile Section */}
      <div className="px-5 pb-4 flex items-center gap-4">
        <div className="relative">
          <Avatar 
            src={s.avatar} 
            size={64} 
            className="border-2 border-white shadow-md"
            style={{ backgroundColor: colors.blueHaze }}
          />
          <div 
            className="absolute -bottom-1 -right-1 p-1 rounded-full border-2 border-white text-white shadow-sm"
            style={{ backgroundColor: colors.blueHosta }}
          >
            <GraduationCap size={12} />
          </div>
        </div>
        <div className="overflow-hidden">
          <h3 className="text-base font-bold text-slate-800 truncate leading-tight">
            {s.name}
          </h3>
          <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full opacity-60" style={{ backgroundColor: colors.mediumTurquoise }} />
            {s.classLabel}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mx-5 p-3 rounded-lg bg-slate-50 border border-slate-100 grid grid-cols-3 gap-2 mb-4">
        <div className="text-center">
          <p className="text-[10px] text-slate-400 uppercase font-bold mb-0.5">Roll</p>
          <p className="text-xs font-bold text-slate-700">{s.roll}</p>
        </div>
        <div className="text-center border-x border-slate-200">
          <p className="text-[10px] text-slate-400 uppercase font-bold mb-0.5">Gender</p>
          <p className="text-xs font-bold text-slate-700">{s.gender}</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-slate-400 uppercase font-bold mb-0.5">Attendance</p>
          <p className="text-xs font-bold" style={{ color: colors.vividCerise }}>{s.attendance}</p>
        </div>
      </div>

      {/* Additional Quick Details */}
      <div className="px-5 space-y-2 mb-5">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <Calendar size={14} className="text-slate-400" />
          <span>Joined <span className="font-medium">{s.joinedOn}</span></span>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-5 py-3 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <IconButton icon={<MessageCircle size={15} />} tooltip="Chat" />
          <IconButton icon={<Phone size={15} />} tooltip="Call" />
          <IconButton icon={<Mail size={15} />} tooltip="Email" />
        </div>

        <button 
          className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
          style={{ color: colors.royalBlue }}
        >
          View Profile
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

const IconButton = ({ icon, tooltip }) => (
  <Tooltip title={tooltip}>
    <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all">
      {icon}
    </button>
  </Tooltip>
);
export default StudentCard;
