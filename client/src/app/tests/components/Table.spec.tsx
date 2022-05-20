import { fireEvent, render } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import Table from "../../components/Table/Table";
import { useProjectsStateBuilder } from "../../hooks/useProjects";

describe("Table Component", () => {
  it("Should render elements", () => {
    const { result } = renderHook(() => useProjectsStateBuilder());
    const { getByText } = render(<Table />);

    result.current.projects.forEach((project) => {
      expect(getByText("Name")).toBeInTheDocument();
      expect(getByText("Deadline")).toBeInTheDocument();
      expect(getByText("Total Price")).toBeInTheDocument();
      expect(getByText("Total Work Time")).toBeInTheDocument();
      expect(getByText("Add Entry")).toBeInTheDocument();
    });
  });

  it("", () => {
    const { result } = renderHook(() => useProjectsStateBuilder());
    const { getByText } = render(<Table />);

    const addEntryMock = jest.fn().mockImplementation(() => result.current.setProjectId(1));

    result.current.projects.forEach((project) => {
      const addBtn = getByText("Add Entry");
      addBtn.addEventListener("click", addEntryMock);

      fireEvent.click(addBtn);

      expect(result.current.projectId).toEqual(1);
      expect(result.current.setProjectId).toHaveBeenCalled();
      expect(addEntryMock).toHaveBeenCalled();
    });
  });
});
