import { SegmentTypeEnum } from "../../../../../sharedComponents/Segment/utils/enum";
import AssignGrid from "./Grid";
import AssignTable from "./Table";

const AssignListing = ({ filter }) => {
  return filter.segmentType === SegmentTypeEnum.List ? (
    <AssignTable />
  ) : (
    <AssignGrid />
  );
};

export default AssignListing;
