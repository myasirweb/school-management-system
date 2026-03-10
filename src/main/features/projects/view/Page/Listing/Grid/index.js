import ProjectCard from "../../UI/ProjectCard";

const ProjectsGrid = ({ projects }) => {
  if (!projects.length) {
    return (
      <div
        className="flex items-center justify-center py-20 text-gray-400 text-sm"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        No project records found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-4 px-6 py-4 w-full">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectsGrid;
