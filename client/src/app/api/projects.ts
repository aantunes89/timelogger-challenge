import axios from "axios";
import { Project } from "../models/Project";
import { setupProjectPayload } from "../services/payload-formatter";
import { getEntries } from "../services/storage";

const BASE_URL = "http://localhost:3001/api";

const axiosApiService = axios.create({
  baseURL: BASE_URL,
});

axiosApiService.interceptors.response.use(
  (response) => {
    const { config } = response;

    if (config.url == "/projects" && response.data) {
      response.data = setupProjectPayload(response.data, getEntries());
    }

    return response;
  },
  (error) => error
);

export { axiosApiService };
