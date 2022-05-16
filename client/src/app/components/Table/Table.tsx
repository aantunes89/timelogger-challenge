import React from "react";
import { useProjects } from "../../hooks/useProjects";
import { useScreenState } from "../../hooks/useScreenState";
import { Project } from "../../models/Project";

export default function Table() {
  const { projects, setProjectId } = useProjects();
  const { setModalOpen } = useScreenState();

  function addEntry(projectId: number) {
    setProjectId(projectId);
    setModalOpen(true);
  }

  function renderProjects(projects: Project[]) {
    return projects.map(({ id, name }) => (
      <tr key={id} onClick={() => addEntry(id)}>
        <td className="border px-4 py-2 w-12">{id}</td>
        <td className="border px-4 py-2">{name}</td>
        <td className="border px-4 py-2">abc</td>
        <td className="border px-4 py-2">xyz</td>
      </tr>
    ));
  }

  return (
    <table className="table-fixed w-full">
      <thead className="bg-gray-200">
        <tr>
          <th className="border px-4 py-2 w-12">#</th>
          <th className="border px-4 py-2">Project Name</th>
          <th className="border px-4 py-2">abc</th>
          <th className="border px-4 py-2">xyz</th>
        </tr>
      </thead>
      <tbody>{projects && renderProjects(projects)}</tbody>
    </table>
  );
}
