import React, { useState, useRef, useEffect } from "react";
import { User, Settings, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../../features/login/store/loginSlice";
import { logoutUser } from "../../../../features/login/services/loginService";
import profileimg from "../../../../../assets/images/header-nav/profileimg.jpg";

const ProfileBox = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.login);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logoutUser();
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Avatar */}
      <div
        onClick={() => setOpen(!open)}
        className="w-9 h-9 rounded-xl overflow-hidden border border-slate-200 cursor-pointer"
      >
        <img
          src={profileimg}
          className="w-full h-full object-cover"
          alt="profile"
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-52 bg-white shadow-lg rounded-xl border border-slate-200 p-3 z-50">
          {/* User Info */}
          <div className="flex items-center gap-3 pb-3 border-b">
            <img
              src={profileimg}
              className="w-10 h-10 rounded-lg object-cover"
              alt="profile"
            />
            <div>
              <h4 className="text-sm font-semibold text-slate-800">
                {user?.name || "User"}
              </h4>
              <p className="text-xs text-slate-500">{user?.role || "Guest"}</p>
            </div>
          </div>

          {/* Menu Items */}
          <div className="pt-3 flex flex-col text-sm gap-1">

            <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-slate-100">
              <User size={16} className="text-slate-600" />
              My Profile
            </button>

            <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-slate-100">
              <Settings size={16} className="text-slate-600" />
              Settings
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded text-red-500 hover:bg-red-50"
            >
              <LogOut size={16} />
              Logout
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileBox;
