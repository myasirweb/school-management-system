import BoardsGrid from "./Grid";
import BoardsTable from "./Table";

const BoardsListing = ({ viewMode, boards }) => {
  if (viewMode === "list") {
    return <BoardsTable boards={boards} />;
  }
  return <BoardsGrid boards={boards} />;
};

export default BoardsListing;
