import { Project } from "../../models/Project";

export const sortProjectsByDate = (projects: Project[]) =>
  projects.sort(
    (prevProject, currProject) =>
      new Date(prevProject.deadLine).getTime() - new Date(currProject.deadLine).getTime()
  );
