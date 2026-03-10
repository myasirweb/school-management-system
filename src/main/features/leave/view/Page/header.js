import React from 'react'
import HeaderBar from '../../../../sharedComponents/header/view'
import { GraduationCap } from 'lucide-react'

const LeaveHeader = ({ onCreateLeave }) => {
  return (
      <HeaderBar
      title="Leaves"
      icon={<GraduationCap size={18} />}
      buttonTitle="Create Leave"
      onButtonClick={onCreateLeave}
    />
  )
}

export default LeaveHeader
