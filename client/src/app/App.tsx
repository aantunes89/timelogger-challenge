import * as React from "react";
import Projects from "./views/Projects";
import "./tailwind.generated.css";
import { GlobalStyle } from "./styles/global";
import { ProjectsProvider } from "./hooks/useProjects";
import { ScreenStateProvider } from "./hooks/useScreenState";

export default function App() {
  return (
    <ScreenStateProvider>
      <GlobalStyle />
      <header className="bg-gray-900 text-white flex items-center h-12 w-full">
        <div className="container mx-auto">
          <a className="navbar-brand" href="/">
            Timelogger
          </a>
        </div>
      </header>

      <main>
        <div className="container mx-auto">
          <Projects />
        </div>
      </main>
    </ScreenStateProvider>
  );
}
