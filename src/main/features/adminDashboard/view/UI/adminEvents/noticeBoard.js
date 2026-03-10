import { FileText } from "lucide-react";

const NoticeBoard = () => {
  const notices = [
    { title: "New Syllabus Instructions", date: "11 Mar 2024", tag: "20 Days", color: "text-blue-600", iconBg: "bg-blue-100" },
    { title: "World Environment Day Program", date: "21 Apr 2024", tag: "15 Days", color: "text-green-600", iconBg: "bg-green-100" },
    { title: "Exam Preparation Notification!", date: "13 Mar 2024", tag: "12 Days", color: "text-red-600", iconBg: "bg-red-100" },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-gray-900">Notice Board</h3>
        <button className="text-xs text-gray-500 hover:text-gray-700">View All</button>
      </div>
      <div className="space-y-4">
        {notices.map((notice, i) => (
          <div key={i} className="flex items-center space-x-3">
             <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${notice.iconBg}`}>
               <FileText size={14} className={notice.color} />
             </div>
             <div className="flex-1">
               <h5 className="text-sm font-medium text-gray-800 line-clamp-1">{notice.title}</h5>
               <p className="text-xs text-gray-400 mt-0.5">Added on: {notice.date}</p>
             </div>
             <span className="text-[10px] font-medium bg-gray-50 text-gray-500 px-2 py-1 rounded">{notice.tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoticeBoard;