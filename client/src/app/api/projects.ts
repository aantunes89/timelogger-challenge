import axios from "axios";
import { Project } from "../models/Project";
import { setupProjectPayload } from "../services/projectFormatterService";

const BASE_URL = "http://localhost:3001/api";

export const axiosApiService = axios.create({
  baseURL: BASE_URL,
});

export async function getAllProjects(): Promise<{ projects: Project[] }> {
  return axiosApiService
    .get<Project[]>("/projects")
    .then(({ data }) => setupProjectPayload(data))
    .then((projects) => ({
      projects,
    }));
}

export async function addProjec(project: Partial<Project>) {
  return axiosApiService
    .post("/projects")
    .then(console.log)
    .then((response) => response);
}
