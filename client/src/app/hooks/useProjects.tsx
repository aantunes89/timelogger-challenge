import React, {
  createContext,
  ReactNode,
  useState,
  useContext,
  useEffect,
} from "react";
import { Project } from "../models/Project";
import { getEntries } from "../services/storageService";
import { setupProjectPayload } from "../services/projectFormatterService";
import { useScreenState } from "./useScreenState";
import { axiosApiService } from "../api/projects";
("../api/projects.ts");

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

  async function fetchProjects() {
    try {
      const { data } = await axiosApiService.get<Project[]>("/projects");
      updateProjectsPayload(data);
    } catch (error) {
      console.log("Show Error");
    }
  }

  useEffect((): void => {
    shouldUpdate && fetchProjects();
    setShouldUpdate(false);
  }, [shouldUpdate, setShouldUpdate]);

  function updateProjectsPayload(projects: Project[]) {
    const newProjectList = setupProjectPayload(projects);
    setProjects(newProjectList);
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
