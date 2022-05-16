import React from "react";
import { NewEntryModal } from "../components/NewEntryModal/NewEntryModal";

import { Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { useScreenState } from "../hooks/useScreenState";

import Table from "../components/Table/Table";
import { RoundButton } from "../components/RoundButton/styles";

export default function Projects() {
  const { isModalOpen, setModalOpen } = useScreenState();

  function handleCloseNewEntryModal() {
    setModalOpen(false);
  }

  return (
    <>
      <div className="flex items-center my-6">
        <div className="w-1/2">
          <Button size="large" variant="contained">
            Add Project
          </Button>
        </div>

        <div className="w-1/2 flex justify-end align-center">
          <form>
            {/* <input
              className="border rounded-full py-2 px-4"
              type="search"
              placeholder="Search"
              aria-label="Search"
            /> */}

            <TextField
              size="small"
              id="outlined-basic"
              label="Search"
              variant="outlined"
            />

            <RoundButton variant="contained">
              <SearchIcon />
            </RoundButton>
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
