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

export const useScreenStatesGetter = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [shouldUpdate, setShouldUpdate] = useState<boolean>(true);
  const [isProjectModalOpen, setProjectModalOpen] = useState<boolean>(false);

  const [showSnackBar, setShowSnackBar] = useState<boolean>(false);
  const [snackBarMsg, setSnackBarMsg] = useState<string>("");

  return {
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
  };
};

const ScreenStateContext = createContext<ScreenStateContextData>({} as ScreenStateContextData);

export function ScreenStateProvider({ children }: ScreenStateProviderProps) {
  const screenStates = useScreenStatesGetter();

  return (
    <ScreenStateContext.Provider
      value={{
        ...screenStates,
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
