import React, {
  createContext,
  ReactNode,
  useState,
  useContext,
  useEffect,
} from "react";
import { Project } from "../models/Project";

import { useScreenState } from "./useScreenState";
import { axiosApiService } from "../api/apiProjectsService";

interface ProjectsProviderProps {
  children: ReactNode;
}

interface ProjectContextData {
  projects: Project[];
  projectId: number | null;
  setProjectId: (id: number) => void;
  sortByDeadLine: () => void;
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

      setProjects([...data]);
    } catch (error) {
      return error;
    }
  }

  function sortByDeadLine() {
    const sortedProjects = projects.sort(
      (a, b) => new Date(a.deadLine).getTime() - new Date(b.deadLine).getTime()
    );

    setProjects([...sortedProjects]);
  }

  useEffect((): void => {
    shouldUpdate && fetchProjects();
    setShouldUpdate(false);
  }, [shouldUpdate, setShouldUpdate]);

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        projectId,
        setProjectId,
        sortByDeadLine,
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
