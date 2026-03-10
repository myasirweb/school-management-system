import GroupsGrid from "./Grid";
import GroupsTable from "./Table";

const GroupsListing = ({ viewMode, groups }) => {
  if (viewMode === "list") {
    return <GroupsTable groups={groups} />;
  }
  return <GroupsGrid groups={groups} />;
};

export default GroupsListing;
