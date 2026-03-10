import { useState } from "react";
import ClassHeader from "./header";
import ClassFilterBar from "./filter";
import ClassListing from "./Listing";
import { SegmentTypeEnum } from "../../../../sharedComponents/Segment/utils/enum";
import { ContBody, TableContainer } from "../../../../sharedComponents/MainFlexContainer";
import CreateClass from "./composer/createClass";

const ClassListPage = () => {
  const [state, setState] = useState({
    filter: { segmentType: SegmentTypeEnum.Grid, search: "" },
    mode: "list",
  });

  return (
    <TableContainer>
      <ClassHeader
        onAddClass={() => setState((p) => ({ ...p, mode: "create" }))}
        mode={state.mode}
        onBack={() => setState((p) => ({ ...p, mode: "list" }))}
      />
      {state.mode === "list" && (
        <ClassFilterBar state={state.filter} onChange={(filter) => setState((p) => ({ ...p, filter }))} />
      )}
      <ContBody>
        {state.mode === "list" && <ClassListing filter={state.filter} />}
        {state.mode === "create" && <CreateClass onCancel={() => setState((p) => ({ ...p, mode: "list" }))} />}
      </ContBody>
    </TableContainer>
  );
};

export default ClassListPage;
