import React from "react";
import { useProjects } from "../../hooks/useProjects";
import { useScreenState } from "../../hooks/useScreenState";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ContentContainer } from "./styles";

export default function Table() {
  const { projects, setProjectId } = useProjects();
  const { setModalOpen } = useScreenState();

  function addEntry(projectId: number) {
    setProjectId(projectId);
    setModalOpen(true);
  }

  function renderAccordions() {
    return projects.map((project) => {
      return (
        <Accordion key={project.id}>
          <AccordionSummary
            id={`panel${project.id}`}
            expandIcon={<ExpandMoreIcon />}
          >
            <ContentContainer>
              <Typography style={{ marginRight: 8 }}>
                <label>Project Name</label> {project?.name}
              </Typography>

              <Typography>
                <label>Deadline</label>
                {new Date(`${project?.deadLine}`).toLocaleDateString("pt-BR")}
              </Typography>

              <Typography>
                <label>Current Price</label>
                {`$${project?.totalPrice}`}
              </Typography>
            </ContentContainer>
          </AccordionSummary>

          <AccordionDetails>
            <Button variant="outlined" onClick={() => addEntry(project.id)}>
              Add Entry
            </Button>
          </AccordionDetails>
        </Accordion>
      );
    });
  }

  return <>{projects && renderAccordions()}</>;
}
