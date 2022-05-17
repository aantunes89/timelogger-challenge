import React from "react";
import { Button, TextField, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import Table from "../components/Table/Table";
import { NewEntryModal } from "../components/NewEntryModal/NewEntryModal";
import { RoundButton } from "../components/RoundButton/styles";
import { Container } from "./styles";

import { useScreenState } from "../hooks/useScreenState";
import { NewProjectModal } from "../components/NewProjectModal/NewProjectModal";

export default function Projects() {
  const { isModalOpen, setModalOpen, isProjectModalOpen, setProjectModalOpen } =
    useScreenState();

  return (
    <>
      <Container>
        <Box>
          <Button
            size="large"
            variant="contained"
            onClick={() => setProjectModalOpen(true)}
          >
            Add Project
          </Button>
        </Box>
        <Box>
          <TextField
            size="small"
            id="outlined-basic"
            label="Search"
            variant="outlined"
          />

          <RoundButton variant="contained">
            <SearchIcon />
          </RoundButton>
        </Box>
      </Container>

      <NewEntryModal
        isOpen={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
      />

      <NewProjectModal
        isOpen={isProjectModalOpen}
        onRequestClose={() => setProjectModalOpen(false)}
      />

      <Table />
    </>
  );
}
