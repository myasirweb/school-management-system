import React from "react";
import { Breadcrumb } from "antd";
import { useNavigate } from "react-router-dom";

const NoticeHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="mb-6">
      <Breadcrumb
        items={[
          { title: "Home", onClick: () => navigate("/"), style: { cursor: "pointer", color: "var(--RoyalBlue)" } },
          { title: "Notice Board" },
        ]}
      />
      <h1 className="text-3xl font-bold text-gray-900 mt-4" style={{ color: "var(--RoyalBlue)" }}>
        Notice Board
      </h1>
      <p className="text-gray-600 text-sm mt-2">Stay updated with all school announcements and notices</p>
    </div>
  );
};

export default NoticeHeader;
