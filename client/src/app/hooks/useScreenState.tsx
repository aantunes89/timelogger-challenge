import React, { createContext, ReactNode, useContext, useState } from "react";
import { ProjectsProvider } from "./useProjects";

interface ScreenStateProviderProps {
  children: ReactNode;
}

interface ScreenStateContextData {
  isModalOpen: boolean;
  setModalOpen: (value: boolean) => void;
  shouldUpdate: boolean;
  setShouldUpdate: (value: boolean) => void;
  isProjectModalOpen: boolean;
  setProjectModalOpen: (value: boolean) => void;
  showSnackBar: boolean;
  setShowSnackBar: (value: boolean) => void;
  snackBarMsg: string;
  setSnackBarMsg: (value: string) => void;
}

const ScreenStateContext = createContext<ScreenStateContextData>({} as ScreenStateContextData);

export function ScreenStateProvider({ children }: ScreenStateProviderProps) {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [shouldUpdate, setShouldUpdate] = useState<boolean>(true);
  const [isProjectModalOpen, setProjectModalOpen] = useState<boolean>(false);

  const [showSnackBar, setShowSnackBar] = useState<boolean>(false);
  const [snackBarMsg, setSnackBarMsg] = useState<string>("");

  return (
    <ScreenStateContext.Provider
      value={{
        isModalOpen,
        setModalOpen,
        shouldUpdate,
        setShouldUpdate,
        isProjectModalOpen,
        setProjectModalOpen,
        showSnackBar,
        setShowSnackBar,
        snackBarMsg,
        setSnackBarMsg,
      }}
    >
      <ProjectsProvider children={children} />
    </ScreenStateContext.Provider>
  );
}

export function useScreenState() {
  const context = useContext(ScreenStateContext);

  return context;
}
