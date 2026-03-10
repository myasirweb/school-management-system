import { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TableContainer,
  ContBody,
} from "../../../../sharedComponents/MainFlexContainer";
import {
  setStudents,
  setActiveStudent,
  setActiveTab,
  setSearchQuery,
} from "../../store/studentIdCardSlice";
import {
  seedStudents,
  getStudentsFromStorage,
} from "../../utils/studentIdCardDummyData";
import StudentIdCardHeader from "./header";
import Sidebar from "./Sidebar";
import Detail from "./Detail";

const StudentIdCardPage = () => {
  const dispatch = useDispatch();
  const { students, activeStudentId, activeTab, searchQuery } = useSelector(
    (s) => s.studentIdCard
  );

  useEffect(() => {
    seedStudents();
    dispatch(setStudents(getStudentsFromStorage()));
  }, [dispatch]);

  const filteredStudents = useMemo(() => {
    if (!searchQuery.trim()) return students;
    const q = searchQuery.toLowerCase();
    return students.filter(
      (s) =>
        s.fullName.toLowerCase().includes(q) ||
        s.studentId.toLowerCase().includes(q) ||
        s.className.toLowerCase().includes(q)
    );
  }, [students, searchQuery]);

  const activeStudent = students.find((s) => s.id === activeStudentId) || null;

  return (
    <TableContainer>
      <StudentIdCardHeader />
      <ContBody style={{ overflowY: "hidden", paddingBottom: 0 }}>
        <div className="flex h-full overflow-hidden">
          <Sidebar
            students={filteredStudents}
            activeStudentId={activeStudentId}
            searchQuery={searchQuery}
            onSelectStudent={(id) => dispatch(setActiveStudent(id))}
            onSearch={(q) => dispatch(setSearchQuery(q))}
          />
          <Detail
            student={activeStudent}
            activeTab={activeTab}
            onTabChange={(tab) => dispatch(setActiveTab(tab))}
          />
        </div>
      </ContBody>
    </TableContainer>
  );
};

export default StudentIdCardPage;
