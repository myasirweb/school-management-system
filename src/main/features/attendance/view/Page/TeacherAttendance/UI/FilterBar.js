import { Select, Input, Button, Dropdown } from "antd";
import { SearchOutlined, DownloadOutlined, DownOutlined } from "@ant-design/icons";

const { Option } = Select;

const exportMenuItems = {
  items: [
    { key: "csv",   label: "Export as CSV" },
    { key: "pdf",   label: "Export as PDF" },
    { key: "excel", label: "Export as Excel" },
  ],
};

const FilterBar = ({ filters, onFilterChange, subjects }) => (
  <div className="flex flex-wrap gap-3 items-center">
    <Select
      value={filters.class}
      onChange={(v) => onFilterChange({ class: v })}
      style={{ minWidth: 160, fontFamily: "Montserrat, sans-serif" }}
      placeholder="All Subjects"
    >
      <Option value="all">All Subjects</Option>
      {subjects.map((s) => (
        <Option key={s} value={s}>{s}</Option>
      ))}
    </Select>

    <Select
      value={filters.status}
      onChange={(v) => onFilterChange({ status: v })}
      style={{ minWidth: 130, fontFamily: "Montserrat, sans-serif" }}
      placeholder="All Status"
    >
      <Option value="all">All Status</Option>
      <Option value="excellent">Excellent (≥90%)</Option>
      <Option value="good">Good (75–90%)</Option>
      <Option value="poor">Poor (&lt;75%)</Option>
    </Select>

    <Input
      prefix={<SearchOutlined className="text-gray-400" />}
      value={filters.search}
      onChange={(e) => onFilterChange({ search: e.target.value })}
      placeholder="Search teacher..."
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
