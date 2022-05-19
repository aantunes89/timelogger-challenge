import { Entry } from "../models/Entry";
import { Project } from "../models/Project";

export enum StorageKeys {
  ENTRIES = "ENTRIES",
  SEED = "SEED",
}

export function storeEntry(entry: Entry) {
  const currentEntries = getEntries();

  if (currentEntries) {
    const newEntry: Entry = { ...entry, id: currentEntries.length + 1 };

    const newEntriesList = [...currentEntries, newEntry];

    localStorage.setItem(StorageKeys.ENTRIES, JSON.stringify(newEntriesList));
  } else {
    const newEntry: Entry = { ...entry, id: 1 };
    localStorage.setItem(StorageKeys.ENTRIES, JSON.stringify([newEntry]));
  }
}

export function getEntries(): Entry[] {
  if (localStorage.getItem(StorageKeys.ENTRIES)) {
    const entries = localStorage.getItem(StorageKeys.ENTRIES);
    return entries ? (JSON.parse(entries) as Entry[]) : [];
  }

  return [];
}

export function storeListOfEntries(entries: Entry[]): void {
  localStorage.setItem(StorageKeys.ENTRIES, JSON.stringify(entries));
}
