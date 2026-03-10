import React from "react";
import { Tag } from "antd";
import { Clock, User } from "lucide-react";

const NoticeCard = ({ notice, onClick }) => {
  const getCategoryColor = (category) => {
    const colors = {
      Academic: "var(--RoyalBlue)",
      Event: "var(--vivid-cerise)",
      Holiday: "var(--bright-sun)",
      Facility: "var(--medium-turquoise)",
      Announcement: "var(--waikawa-grey)",
      Meeting: "var(--blue-hosta)",
      Workshop: "var(--BlueHaze)",
    };
    return colors[category] || "var(--RoyalBlue)";
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "var(--vivid-cerise)";
      case "medium":
        return "var(--bright-sun)";
      case "low":
        return "var(--medium-turquoise)";
      default:
        return "var(--RoyalBlue)";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg border border-gray-200 p-5 cursor-pointer hover:shadow-lg transition-shadow duration-300 hover:border-gray-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="font-bold text-gray-900 text-base flex-1 line-clamp-2">{notice.title}</h3>
        <div
          className="px-3 py-1 rounded-full text-xs font-semibold text-white whitespace-nowrap"
          style={{ backgroundColor: getCategoryColor(notice.category) }}
        >
          {notice.category}
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm line-clamp-2 mb-4">{notice.description}</p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{formatDate(notice.date)}</span>
          </div>
          <div className="flex items-center gap-1">
            <User size={14} />
            <span>{notice.author}</span>
          </div>
        </div>
        <div
          className="px-2 py-1 rounded text-xs font-semibold text-white capitalize"
          style={{ backgroundColor: getPriorityColor(notice.priority) }}
        >
          {notice.priority}
        </div>
      </div>
    </div>
  );
};

export default NoticeCard;
