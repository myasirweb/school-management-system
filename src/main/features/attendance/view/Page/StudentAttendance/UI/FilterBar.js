import { Select, Input, DatePicker, Button, Dropdown } from "antd";
import { SearchOutlined, DownloadOutlined, DownOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;
const { Option } = Select;

const CLASSES = [
  "Grade 8 - A", "Grade 9 - A", "Grade 9 - B",
  "Grade 10 - A", "Grade 10 - B", "Grade 11 - A", "Grade 11 - B",
];

const exportMenuItems = {
  items: [
    { key: "csv",   label: "Export as CSV" },
    { key: "pdf",   label: "Export as PDF" },
    { key: "excel", label: "Export as Excel" },
  ],
};

const FilterBar = ({ filters, onFilterChange }) => (
  <div className="flex flex-wrap gap-3 items-center">
    <RangePicker
      style={{ fontFamily: "Montserrat, sans-serif", borderRadius: 8, borderColor: "#e5e7eb" }}
      onChange={(_, dateStrings) => onFilterChange({ dateRange: dateStrings })}
    />

    <Select
      value={filters.class}
      onChange={(v) => onFilterChange({ class: v })}
      style={{ minWidth: 140, fontFamily: "Montserrat, sans-serif" }}
      placeholder="All Classes"
    >
      <Option value="all">All Classes</Option>
      {CLASSES.map((c) => (
        <Option key={c} value={c}>{c}</Option>
      ))}
    </Select>

    <Select
      value={filters.status}
      onChange={(v) => onFilterChange({ status: v })}
      style={{ minWidth: 130, fontFamily: "Montserrat, sans-serif" }}
      placeholder="All Status"
    >
      <Option value="all">All Status</Option>
      <Option value="present">Present</Option>
      <Option value="absent">Absent</Option>
      <Option value="late">Late</Option>
      <Option value="leave">Leave</Option>
    </Select>

    <Input
      prefix={<SearchOutlined className="text-gray-400" />}
      value={filters.search}
      onChange={(e) => onFilterChange({ search: e.target.value })}
      placeholder="Search student..."
      style={{
        flex: 1,
        minWidth: 180,
        backgroundColor: "#fff",
        borderColor: "#e5e7eb",
        fontFamily: "Montserrat, sans-serif",
        borderRadius: 8,
      }}
    />

    <Dropdown menu={exportMenuItems} trigger={["click"]}>
      <Button
        icon={<DownloadOutlined />}
        style={{
          borderColor: "#e5e7eb",
          color: "#374151",
          fontFamily: "Montserrat, sans-serif",
          borderRadius: 8,
        }}
      >
        Export <DownOutlined style={{ fontSize: 10, marginLeft: 2 }} />
      </Button>
    </Dropdown>
  </div>
);

export default FilterBar;
