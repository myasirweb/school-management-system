import { SegmentTypeEnum } from "../../../../../sharedComponents/Segment/utils/enum";
import TeacherGrid from "./Grid";
import TeacherTable from "./Table";

const TeacherListing = ({ filter }) => {
  return filter.segmentType === SegmentTypeEnum.List ? (
    <TeacherTable />
  ) : (
    <TeacherGrid />
  );
};

export default TeacherListing;
