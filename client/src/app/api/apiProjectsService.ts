import axios from "axios";
import { Project } from "../models/Project";
import { setupProjectPayload } from "../services/projectFormatterService";

const BASE_URL = "http://localhost:3001/api";

const axiosApiService = axios.create({
  baseURL: BASE_URL,
});

axiosApiService.interceptors.response.use(
  (response) => {
    const { config } = response;

    // debugger;
    if (config.url == "/projects" && response.data) {
      response.data = setupProjectPayload(response.data);
    }

    return response;
  },
  (error) => error
);

export { axiosApiService };

export async function getAllProjects(): Promise<{ projects: Project[] }> {
  return axiosApiService
    .get<Project[]>("/projects")
    .then(({ data }) => setupProjectPayload(data))
    .then((projects) => ({
      projects,
    }));
}

export async function addProject(project: Partial<Project>) {
  return axiosApiService
    .post("/projects")
    .then(console.log)
    .then((response) => response);
}
