import React, { useState } from "react";
import Modal from "react-modal";
import { Container } from "./style";

import closeSvg from "../../assets/close.svg";

interface NewEntryModalProps {
  isOpen: boolean;
  onRequestClose?: () => void;
}

export function NewEntryModal({ isOpen, onRequestClose }: NewEntryModalProps) {
  const [description, setDescription] = useState<string>("");
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [hourlyPrice, setHourlyPrice] = useState<number>(0);

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
          placeholder="Project Name"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <input
          type="number"
          min={0}
          placeholder="Expected Time"
          value={timeSpent}
          onChange={(event) =>
            setTimeSpent(Number.parseInt(event.target.value))
          }
        />

        <input
          type="number"
          min={0}
          placeholder="Expected Time"
          value={hourlyPrice}
          onChange={(event) =>
            setHourlyPrice(Number.parseInt(event.target.value))
          }
        />

        <div className="action-buttons__wrapper">
          <button type="submit">Save Entry</button>
          <button type="button" className="cancel">
            Cancel
          </button>
        </div>
      </Container>
    </Modal>
  );
}
