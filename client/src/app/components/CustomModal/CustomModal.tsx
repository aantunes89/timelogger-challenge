import React, { ReactNode } from "react";
import Modal from "react-modal";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { FormSubmitEvent } from "../../types/FormEvents";
import { Container } from "./styles";

interface CustomModalProps {
  isOpen: boolean;
  title: string;
  disabled: boolean;
  children: ReactNode;
  onRequestClose: () => void;
  onSubmit: (event?: FormSubmitEvent) => void;
  totalPrice?: number;
}

export function CustomModal(props: CustomModalProps) {
  const { children } = props;
  return (
    <Modal
      isOpen={props.isOpen}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      onRequestClose={props.onRequestClose}
    >
      <Container>
        <h2>{props.title}</h2>
        <CloseIcon className="react-modal-close" onClick={props.onRequestClose} />

        {children}

        <footer>
          <div className="total-description">
            {props.totalPrice ? <label>Total: ${props.totalPrice}</label> : null}
          </div>

          <div className="action-buttons__wrapper">
            <Button
              size="large"
              variant="outlined"
              type="button"
              className="cancel"
              onClick={props.onRequestClose}
            >
              Cancel
            </Button>

            <Button
              size="large"
              variant="contained"
              disabled={props.disabled}
              type="button"
              onClick={props.onSubmit}
            >
              Submit
            </Button>
          </div>
        </footer>
      </Container>
    </Modal>
  );
}
