import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Container } from "./styles";

import closeSvg from "../../assets/close.svg";

import { storeEntry } from "../../services/storageService";
import { useProjects } from "../../hooks/useProjects";
import { Button } from "@mui/material";

Modal.setAppElement("#root");

type NewEntryInputEvent = React.ChangeEvent<HTMLInputElement>;
type NewEntrySubmitEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;

interface NewEntryModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewEntryModal({ isOpen, onRequestClose }: NewEntryModalProps) {
  const { projectId } = useProjects();

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
        <button
          type="button"
          className="react-modal-close"
          onClick={onRequestClose}
        >
          <img src={closeSvg} alt="close btn" />
        </button>

        <input
          type="text"
          placeholder="Task Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <input
          type="number"
          min={0}
          placeholder="Time Spent"
          value={timeSpent}
          onChange={(e) => handleInputNumber(e, setTimeSpent)}
        />

        <input
          type="number"
          min={0}
          placeholder="Hourly Rate"
          value={hourlyRate}
          onChange={(e) => handleInputNumber(e, setHourlyRate)}
        />

        <input
          type="text"
          disabled={true}
          min={0}
          placeholder="Hourly Rate"
          value={totalPrice}
        />

        <div className="action-buttons__wrapper">
          <Button
            disabled={totalPrice ? false : true}
            type="submit"
            onClick={(e) => onSaveEntry(e)}
          >
            Save Entry
          </Button>
          <button type="button" className="cancel">
            Cancel
          </button>
        </div>
      </Container>
    </Modal>
  );
}
