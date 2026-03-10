import React from "react";
import SharedTable from "../../../../../../sharedComponents/SharedTable";
import { tableColumn } from "./tableColumns";

const RewardsTable = ({ rewards, onView, loading = false }) => {
  return (
    <SharedTable
      columns={tableColumn(onView)}
      dataSource={rewards}
      loading={loading}
      rowKey="id"
      scroll={{ x: 1100 }}
      pagination={{ pageSize: 10 }}
    />
  );
};

export default RewardsTable;
