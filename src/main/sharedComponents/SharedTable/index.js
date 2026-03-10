import { Table } from "antd";

const SharedTable = ({
  columns,
  dataSource,
  loading = false,
  pagination,
  rowKey = "id",
  scroll,
  title,
}) => {
  const paginationConfig =
    pagination === false
      ? false
      : {
          pageSize: 10,
          showSizeChanger: false,
          position: ["bottomRight"],
          ...(typeof pagination === "object" ? pagination : {}),
        };

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
      {title && (
        <div
          className="px-4 py-3 border-b border-gray-100"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {title}
        </div>
      )}
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={paginationConfig}
        rowKey={rowKey}
        scroll={scroll}
        style={{ fontFamily: "Montserrat, sans-serif" }}
        rowClassName={() => "hover:bg-gray-50 transition-all duration-150"}
        components={{
          header: {
            cell: (props) => (
              <th
                {...props}
                style={{
                  ...props.style,
                  backgroundColor: "#f9fafb",
                  color: "#6b7280",
                  fontSize: "11px",
                  fontWeight: 600,
                  fontFamily: "Montserrat, sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  borderBottom: "1px solid #e5e7eb",
                  padding: "10px 16px",
                }}
              />
            ),
          },
        }}
      />
    </div>
  );
};

export default SharedTable;
