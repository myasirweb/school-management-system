import ProjectsGrid from "./Grid";
import ProjectsTable from "./Table";

const ProjectsListing = ({ viewMode, projects }) => {
  if (viewMode === "list") {
    return <ProjectsTable projects={projects} />;
  }
  return <ProjectsGrid projects={projects} />;
};

export default ProjectsListing;
