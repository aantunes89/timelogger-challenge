import React, { useEffect, useState } from "react";

import { useProjects } from "../../hooks/useProjects";
import { useScreenState } from "../../hooks/useScreenState";
import { storeEntry } from "../../services/storageService";
import { CustomModal } from "../CustomModal/CustomModal";
import { FormSubmitEvent, FormInputEvent } from "../../types/FormEvents";

interface NewEntryModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewEntryModal({ isOpen, onRequestClose }: NewEntryModalProps) {
  const { projectId } = useProjects();
  const { setShouldUpdate, setShowSnackBar, setSnackBarMsg } = useScreenState();

  const [description, setDescription] = useState<string>("");
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [hourlyRate, setHourlyRate] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    timeSpent && hourlyRate ? setTotalPrice(timeSpent * hourlyRate) : setTotalPrice(0);
  }, [timeSpent, hourlyRate]);

  function handleInputNumber({ target: { value } }: FormInputEvent, cb: (val: number) => void) {
    const newVal = value ? Number.parseInt(value) : 0;
    return cb(newVal);
  }

  async function onSaveEntry(event: FormSubmitEvent) {
    event.preventDefault();

    storeEntry({
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
      onSubmit={(e) => onSaveEntry(e)}
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
      </>
    </CustomModal>
  );
}
