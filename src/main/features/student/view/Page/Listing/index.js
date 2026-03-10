import { SegmentTypeEnum } from "../../../../../sharedComponents/Segment/utils/enum";
import StudentGrid from "./Grid";
import StudentTable from "./Table";



const StudentListing = ({ filter }) => {
  return filter.segmentType === SegmentTypeEnum.List ? (
    <StudentTable />
  ) : (
    <StudentGrid />
  );
};

export default StudentListing;
