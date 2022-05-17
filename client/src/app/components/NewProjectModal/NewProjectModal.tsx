import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Container } from "./styles";

import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Button, Stack, TextField } from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";

import closeSvg from "../../assets/close.svg";

import { storeEntry } from "../../services/storageService";
import { useProjects } from "../../hooks/useProjects";
import { useScreenState } from "../../hooks/useScreenState";

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

  // remover estes estados
  const { projectId } = useProjects();
  const [description, setDescription] = useState<string>("");
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [hourlyRate, setHourlyRate] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const [projectName, setProjectName] = useState<string>("");
  const [deadLine, setDeadLine] = useState<Date | null>(null);

  useEffect(() => {
    timeSpent && hourlyRate
      ? setTotalPrice(timeSpent * hourlyRate)
      : setTotalPrice(0);
  }, [timeSpent, hourlyRate]);

  function handleInputNumber(
    { target }: NewEntryInputEvent,
    cb: (val: number) => void
  ) {
    const { value } = target;
    const newVal = value ? Number.parseInt(value) : 0;
    return cb(newVal);
  }

  function onSaveEntry(event: NewEntrySubmitEvent) {
    event.preventDefault();

    storeEntry({
      projectId,
      taskDescription: description,
      timeSpent,
      hourlyPrice: hourlyRate,
      totalPrice,
    });

    resetState();
    setShouldUpdate(true);
  }

  function resetState() {
    setDescription("");
    setTimeSpent(0);
    setHourlyRate(0);
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
          <div className="total-description">
            {totalPrice ? <label>Total: ${totalPrice}</label> : null}
          </div>

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
              disabled={totalPrice ? false : true}
              type="submit"
              onClick={(e) => onSaveEntry(e)}
            >
              Save Entry
            </Button>
          </div>
        </footer>
      </Container>
    </Modal>
  );
}
