import React, { useState } from "react";
import Modal from "react-modal";
import { Container } from "./styles";

import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Button, Stack, TextField } from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";

import closeSvg from "../../assets/close.svg";

import { useScreenState } from "../../hooks/useScreenState";
import { axiosApiService } from "../../api/projects";
import { Project } from "../../models/Project";

Modal.setAppElement("#root");

type NewEntryInputEvent = React.ChangeEvent<HTMLInputElement>;
type NewEntrySubmitEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;

interface NewEntryModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewProjectModal({
  isOpen,
  onRequestClose,
}: NewEntryModalProps) {
  const { setShouldUpdate } = useScreenState();

  const [projectName, setProjectName] = useState<string>("");
  const [deadLine, setDeadLine] = useState<Date | null>(null);

  function onSaveProject(event: NewEntrySubmitEvent) {
    event.preventDefault();

    const projectDeadLine = deadLine
      ? deadLine.toISOString()
      : new Date(Date.now());

    axiosApiService
      .post<Project>("/projects", {
        name: projectName,
        deadLine: projectDeadLine,
      })
      .then(console.log);

    resetState();
    setShouldUpdate(true);
  }

  function resetState() {
    setProjectName("");
    setDeadLine(null);
  }

  return (
    <Modal
      isOpen={isOpen}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      onRequestClose={onRequestClose}
    >
      <Container>
        <h2>New Project</h2>
        <button
          type="button"
          className="react-modal-close"
          onClick={onRequestClose}
        >
          <img src={closeSvg} alt="close btn" />
        </button>

        <div className="form-field">
          <label>Project Name</label>
          <input
            type="text"
            value={projectName}
            onChange={(event) => setProjectName(event.target.value)}
          />
        </div>

        <div className="form-field">
          <label>Time Spent</label>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={4} sx={{ width: "100%" }}>
              <DatePicker
                label="Deadline"
                renderInput={(params) => <TextField {...params} />}
                value={deadLine}
                onChange={(newValue) => setDeadLine(newValue)}
              />
            </Stack>
          </LocalizationProvider>
        </div>

        <footer>
          <div className="total-description"></div>

          <div className="action-buttons__wrapper">
            <Button
              size="large"
              variant="outlined"
              type="button"
              className="cancel"
            >
              Cancel
            </Button>

            <Button
              size="large"
              variant="contained"
              disabled={deadLine && projectName ? false : true}
              type="submit"
              onClick={(e) => onSaveProject(e)}
            >
              Save Project
            </Button>
          </div>
        </footer>
      </Container>
    </Modal>
  );
}