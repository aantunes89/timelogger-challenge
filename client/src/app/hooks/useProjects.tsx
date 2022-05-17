import React, {
  createContext,
  ReactNode,
  useState,
  useContext,
  useEffect,
} from "react";
import { getAll } from "../api/projects";
import { Project } from "../models/Project";
import { getEntries } from "../services/storageService";
import { setupProjectPayload } from "../services/projectFormatterService";
import { useScreenState } from "./useScreenState";

interface ProjectsProviderProps {
  children: ReactNode;
}

interface ProjectContextData {
  projects: Project[];
  projectId: number | null;
  setProjectId: (id: number) => void;
}

const ProjectsContext = createContext<ProjectContextData>(
  {} as ProjectContextData
);

export function ProjectsProvider({ children }: ProjectsProviderProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectId, setProjectId] = useState<number | null>(null);

  const { shouldUpdate, setShouldUpdate } = useScreenState();

  useEffect((): void => {
    if (shouldUpdate) {
      const getProjects = async () => {
        try {
          await getAll().then((data) => updateProjectsPayload(data));
        } catch (error) {
          console.log("Show Error");
        }
      };

      getProjects();
    }

    setShouldUpdate(false);
  }, [shouldUpdate, setShouldUpdate]);

  function updateProjectsPayload(projects: Project[]) {
    const entries = getEntries();
    const newProjectList = setupProjectPayload(projects, entries);
    setProjects(newProjectList);
    console.log(projects);

    // Check if it need to SEED later
  }

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        projectId,
        setProjectId,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectsContext);

  return context;
}
