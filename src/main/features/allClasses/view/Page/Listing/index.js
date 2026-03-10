import { SegmentTypeEnum } from "../../../../../sharedComponents/Segment/utils/enum";
import ClassGrid from "./Grid";
import ClassTable from "./Table";

const ClassListing = ({ filter }) => {
  return filter.segmentType === SegmentTypeEnum.List ? <ClassTable /> : <ClassGrid />;
};

export default ClassListing;
