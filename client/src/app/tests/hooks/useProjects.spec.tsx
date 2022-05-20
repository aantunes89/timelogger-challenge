import { renderHook, act } from "@testing-library/react-hooks";
import { useProjectsStateBuilder } from "../../hooks/useProjects";
import { Project } from "../../models/Project";
import { axiosApiService } from "../../api/projects";
import AxiosMock from "axios-mock-adapter";

const apiMock = new AxiosMock(axiosApiService);

const mockProjects: Project[] = [
  {
    id: 1,
    name: "Project 1",
    deadLine: new Date(2022, 4, 1),
    totalPrice: 0,
    totalTimeSpent: 0,
    entries: [],
  },
];
describe("", () => {
  beforeEach(() => {
    apiMock.reset();
  });

  it("should update projects state", () => {
    const { result } = renderHook(() => useProjectsStateBuilder());
    expect(result.current.projects).toEqual([]);

    act(() => {
      result.current.setProjects(mockProjects);
    });

    expect(result.current.projects.length).toBeGreaterThan(0);
    expect(result.current.projects).toEqual(mockProjects);
  });

  it("should update projectId state", () => {
    const { result } = renderHook(() => useProjectsStateBuilder());
    expect(result.current.projectId).toEqual(null);

    act(() => {
      result.current.setProjectId(1);
    });

    expect(result.current.projectId).toEqual(1);
  });

  // it("", () => {
  //   const { result } = renderHook(() => useProjectsStateBuilder());
  //   const body = { name: "A name", deadLine: new Date(Date.now()).toISOString };

  //   apiMock.onPost("/projects", body);

  //   expect(result.current.projects.length).toBeGreaterThan(1);
  // });
});
