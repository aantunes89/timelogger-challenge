import * as React from "react";
import Projects from "./views/Projects";
import { GlobalStyle } from "./styles/global";
import { ScreenStateProvider } from "./hooks/useScreenState";
import ComposedProvider from "./hooks/index";

import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { ProjectsProvider } from "./hooks/useProjects";

export default function App() {
  return (
    <ComposedProvider components={[ScreenStateProvider, ProjectsProvider]}>
      <GlobalStyle />

      <Box sx={{ flexGrow: 1 }} data-testid="header-wrapper">
        <AppBar position="static" data-testid="app-bar">
          <Toolbar data-testid="tool-bar">
            <Typography
              data-testid="typography-header"
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, margin: "0 6rem" }}
            >
              Timelogger
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <Box sx={{ flexGrow: 1, margin: "0 6rem" }} padding={4} data-testid="body-wrapper">
        <Projects />
      </Box>
    </ComposedProvider>
  );
}
