import React from "react";
import { Button, Box } from "@mui/material";

import Table from "../components/Table/Table";
import { NewEntryModal } from "../components/NewEntryModal/NewEntryModal";
import { Container } from "./styles";

import { useScreenState } from "../hooks/useScreenState";
import { NewProjectModal } from "../components/NewProjectModal/NewProjectModal";
import { useProjects } from "../hooks/useProjects";
import { CustomSnackBar } from "../components/CustomSnackBar/CustomSnackBar";

export default function Projects() {
  const { isModalOpen, setModalOpen, isProjectModalOpen, setProjectModalOpen } = useScreenState();

  const { projects, setIsSorted, isSorted } = useProjects();
  const { setShouldUpdate } = useScreenState();

  function sortByDeadLine() {
    setIsSorted(!isSorted);
    setShouldUpdate(true);
  }

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

          <Button size="large" variant="outlined" onClick={() => sortByDeadLine()}>
            {isSorted ? "Disarrange" : "Prioritise My Work"}
          </Button>
        </Box>
      </Container>

      <NewEntryModal isOpen={isModalOpen} onRequestClose={() => setModalOpen(false)} />

      <NewProjectModal
        isOpen={isProjectModalOpen}
        onRequestClose={() => setProjectModalOpen(false)}
      />

      <CustomSnackBar />

      {projects?.map((project, index) => (
        <Table key={index} project={project} />
      ))}
    </>
  );
}
