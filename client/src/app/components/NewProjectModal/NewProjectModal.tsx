import React, { useState } from "react";

import { Stack, TextField } from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";

import { useScreenState } from "../../hooks/useScreenState";
import { axiosApiService } from "../../api/projects";

import { Project } from "../../models/Project";
import { FormSubmitEvent } from "../../types/FormEvents";

import { CustomModal } from "../CustomModal/CustomModal";
import { useProjects } from "../../hooks/useProjects";

interface NewEntryModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewProjectModal(props: NewEntryModalProps) {
  const { isOpen, onRequestClose } = props;
  const { setShouldUpdate, setShowSnackBar } = useScreenState();
  const { addProject } = useProjects();

  const [projectName, setProjectName] = useState<string>("");
  const [deadLine, setDeadLine] = useState<Date | null>(null);

  async function onSaveProject(event: FormSubmitEvent) {
    event.preventDefault();

    const projectDeadLine = deadLine ? deadLine : new Date(Date.now());

    await addProject({ deadLine: projectDeadLine, name: projectName });

    resetState();
    setShouldUpdate(true);
    setShowSnackBar(true);
    onRequestClose();
  }

  function resetState() {
    setProjectName("");
    setDeadLine(null);
  }

  return (
    <CustomModal
      title="New Project"
      isOpen={isOpen}
      disabled={deadLine && projectName ? false : true}
      onRequestClose={onRequestClose}
      onSubmit={(e) => onSaveProject(e)}
    >
      <>
        <div className="form-field">
          <label>Project Name</label>
          <input
            type="text"
            value={projectName}
            onChange={(event) => setProjectName(event.target.value)}
          />
        </div>

        <div className="form-field">
          <label>Deadline</label>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={4} sx={{ width: "100%" }}>
              <DatePicker
                renderInput={(params) => <TextField {...params} />}
                value={deadLine}
                onChange={(newValue) => setDeadLine(newValue)}
              />
            </Stack>
          </LocalizationProvider>
        </div>
      </>
    </CustomModal>
  );
}
