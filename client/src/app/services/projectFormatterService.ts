import { Entry } from "../models/Entry";
import { Project } from "../models/Project";

export function setupProjectPayload(projects: Project[], entries: Entry[]) {
  return projects.map((project) => {
    const projectEntries = entries.filter(
      ({ projectId }) => projectId === project.id
    );

    project.entries = projectEntries ? [...projectEntries] : [];

    return project;
  });
}
