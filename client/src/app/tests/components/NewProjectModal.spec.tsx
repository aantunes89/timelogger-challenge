import React from "react";
import { render } from "@testing-library/react";
import Modal from "react-modal";
import { NewProjectModal } from "../../components/NewProjectModal/NewProjectModal";

describe("New Project Modal", () => {
  Modal.setAppElement(document.createElement("div"));

  it("should render NewEntryModal", () => {
    const { getByText, getByTestId } = render(
      <NewProjectModal isOpen={true} onRequestClose={jest.fn()} />
    );

    expect(getByText("Project Name")).toBeInTheDocument();
    expect(getByText("Deadline")).toBeInTheDocument();
    expect(getByTestId("date-picker-wrapper")).toBeInTheDocument();
    expect(getByText("Submit")).toBeInTheDocument();
  });
});
