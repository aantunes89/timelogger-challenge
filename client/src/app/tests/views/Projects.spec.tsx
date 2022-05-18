import { render } from "@testing-library/react";
import { NewProjectModal } from "../../components/NewProjectModal/NewProjectModal";
import Projects from "../../views/Projects";
import Modal from "react-modal";
import { NewEntryModal } from "../../components/NewEntryModal/NewEntryModal";
import { useState } from "react";

describe("Projects View - Rendered Components", () => {
  it("should have an open modal button", () => {
    const { getByText } = render(<Projects />);
    expect(getByText("Add Project")).toBeInTheDocument();
  });

  it("should have a prioritize button", () => {
    const { getByText } = render(<Projects />);
    expect(getByText("Prioritize")).toBeInTheDocument();
  });

  it("should have a search button", () => {
    const { getByRole } = render(<Projects />);
    expect(getByRole("search-btn")).toBeInTheDocument();
  });

  it("should have a search field", () => {
    const { getByRole } = render(<Projects />);
    expect(getByRole("search-field")).toBeInTheDocument();
  });
});

describe("Project - Test Modal Visibility", () => {
  Modal.setAppElement(document.createElement("div"));

  it("should render NewProjectModal", () => {
    const { getByText } = render(
      <NewProjectModal isOpen={true} onRequestClose={jest.fn()} />
    );

    expect(getByText("New Project")).toBeInTheDocument();
  });

  it("should render NewEntryModal", () => {
    const { getByText } = render(
      <NewEntryModal isOpen={true} onRequestClose={jest.fn()} />
    );

    expect(getByText("New Entry")).toBeInTheDocument();
  });

  // it('should open modal', () => {
  //   const [isOpen, setIsOpen] = useState(false)
  //   const { getByText } = render(
  //     <NewEntryModal isOpen={isOpen} onRequestClose={jest.fn()} />
  //   );

  // })
});
