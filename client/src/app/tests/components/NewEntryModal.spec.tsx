import { fireEvent, render } from "@testing-library/react";
import Modal from "react-modal";
import { NewEntryModal } from "../../components/NewEntryModal/NewEntryModal";
import { renderHook, act } from "@testing-library/react-hooks";
import { Dispatch, useState } from "react";
import React from "react";

describe("", () => {
  Modal.setAppElement(document.createElement("div"));

  it("should render NewEntryModal", () => {
    const { getByText } = render(<NewEntryModal isOpen={true} onRequestClose={jest.fn()} />);

    expect(getByText("New Entry")).toBeInTheDocument();
    expect(getByText("Task Description")).toBeInTheDocument();
    expect(getByText("Time Spent")).toBeInTheDocument();
    expect(getByText("Hourly Rate")).toBeInTheDocument();
  });

  it("should change task description input value", () => {
    const setTaskDescription = jest.fn();

    const { getByText } = render(<NewEntryModal isOpen={true} onRequestClose={jest.fn} />);

    const taskDescriptionInput = getByText("Task Description");
    taskDescriptionInput.addEventListener("change", setTaskDescription);

    fireEvent.change(taskDescriptionInput);

    expect(setTaskDescription).toHaveBeenCalled();
  });

  it("should change time spent input value", () => {
    const setTimeSpent = jest.fn();

    const { getByText } = render(<NewEntryModal isOpen={true} onRequestClose={jest.fn} />);

    const timeSpentInput = getByText("Time Spent");
    timeSpentInput.addEventListener("change", setTimeSpent);

    fireEvent.change(timeSpentInput);

    expect(setTimeSpent).toHaveBeenCalled();
  });

  it("should change hourly rate input value", () => {
    const setHourlyRate = jest.fn();

    const { getByText } = render(<NewEntryModal isOpen={true} onRequestClose={jest.fn} />);

    const hourlyRate = getByText("Hourly Rate");
    hourlyRate.addEventListener("change", setHourlyRate);

    fireEvent.change(hourlyRate);

    expect(setHourlyRate).toHaveBeenCalled();
  });

  it("should change hourly rate input value", () => {
    const setState = jest.fn();

    const useStateMock: any = (state: any) => [state, setState];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);

    const { getByText } = render(<NewEntryModal isOpen={true} onRequestClose={jest.fn} />);
    const hourlyRate = getByText("Hourly Rate");
    hourlyRate.addEventListener("change", setState);

    fireEvent.change(hourlyRate);

    expect(setState).toHaveBeenCalled();
  });
});
