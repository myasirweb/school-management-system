import FormsGrid from "./Grid";
import FormsTable from "./Table";

const FormsListing = ({ forms, viewMode, onCardClick }) => {
  if (viewMode === "grid") {
    return <FormsGrid forms={forms} onCardClick={onCardClick} />;
  }
  return <FormsTable forms={forms} />;
};

export default FormsListing;
