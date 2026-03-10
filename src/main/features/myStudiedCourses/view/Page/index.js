import { useState } from "react";

import CourseHeader from "./header";
import CourseFilterBar from "./filter";
import CourseListing from "./Listing";

import { SegmentTypeEnum } from "../../../../sharedComponents/Segment/utils/enum";
import {
  ContBody,
  TableContainer,
} from "../../../../sharedComponents/MainFlexContainer";
import CreateCourse from "./composer/createCourse";

const CourseListPage = () => {
  const [state, setState] = useState({
    filter: {
      segmentType: SegmentTypeEnum.Grid,
      search: "",
    },
    mode: "list", 
  });

  const openCreateCourse = () => {
    setState((prev) => ({ ...prev, mode: "create" }));
  };

  const goBackToList = () => {
    setState((prev) => ({ ...prev, mode: "list" }));
  };

  return (
    <TableContainer>
      {/* HEADER */}
      <CourseHeader
        onAddCourse={openCreateCourse}
        mode={state.mode}
        onBack={goBackToList}
      />

      {/* FILTER (ONLY SHOW ON LIST) */}
      {state.mode === "list" && (
        <CourseFilterBar
          state={state.filter}
          onChange={(filter) =>
            setState((prev) => ({ ...prev, filter }))
          }
        />
      )}

      {/* CONTENT */}
      <ContBody>
        {state.mode === "list" && (
          <CourseListing filter={state.filter} />
        )}

        {state.mode === "create" && (
          <CreateCourse onCancel={goBackToList} />
        )}
      </ContBody>
    </TableContainer>
  );
};

export default CourseListPage;
