import React, { createContext, ReactNode, useContext, useState } from "react";

interface ScreenStateProviderProps {
  children: ReactNode;
}

interface ScreenStateContextData {
  isModalOpen: boolean;
  setModalOpen: (value: boolean) => void;
  isFreelancerOverviewVisible: boolean;
  setFreelancerOverviewVisible: (value: boolean) => void;
}

const ScreenStateContext = createContext<ScreenStateContextData>(
  {} as ScreenStateContextData
);

export function ScreenStateProvider({ children }: ScreenStateProviderProps) {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const [isFreelancerOverviewVisible, setFreelancerOverviewVisible] =
    useState<boolean>(false);

  return (
    <ScreenStateContext.Provider
      value={{
        isModalOpen,
        setModalOpen,
        isFreelancerOverviewVisible,
        setFreelancerOverviewVisible,
      }}
    >
      {children}
    </ScreenStateContext.Provider>
  );
}

export function useScreenState() {
  const context = useContext(ScreenStateContext);

  return context;
}
