import React from "react";
import { Button, TextField, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import Table from "../components/Table/Table";
import { NewEntryModal } from "../components/NewEntryModal/NewEntryModal";
import { RoundButton } from "../components/RoundButton/styles";
import { Container } from "./styles";

import { useScreenState } from "../hooks/useScreenState";
import { NewProjectModal } from "../components/NewProjectModal/NewProjectModal";
import { useProjects } from "../hooks/useProjects";

export default function Projects() {
  const { isModalOpen, setModalOpen, isProjectModalOpen, setProjectModalOpen } =
    useScreenState();

  const { sortByDeadLine } = useProjects();

  return (
    <>
      <Container>
        <Box>
          <Button
            size="large"
            variant="contained"
            onClick={() => setProjectModalOpen(true)}
            className="add-project-btn"
          >
            Add Project
          </Button>

          <Button
            size="large"
            variant="outlined"
            onClick={() => sortByDeadLine()}
          >
            Prioritize
          </Button>
        </Box>
        <Box>
          <TextField
            role="search-field"
            size="small"
            id="outlined-basic"
            label="Search"
            variant="outlined"
          />

          <RoundButton variant="contained" role="search-btn">
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
