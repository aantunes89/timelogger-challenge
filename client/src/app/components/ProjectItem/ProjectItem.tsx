import React, { ReactNode } from "react";
import { Project } from "../../models/Project";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
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
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Typography className="truncate">
                <label>Name</label>
                {project?.name}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>
                <label>Deadline</label>
                {new Date(`${project?.deadLine}`).toLocaleDateString("pt-BR")}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>
                <label>Total Price</label>
                {`$${project?.totalPrice}`}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>
                <label>Total Work Time</label>
                {`${project?.totalTimeSpent}h`}
              </Typography>
            </Grid>
          </Grid>
        </ContentContainer>
      </AccordionSummary>

      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}
