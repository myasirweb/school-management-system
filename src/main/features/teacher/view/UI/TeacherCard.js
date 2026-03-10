import React from "react";
import { Avatar, Button } from "antd";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TeacherCard = ({ t }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/allteachers/${t.id}`)}
      className="
        bg-white border border-gray-200 rounded shadow-sm overflow-hidden
        cursor-pointer hover:shadow-md transition
      "
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <span className="text-xs text-indigo-600 font-medium">
          {t.id}
        </span>

        <div className="flex items-center gap-2">
          <span className="text-[11px] px-2 py-[2px] rounded-full bg-green-100 text-green-600 font-medium">
            ● {t.status}
          </span>
          <button
            onClick={(e) => e.stopPropagation()}
            className="text-gray-400 hover:text-gray-600"
          >
            ⋮
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        {/* Profile */}
        <div className="flex items-center gap-3 bg-gray-50 rounded-md p-3 mb-4">
          <Avatar src={t.avatar} size={42} />
          <div>
            <div className="text-sm font-semibold text-gray-900">
              {t.name}
            </div>
            <div className="text-xs text-gray-500 mt-[2px]">
              {t.classLabel}
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-3 gap-4 text-xs mb-4">
          <div>
            <div className="text-gray-500">Subject</div>
            <div className="text-gray-900 font-medium mt-1">
              {t.subject}
            </div>
          </div>

          <div>
            <div className="text-gray-500">Joined On</div>
            <div className="text-gray-900 font-medium mt-1">
              {t.joinedOn}
            </div>
          </div>

          <div>
            <div className="text-gray-500">Contact</div>
            <div className="text-gray-900 font-medium mt-1">
              {t.phone}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t">
          <div className="flex items-center gap-2">
            <IconBtn icon={<MessageCircle size={14} />} />
            <IconBtn icon={<Phone size={14} />} />
            <IconBtn icon={<Mail size={14} />} />
          </div>

          <Button
            size="small"
            onClick={(e) => e.stopPropagation()}
            className="
              !text-xs !px-3 !py-1 !rounded-md
              !bg-gray-100 !border !border-gray-200
              !text-gray-700 hover:!bg-gray-200
            "
          >
            Assign Class
          </Button>
        </div>
      </div>
    </div>
  );
};

const IconBtn = ({ icon }) => (
  <button
    onClick={(e) => e.stopPropagation()}
    className="
      w-8 h-8 flex items-center justify-center
      rounded-full border border-gray-200
      bg-white text-gray-500
      hover:bg-gray-100 transition
    "
  >
    {icon}
  </button>
);

export default TeacherCard;
