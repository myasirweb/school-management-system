import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { noticeBoard } from "../../utils/dummyNotices";
import NoticeHeader from "./header";
import NoticeCard from "../UI/NoticeCard";
import { ContBody, TableContainer } from "../../../../sharedComponents/MainFlexContainer";
import { Select } from "antd";

const NoticeBoardPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriority, setSelectedPriority] = useState("All");

  const categories = ["All", ...new Set(noticeBoard.map((notice) => notice.category))];
  const priorities = ["All", "high", "medium", "low"];

  const filteredNotices = noticeBoard.filter((notice) => {
    const categoryMatch = selectedCategory === "All" || notice.category === selectedCategory;
    const priorityMatch = selectedPriority === "All" || notice.priority === selectedPriority;
    return categoryMatch && priorityMatch;
  });

  const handleNoticeClick = (noticeId) => {
    navigate(`/notice-board/${noticeId}`);
  };

  return (
    <TableContainer>
      {/* Header */}
      <NoticeHeader />

      <ContBody>
        {/* Filters */}
        <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            placeholder="Filter by Category"
            value={selectedCategory}
            onChange={setSelectedCategory}
            options={categories.map((cat) => ({ value: cat, label: cat }))}
            style={{ width: "100%" }}
          />
          <Select
            placeholder="Filter by Priority"
            value={selectedPriority}
            onChange={setSelectedPriority}
            options={priorities.map((pri) => ({
              value: pri,
              label: pri.charAt(0).toUpperCase() + pri.slice(1),
            }))}
            style={{ width: "100%" }}
          />
        </div>

        {/* Notices Grid */}
        {filteredNotices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredNotices.map((notice) => (
              <NoticeCard key={notice.id} notice={notice} onClick={() => handleNoticeClick(notice.id)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No notices found matching your filters.</p>
          </div>
        )}
      </ContBody>
    </TableContainer>
  );
};

export default NoticeBoardPage;
