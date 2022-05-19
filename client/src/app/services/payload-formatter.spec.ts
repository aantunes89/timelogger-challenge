import { Entry } from "../models/Entry";
import { Project } from "../models/Project";
import { setupProjectPayload } from "./payload-formatter";
import { StorageKeys } from "./storage";

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

const mockEntries = [
  { projectId: 1, description: "Task 1", timeSpent: 8, hourlyRate: 20, totalPrice: 160, id: 1 },
  { projectId: 1, description: "Task 2", timeSpent: 8, hourlyRate: 30, totalPrice: 240, id: 2 },
];

it("should add entries to projects data", () => {
  const newProjectsList = setupProjectPayload(mockProjects, mockEntries);

  expect(newProjectsList[0].entries.length).toBeGreaterThan(0);
  expect(newProjectsList[0].entries).toEqual(mockEntries);
});

it("should add totalPrice to projects data", () => {
  const newProjectsList = setupProjectPayload(mockProjects, mockEntries);

  const totalPriceArr = newProjectsList.map(({ totalPrice }) => totalPrice);
  const total = totalPriceArr.reduce((acc, curr) => acc + curr);

  expect(newProjectsList[0].totalPrice).toBeGreaterThan(0);
  expect(newProjectsList[0].totalPrice).toEqual(total);
});

it("should add totalTimeSpent to projects data", () => {
  const newProjectsList = setupProjectPayload(mockProjects, mockEntries);

  const totalTimeSpentArr = newProjectsList.map(({ totalTimeSpent }) => totalTimeSpent);
  const total = totalTimeSpentArr.reduce((acc, curr) => acc + curr);

  expect(newProjectsList[0].totalTimeSpent).toBeGreaterThan(0);
  expect(newProjectsList[0].totalTimeSpent).toEqual(total);
});

it("should store projects with entries", () => {
  setupProjectPayload(mockProjects, mockEntries);

  expect(localStorage.getItem(StorageKeys.ENTRIES)).toBeTruthy();
});
