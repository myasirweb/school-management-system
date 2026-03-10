import React from "react";
import SharedTable from "../../../../../../sharedComponents/SharedTable";
import { tableColumns } from "./tableColumns";

const WarningsTable = ({ warnings, onView, loading = false }) => {
  return (
    <SharedTable
      columns={tableColumns(onView)}
      dataSource={warnings}
      loading={loading}
      rowKey="id"
      scroll={{ x: 1100 }}
      pagination={{ pageSize: 10 }}
    />
  );
};

export default WarningsTable;
