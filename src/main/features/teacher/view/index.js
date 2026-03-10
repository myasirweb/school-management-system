import React from 'react'
import { Route, Routes } from 'react-router-dom'
import TeacherPage from './Page'
import TeacherDetailPage from './Page/Detail/teacherDetailPage'

const TeacherIndex = () => {
  return (
     <Routes>
      <Route index element={<TeacherPage />} />
      <Route path=":teacherId" element={<TeacherDetailPage />} />
    </Routes>
  )
}

export default TeacherIndex
