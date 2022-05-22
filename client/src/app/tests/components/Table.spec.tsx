import { render, waitFor } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";
import Table from "../../components/Table/Table";
import { useProjectsStateBuilder } from "../../hooks/useProjects";
import { Project } from "../../models/Project";

const mockProjects: Project[] = [
  {
    id: 1,
    name: "Project 1",
    deadLine: new Date(2022, 4, 1),
    totalPrice: 0,
    totalTimeSpent: 0,
    entries: [],
  },
];

describe("Table Component", () => {
  it("Should render elements", async () => {
    const { result } = renderHook(() => useProjectsStateBuilder());
    act(() => {
      result.current.setProjects(mockProjects);
    });

    const { getByText } = render(<Table project={mockProjects[0]} />);

    await waitFor(() => {
      expect(getByText("Name")).toBeInTheDocument();
      expect(getByText("Deadline")).toBeInTheDocument();
      expect(getByText("Total Price")).toBeInTheDocument();
      expect(getByText("Total Work Time")).toBeInTheDocument();
      expect(getByText("Add Entry")).toBeInTheDocument();
    });
  });
});
