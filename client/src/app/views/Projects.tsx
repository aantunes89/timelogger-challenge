import React, { useState } from "react";
import { NewEntryModal } from "../components/NewEntryModal/NewEntryModal";
import Table from "../components/Table/Table";

export default function Projects() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  function handleOpenNewEntryModal() {
    setIsModalOpen(true);
  }

  function handleCloseNewEntryModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      <div className="flex items-center my-6">
        <div className="w-1/2">
          <button
            onClick={() => handleOpenNewEntryModal()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add entry
          </button>
        </div>

        <div className="w-1/2 flex justify-end">
          <form>
            <input
              className="border rounded-full py-2 px-4"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white rounded-full py-2 px-4 ml-2"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      <NewEntryModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseNewEntryModal}
      />

      <Table />
    </>
  );
}
