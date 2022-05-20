import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { CustomModal } from "../../components/CustomModal/CustomModal";
import Modal from "react-modal";

describe("Custom Modal", () => {
  Modal.setAppElement(document.createElement("div"));

  it("should render title and footer", () => {
    const { getByText } = render(
      <CustomModal
        title="A Title"
        disabled={false}
        onRequestClose={jest.fn}
        onSubmit={jest.fn}
        totalPrice={100}
        isOpen={true}
      >
        <div>Modal Content</div>
      </CustomModal>
    );

    expect(getByText("A Title")).toBeInTheDocument();
    expect(getByText("Total: $100")).toBeInTheDocument();
    expect(getByText("Submit")).toBeInTheDocument();
    expect(getByText("Cancel")).toBeInTheDocument();
  });

  it("should call onRequestClose", () => {
    const closeMockFn = jest.fn();

    const { getByText } = render(
      <CustomModal
        title="A Title"
        disabled={false}
        onRequestClose={closeMockFn}
        onSubmit={jest.fn}
        totalPrice={100}
        isOpen={true}
      >
        <div>Modal Content</div>
      </CustomModal>
    );

    const cancelBtn = getByText("Cancel");
    fireEvent.click(cancelBtn);

    expect(closeMockFn).toHaveBeenCalled();
  });

  it("should call onSubmit", () => {
    const submitMockFn = jest.fn();

    const { getByText } = render(
      <CustomModal
        title="A Title"
        disabled={false}
        onRequestClose={jest.fn()}
        onSubmit={submitMockFn}
        totalPrice={100}
        isOpen={true}
      >
        <div>Modal Content</div>
      </CustomModal>
    );

    const submitBtn = getByText("Submit");
    fireEvent.click(submitBtn);

    expect(submitMockFn).toHaveBeenCalled();
  });
});
