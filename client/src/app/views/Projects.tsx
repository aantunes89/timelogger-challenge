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

  const { setProjects, projects } = useProjects();

  function sortByDeadLine() {
    const sortedProjects = projects.sort(
      (prevProject, currProject) =>
        new Date(prevProject.deadLine).getTime() - new Date(currProject.deadLine).getTime()
    );

    setProjects([...sortedProjects]);
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
            Prioritise My Work
          </Button>
        </Box>
      </Container>

      <NewEntryModal isOpen={isModalOpen} onRequestClose={() => setModalOpen(false)} />

      <NewProjectModal
        isOpen={isProjectModalOpen}
        onRequestClose={() => setProjectModalOpen(false)}
      />

      <CustomSnackBar />

      <Table />
    </>
  );
}
