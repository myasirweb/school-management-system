import { SegmentTypeEnum } from "../../../../../sharedComponents/Segment/utils/enum";
import CourseGrid from "./Grid";
import CourseTable from "./Table";

const CourseListing = ({ filter }) => {
  return filter.segmentType === SegmentTypeEnum.List ? (
    <CourseTable />
  ) : (
    <CourseGrid />
  );
};

export default CourseListing;
