import React, {
  createContext,
  ReactNode,
  useState,
  useContext,
  useEffect,
} from "react";
import { getAll } from "../api/projects";
import { Project } from "../models/Project";
import { Entry } from "../models/Entry";

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

  useEffect((): void => {
    try {
      const fetchProjects = async () =>
        await getAll().then((data) => setProjects(data));

      fetchProjects();
    } catch (error) {
      console.log("Show Error");
    }
  }, []);

  return (
    <ProjectsContext.Provider value={{ projects, projectId, setProjectId }}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectsContext);

  return context;
}
