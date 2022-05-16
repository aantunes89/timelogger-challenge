import { Entry } from "../models/Entry";
import { Project } from "../models/Project";

export function setupProjectPayload(projects: Project[], entries: Entry[]) {
  return projects.map((project) => {
    const projectEntries = entries.filter(
      ({ projectId }) => projectId === project.id
    );

    // set Entries
    project.entries = projectEntries ? [...projectEntries] : [];

    // set totalPrice
    const totalPricesArr = projectEntries.map(({ totalPrice }) => totalPrice);
    project.totalPrice = totalPricesArr.reduce((acc, curr) => acc + curr, 0);

    // set total time

    const totalTimeArr = projectEntries.map(({ timeSpent }) => timeSpent);
    project.totalTimeSpent = totalTimeArr.reduce((acc, curr) => acc + curr, 0);

    return project;
  });
}
