import { useState } from "react";

import StudentHeader from "./header";
import StudentFilterBar from "./filter";
import StudentListing from "./Listing";


import { SegmentTypeEnum } from "../../../../sharedComponents/Segment/utils/enum";
import {
  ContBody,
  TableContainer,
} from "../../../../sharedComponents/MainFlexContainer";
import CreateStudent from "./composer/createStudent";

const StudentPage = () => {
  const [state, setState] = useState({
    filter: {
      segmentType: SegmentTypeEnum.Grid,
      search: "",
    },
    mode: "list", // 👈 list | create
  });

  const openCreateStudent = () => {
    setState((prev) => ({ ...prev, mode: "create" }));
  };

  const goBackToList = () => {
    setState((prev) => ({ ...prev, mode: "list" }));
  };

  return (
    <TableContainer>
      {/* HEADER */}
      <StudentHeader
        onAddStudent={openCreateStudent}
        mode={state.mode}
        onBack={goBackToList}
      />

      {/* FILTER (ONLY SHOW ON LIST) */}
      {state.mode === "list" && (
        <StudentFilterBar
          state={state.filter}
          onChange={(filter) =>
            setState((prev) => ({ ...prev, filter }))
          }
        />
      )}

      {/* CONTENT */}
      <ContBody>
        {state.mode === "list" && (
          <StudentListing filter={state.filter} />
        )}

        {state.mode === "create" && (
          <CreateStudent onCancel={goBackToList} />
        )}
      </ContBody>
    </TableContainer>
  );
};

export default StudentPage;
