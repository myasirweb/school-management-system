import { useState } from "react";

import AssignHeader from "./header";
import AssignFilterBar from "./filter";
import AssignListing from "./Listing";

import { SegmentTypeEnum } from "../../../../sharedComponents/Segment/utils/enum";
import {
  ContBody,
  TableContainer,
} from "../../../../sharedComponents/MainFlexContainer";
import AssignForm from "./composer/assignCourse";

const AssignCoursesPage = () => {
  const [state, setState] = useState({
    filter: {
      segmentType: SegmentTypeEnum.Grid,
      search: "",
    },
    mode: "list",
  });

  const openAssignForm = () => setState((p) => ({ ...p, mode: "create" }));
  const goBackToList = () => setState((p) => ({ ...p, mode: "list" }));

  return (
    <TableContainer>
      <AssignHeader onAddAssign={openAssignForm} mode={state.mode} onBack={goBackToList} />

      {state.mode === "list" && (
        <AssignFilterBar state={state.filter} onChange={(filter) => setState((p) => ({ ...p, filter }))} />
      )}

      <ContBody>
        {state.mode === "list" && <AssignListing filter={state.filter} />}
        {state.mode === "create" && <AssignForm onCancel={goBackToList} />}
      </ContBody>
    </TableContainer>
  );
};

export default AssignCoursesPage;
