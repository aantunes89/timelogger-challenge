import React, { ReactNode } from "react";
import { Project } from "../../models/Project";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ContentContainer } from "./styles";

interface ProjectItemProps {
  project: Project;
  children: ReactNode;
}

export function ProjectItem({ project, children }: ProjectItemProps) {
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

      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}
