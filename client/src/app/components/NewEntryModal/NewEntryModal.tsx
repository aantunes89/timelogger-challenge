import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Container } from "./styles";

import closeSvg from "../../assets/close.svg";

import { storeEntry } from "../../services/storageService";
import { useProjects } from "../../hooks/useProjects";
import { Button } from "@mui/material";
import { useScreenState } from "../../hooks/useScreenState";

Modal.setAppElement("#root");

type NewEntryInputEvent = React.ChangeEvent<HTMLInputElement>;
type NewEntrySubmitEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;

interface NewEntryModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewEntryModal({ isOpen, onRequestClose }: NewEntryModalProps) {
  const { projectId } = useProjects();

  const { setShouldUpdate } = useScreenState();

  const [description, setDescription] = useState<string>("");
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [hourlyRate, setHourlyRate] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

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
        <h2>New Entry</h2>
        <button
          type="button"
          className="react-modal-close"
          onClick={onRequestClose}
        >
          <img src={closeSvg} alt="close btn" />
        </button>

        <div className="form-field">
          <label>Task Description</label>
          <input
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div className="form-field">
          <label>Time Spent</label>
          <input
            type="number"
            min={0}
            value={timeSpent}
            onChange={(e) => handleInputNumber(e, setTimeSpent)}
          />
        </div>

        <div className="form-field">
          <label>Hourly Rate</label>
          <input
            type="number"
            min={0}
            value={hourlyRate}
            onChange={(e) => handleInputNumber(e, setHourlyRate)}
          />
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
              onClick={onRequestClose}
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
