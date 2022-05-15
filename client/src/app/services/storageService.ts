import { Entry } from "../models/Entry";

enum StorageKeys {
  ENTRIES = "ENTRIES",
}

export function storeEntry(entry: Entry) {
  const currentEntries = getEntries();

  if (currentEntries) {
    const parsedEntries = JSON.parse(currentEntries) as Entry[];

    const newEntry: Entry = { ...entry, id: parsedEntries.length + 1 };

    const newEntriesList = [...parsedEntries, newEntry];

    localStorage.setItem(StorageKeys.ENTRIES, JSON.stringify(newEntriesList));
  } else {
    const newEntry: Entry = { ...entry, id: 1 };
    localStorage.setItem(StorageKeys.ENTRIES, JSON.stringify([newEntry]));
  }
}

function getEntries() {
  return localStorage.getItem(StorageKeys.ENTRIES)
    ? localStorage.getItem(StorageKeys.ENTRIES)
    : null;
}
