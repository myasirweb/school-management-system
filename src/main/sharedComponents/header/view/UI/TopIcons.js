import React, { useState, useRef, useEffect } from "react";
import {
  Bell,
  MessageSquare,
  Moon,
  Calendar,
  UserPlus,
  Receipt,
} from "lucide-react";

const TopIcons = () => {
  const [notifyOpen, setNotifyOpen] = useState(false);
  const dropdownRef = useRef();

  const icons = [
    { icon: Moon, key: "moon" },
    { icon: Bell, key: "bell" },
    { icon: MessageSquare, key: "msg" },
  ];

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setNotifyOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Dummy notifications with ICON TYPE
  const notifications = [
    {
      id: 1,
      title: "New Admission Request",
      time: "2 min ago",
      icon: UserPlus,
      color: "text-blue-500",
    },
    {
      id: 2,
      title: "Fee Voucher Generated",
      time: "10 min ago",
      icon: Receipt,
      color: "text-green-500",
    },
    {
      id: 3,
      title: "New Message from Teacher",
      time: "1 hour ago",
      icon: MessageSquare,
      color: "text-purple-500",
    },
    {
      id: 4,
      title: "Tomorrow Class Schedule Updated",
      time: "3 hours ago",
      icon: Calendar,
      color: "text-orange-500",
    },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center gap-2">
        {icons.map((item, i) => {
          const Icon = item.icon;

          // Bell icon special behavior
          if (item.key === "bell") {
            return (
              <div
                key={i}
                onClick={() => setNotifyOpen(!notifyOpen)}
                className="relative border border-slate-200 bg-white rounded p-2 shadow-sm cursor-pointer hover:bg-slate-50"
              >
                <Icon size={18} className="text-slate-600" />

                {/* Red Dot Badge */}
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-white"></span>
              </div>
            );
          }

          return (
            <div
              key={i}
              className="border border-slate-200 bg-white rounded p-2 shadow-sm cursor-pointer hover:bg-slate-50"
            >
              <Icon size={18} className="text-slate-600" />
            </div>
          );
        })}
      </div>

      {/* Notification Dropdown */}
      {notifyOpen && (
        <div className="absolute right-0 mt-3 w-80 bg-white shadow-xl rounded-xl border border-slate-200 p-3 z-50">
          <h4 className="text-sm font-semibold text-slate-800 mb-3">
            Notifications
          </h4>

          <div className="max-h-64 overflow-y-auto no-scrollbar">

            {notifications.map((n) => {
              const Icon = n.icon;

              return (
                <div
                  key={n.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer border-b last:border-none"
                >
                  {/* Icon */}
                  <div
                    className={`w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center ${n.color}`}
                  >
                    <Icon size={18} />
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-700">
                      {n.title}
                    </p>
                    <span className="text-xs text-slate-400">{n.time}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <button className="w-full mt-2 text-center text-sm text-[var(--color-blue)] hover:underline">
            View All
          </button>
        </div>
      )}
    </div>
  );
};

export default TopIcons;
