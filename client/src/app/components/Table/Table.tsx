import React, { useState } from "react";
import { useProjects } from "../../hooks/useProjects";
import { useScreenState } from "../../hooks/useScreenState";

import DataTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Grid,
  TablePagination,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ContentContainer } from "./styles";

export default function Table() {
  const { projects, setProjectId } = useProjects();
  const { setModalOpen } = useScreenState();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
                    {new Date(`${project?.deadLine}`).toLocaleDateString(
                      "pt-BR"
                    )}
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

          <AccordionDetails>
            <TableContainer component={Paper}>
              <DataTable sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Task Description</TableCell>
                    <TableCell align="center">Hours Spent</TableCell>
                    <TableCell align="center">Hourly Rate</TableCell>
                    <TableCell align="center">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {project.entries
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((entry) => (
                      <TableRow
                        key={entry.id}
                        hover
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {entry.taskDescription}
                        </TableCell>
                        <TableCell align="center">{entry.timeSpent}h</TableCell>
                        <TableCell align="center">
                          ${entry.hourlyPrice}
                        </TableCell>
                        <TableCell align="center">
                          ${entry.totalPrice}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </DataTable>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10]}
              component="div"
              count={project.entries.length}
              rowsPerPage={5}
              page={page > 0 && project.entries.length < rowsPerPage ? 0 : page}
              onPageChange={(e, newPage) => setPage(newPage)}
              onRowsPerPageChange={(event) =>
                setRowsPerPage(Number.parseInt(event.target.value))
              }
            />

            <Button
              style={{ marginTop: "2rem" }}
              variant="outlined"
              onClick={() => addEntry(project.id)}
            >
              Add Entry
            </Button>
          </AccordionDetails>
        </Accordion>
      );
    });
  }

  return <>{projects && renderAccordions()}</>;
}
