import React, { createContext, ReactNode, useState, useContext, useEffect, ErrorInfo } from "react";
import { Project } from "../models/Project";

import { useScreenState } from "./useScreenState";
import { axiosApiService } from "../api/projects";
import { Entry } from "../models/Entry";
import { storeEntry } from "../services/storage";
import { sortProjectsByDate } from "../services/helpers/data-formatter";

interface ProjectsProviderProps {
  children: ReactNode;
}

interface ProjectContextData {
  projects: Project[];
  projectId: number | null;
  setProjectId: (id: number) => void;
  setProjects: (projects: Project[]) => void;
  addProject: (project: Partial<Project>) => Promise<void>;
  addEntry: (entry: Entry) => void;
  fetchProjects: () => void;
  isSorted: boolean;
  setIsSorted: (value: boolean) => void;
}

const ProjectsContext = createContext<ProjectContextData>({} as ProjectContextData);

export const useProjectsStateBuilder = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectId, setProjectId] = useState<number | null>(null);
  const [isSorted, setIsSorted] = useState<boolean>(false);

  return {
    projects,
    projectId,
    setProjectId,
    setProjects,
    isSorted,
    setIsSorted,
  };
};

export function ProjectsProvider({ children }: ProjectsProviderProps) {
  const projectsState = useProjectsStateBuilder();

  const { shouldUpdate, setShouldUpdate, setSnackBarMsg } = useScreenState();

  async function fetchProjects(): Promise<void> {
    const { isSorted, setProjects } = projectsState;
    try {
      const { data } = await axiosApiService.get<Project[]>("/projects");

      const newProjectList = isSorted ? sortProjectsByDate(data) : data;

      setProjects([...newProjectList]);
    } catch (error) {
      setSnackBarMsg("Couldn't find any Project");
    }
  }

  async function addProject({ name, deadLine: projectDeadLine }: Partial<Project>): Promise<void> {
    try {
      await axiosApiService.post<Project>("/projects", {
        name,
        deadLine: projectDeadLine?.toISOString(),
      });

      setSnackBarMsg("Successfully saved");
    } catch (error) {
      setSnackBarMsg("Couldn't add Project");
    }
  }

  async function addEntry(entry: Entry) {
    storeEntry(entry);
  }

  useEffect((): void => {
    shouldUpdate && fetchProjects();
    setShouldUpdate(false);
  }, [shouldUpdate, setShouldUpdate]);

  return (
    <ProjectsContext.Provider
      value={{
        ...projectsState,
        addProject,
        addEntry,
        fetchProjects,
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
