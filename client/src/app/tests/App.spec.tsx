import { render } from "@testing-library/react";
import App from "../App";
import Projects from "../views/Projects";

describe("App Component", () => {
  it("should render all elements of AppBar", () => {
    const { getByTestId } = render(<App />);
    const projects = render(<Projects />);

    expect(getByTestId("header-wrapper")).toBeTruthy();
    expect(getByTestId("app-bar")).toBeTruthy();
    expect(getByTestId("tool-bar")).toBeTruthy();
    expect(getByTestId("typography-header")).toBeTruthy();
    expect(getByTestId("body-wrapper")).toBeTruthy();
  });

  it("should display Timelogger in the header", () => {
    const { getByText } = render(<App />);

    expect(getByText("Timelogger")).toBeTruthy();
  });
});
