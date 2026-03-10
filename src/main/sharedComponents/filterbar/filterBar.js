import React from "react";
import { Input, Button, Badge } from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  AppstoreOutlined,
  BarsOutlined,
} from "@ant-design/icons";
import { SegmentTypeEnum } from "../Segment/utils/enum";

const FilterBar = ({
  searchValue = "",
  onSearchChange = () => {},
  showFilter = true,
  onFilterClick = () => {},
  showViewToggle = true,
  currentView = SegmentTypeEnum.Grid,
  onViewChange = () => {},
  /* ── Tab support (optional — omit to keep original behaviour) ── */
  tabs = [],
  activeTab = null,
  onTabChange = () => {},
}) => {
  return (
    <div
      className="
        sticky top-[56px] z-20
        flex flex-col sm:flex-row items-center justify-between
        w-full p-2 bg-white rounded shadow-sm border border-gray-200
      "
    >
      {/* Search */}
      <div className="w-[180px] sm:w-[200px]">
        <Input
          size="middle"
          placeholder="Search"
          prefix={<SearchOutlined />}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="rounded border-gray-300 hover:!border-indigo-400 focus:!border-indigo-500 text-[14px]"
        />
      </div>

      {/* Tab buttons — only rendered when tabs array is provided */}
      {tabs.length > 0 && (
        <div className="flex items-center gap-2 flex-1 px-3">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => onTabChange(tab.key)}
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? "#fff" : "#4b5563",
                  background: isActive ? "rgb(82,107,177)" : "#f3f4f6",
                  border: "none",
                  borderRadius: 8,
                  padding: "6px 14px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  whiteSpace: "nowrap",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.background = "#e5e7eb";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.background = "#f3f4f6";
                }}
              >
                {tab.label}
                {tab.badge != null && (
                  <Badge
                    count={tab.badge}
                    size="small"
                    style={{
                      backgroundColor: "rgb(232,19,123)",
                      boxShadow: "none",
                      fontSize: 10,
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Filter Button */}
        {showFilter && (
          <Button
            size="middle"
            icon={<FilterOutlined className="mr-1" />}
            onClick={onFilterClick}
            className="
              flex items-center px-2.5 py-1
              bg-gray-100 text-gray-700 border-none h-auto
              text-[12px] font-semibold rounded
              hover:!bg-gray-200 hover:!text-gray-900
              shadow-sm
            "
          >
            Filter
          </Button>
        )}

        {/* View Toggle */}
        {showViewToggle && (
          <div className="flex items-center bg-gray-100 rounded p-1 shadow-inner">
            {/* Grid View */}
            <div
              onClick={() => onViewChange(SegmentTypeEnum.Grid)}
              className={`flex items-center gap-1 px-2.5 py-1 cursor-pointer
                rounded text-[12px] font-semibold transition duration-150
                ${
                  currentView === SegmentTypeEnum.Grid
                    ? "bg-white text-gray-900 shadow-sm ring-1 ring-gray-200"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
            >
              <AppstoreOutlined />
              Grid
            </div>

            {/* List View */}
            <div
              onClick={() => onViewChange(SegmentTypeEnum.List)}
              className={`flex items-center gap-1 px-2.5 py-1 cursor-pointer
                rounded text-[12px] font-semibold transition duration-150
                ${
                  currentView === SegmentTypeEnum.List
                    ? "bg-white text-gray-900 shadow-sm ring-1 ring-gray-200"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
            >
              <BarsOutlined />
              List
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
