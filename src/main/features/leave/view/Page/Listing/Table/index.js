import React from 'react'
import SharedTable from '../../../../../../sharedComponents/SharedTable'
import { tableColumn } from './tableColumns'

const LeavesTable = ({ leaves, onView, loading = false }) => {
  return (
    <SharedTable
     columns={tableColumn(onView)}
    dataSource={leaves}
    loading={loading}
    rowKey="id"
    scroll={{ x: 1000 }}
    pagination={{ pageSize: 10 }} />
  )
}

export default LeavesTable
