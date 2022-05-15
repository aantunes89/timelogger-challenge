import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Container } from "./style";

import closeSvg from "../../assets/close.svg";
import { Entry } from "../../models/Entry";

Modal.setAppElement("#root");

interface NewEntryModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewEntryModal({ isOpen, onRequestClose }: NewEntryModalProps) {
  const [description, setDescription] = useState<string>("");
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [hourlyRate, setHourlyRate] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    timeSpent && hourlyRate
      ? setTotalPrice(timeSpent * hourlyRate)
      : setTotalPrice(0);
  }, [timeSpent, hourlyRate]);

  function handleHourlyRateUpdate(event: any) {
    const newVal = numberParserValidation(event);
    setHourlyRate(newVal);
  }

  function handleTimeSpentUpdate(event: any) {
    const newVal = numberParserValidation(event);
    setTimeSpent(newVal);
  }

  function numberParserValidation(event: any) {
    return event.target.value ? Number.parseInt(event.target.value) : 0;
  }

  function onSaveEntry(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();

    // colocar no serviço
    const newEntry: Entry = {
      projectId: 1,
      taskDescription: description,
      timeSpent,
      hourlyPrice: hourlyRate,
      totalPrice,
    };
    // colocar no serviço
    localStorage.setItem(
      `${localStorage.length + 1}`,
      JSON.stringify(newEntry)
    );

    resetState();
    onRequestClose();
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
          onChange={(e) => handleTimeSpentUpdate(e)}
        />

        <input
          type="number"
          min={0}
          placeholder="Hourly Rate"
          value={hourlyRate}
          onChange={(e) => handleHourlyRateUpdate(e)}
        />

        <input
          type="text"
          disabled={true}
          min={0}
          placeholder="Hourly Rate"
          value={totalPrice}
        />

        <div className="action-buttons__wrapper">
          <button
            disabled={totalPrice ? false : true}
            type="submit"
            onClick={(e) => onSaveEntry(e)}
          >
            Save Entry
          </button>
          <button type="button" className="cancel">
            Cancel
          </button>
        </div>
      </Container>
    </Modal>
  );
}
