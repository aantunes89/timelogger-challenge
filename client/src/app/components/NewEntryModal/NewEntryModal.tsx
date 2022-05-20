import React, { useEffect, useState } from "react";

import { useProjects } from "../../hooks/useProjects";
import { useScreenState } from "../../hooks/useScreenState";
import { CustomModal } from "../CustomModal/CustomModal";

interface NewEntryModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewEntryModal({ isOpen, onRequestClose }: NewEntryModalProps) {
  const { projectId, addEntry } = useProjects();
  const { setShouldUpdate, setShowSnackBar, setSnackBarMsg } = useScreenState();

  const [description, setDescription] = useState<string>("");
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [hourlyRate, setHourlyRate] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    timeSpent && hourlyRate ? setTotalPrice(timeSpent * hourlyRate) : setTotalPrice(0);
  }, [timeSpent, hourlyRate]);

  function onSaveEntry() {
    addEntry({
      projectId,
      description,
      timeSpent,
      hourlyRate,
      totalPrice,
    });

    resetState();
    setShouldUpdate(true);
    setShowSnackBar(true);
    setSnackBarMsg("Successfully Saved");
  }

  function resetState() {
    setDescription("");
    setTimeSpent(0);
    setHourlyRate(0);
  }

  return (
    <CustomModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      title="New Entry"
      disabled={totalPrice ? false : true}
      onSubmit={() => onSaveEntry()}
      totalPrice={totalPrice}
    >
      <>
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
            role="time-spent-input"
            type="number"
            min={0}
            value={timeSpent}
            onChange={(e) => setTimeSpent(Number.parseInt(e.target.value))}
          />
        </div>

        <div className="form-field">
          <label>Hourly Rate</label>
          <input
            type="number"
            min={0}
            value={hourlyRate}
            onChange={(e) => setHourlyRate(Number.parseInt(e.target.value))}
          />
        </div>
      </>
    </CustomModal>
  );
}
