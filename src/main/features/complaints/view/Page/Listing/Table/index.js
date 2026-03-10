import React from "react";
import SharedTable from "../../../../../../sharedComponents/SharedTable";
import { tableColumns } from "./tableColumns";

const ComplaintsTable = ({ complaints, onView, loading = false }) => {
  return (
    <SharedTable
      columns={tableColumns(onView)}
      dataSource={complaints}
      loading={loading}
      rowKey="id"
      scroll={{ x: 1100 }}
      pagination={{ pageSize: 10 }}
    />
  );
};

export default ComplaintsTable;
