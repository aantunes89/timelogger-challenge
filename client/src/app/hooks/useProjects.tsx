import React, { createContext, ReactNode, useState, useContext, useEffect, ErrorInfo } from "react";
import { Project } from "../models/Project";

import { useScreenState } from "./useScreenState";
import { axiosApiService } from "../api/projects";

interface ProjectsProviderProps {
  children: ReactNode;
}

interface ProjectContextData {
  projects: Project[];
  projectId: number | null;
  setProjectId: (id: number) => void;
  setProjects: (projects: Project[]) => void;
  addProject: (project: Partial<Project>) => Promise<void>;
}

const ProjectsContext = createContext<ProjectContextData>({} as ProjectContextData);

export function ProjectsProvider({ children }: ProjectsProviderProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectId, setProjectId] = useState<number | null>(null);

  const { shouldUpdate, setShouldUpdate, setSnackBarMsg } = useScreenState();

  async function fetchProjects(): Promise<void> {
    try {
      const { data } = await axiosApiService.get<Project[]>("/projects");

      setProjects([...data]);
    } catch (error) {
      setSnackBarMsg("Couldn't find any Project");
    }
  }

  async function addProject({ name, deadLine: projectDeadLine }: Partial<Project>): Promise<void> {
    await axiosApiService
      .post<Project>("/projects", {
        name,
        deadLine: projectDeadLine?.toISOString(),
      })
      .then(() => setSnackBarMsg("Successfully saved"))
      .catch(() => setSnackBarMsg("Couldn't add Project"));
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
        setProjects,
        addProject,
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
