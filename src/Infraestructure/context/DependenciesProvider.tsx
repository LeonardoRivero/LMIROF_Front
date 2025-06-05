import React, { createContext, useContext } from "react";
import {
  Dependencies,
  dependenciesLocator,
} from "../common/DependenciesLocator";

const DependenciesContext = createContext<Dependencies | null>(null);

export const DependenciesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <DependenciesContext.Provider value={dependenciesLocator}>
      {children}
    </DependenciesContext.Provider>
  );
};

export const useDependencies = (): Dependencies => {
  const context = useContext(DependenciesContext);
  if (!context) {
    throw new Error("useDependencies must be used within DependenciesProvider");
  }
  return context;
};
