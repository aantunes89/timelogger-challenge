import { Entry } from "../../models/Entry";
import { Project } from "../../models/Project";
import { getEntries, StorageKeys, storeEntry, storeListOfEntries } from "../../services/storage";

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

const mockEntries: Entry[] = [
  { projectId: 1, description: "Task 1", timeSpent: 8, hourlyRate: 20, totalPrice: 160, id: 1 },
  { projectId: 1, description: "Task 2", timeSpent: 8, hourlyRate: 30, totalPrice: 240, id: 2 },
];

describe("Storage Service", () => {
  let newEntry = {};

  beforeEach(() => {
    return (newEntry = {
      projectId: 1,
      description: "Task 3",
      timeSpent: 8,
      hourlyRate: 20,
      totalPrice: 160,
      id: 1,
    });
  });

  afterEach(() => {
    newEntry = {};
  });

  it("should store entries in localStorage when storeEntry is called", () => {
    const entry = {
      projectId: 1,
      description: "Task 3",
      timeSpent: 8,
      hourlyRate: 20,
      totalPrice: 160,
      id: 1,
    };

    storeEntry(entry);

    const entries = localStorage.getItem(StorageKeys.ENTRIES);

    expect(entries).toBeTruthy();
  });

  it("should store first entry in localStorage", () => {
    localStorage.clear();

    storeEntry(newEntry as Entry);

    const entries = localStorage.getItem(StorageKeys.ENTRIES);

    expect(JSON.parse(entries!!).length).toEqual(1);
  });

  it("should get and return entries", () => {
    localStorage.setItem(StorageKeys.ENTRIES, JSON.stringify(mockProjects));

    const entries = getEntries();

    expect(entries.length).toBeGreaterThan(0);
    expect(entries.length).toEqual(1);
  });

  it("should call getEntries and return empty list", () => {
    localStorage.clear();

    const entries = getEntries();

    expect(entries.length).not.toBeGreaterThan(0);
    expect(entries.length).toEqual(0);
  });

  it("should store list of entries", () => {
    localStorage.clear();

    storeListOfEntries(mockEntries);
    const entries = localStorage.getItem(StorageKeys.ENTRIES);

    expect(entries).toBeTruthy();
    expect(JSON.parse(entries!!).length).toBeGreaterThan(0);
  });
});
