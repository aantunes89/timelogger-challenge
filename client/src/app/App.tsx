import * as React from "react";
import Projects from "./views/Projects";
import { GlobalStyle } from "./styles/global";
import { ScreenStateProvider } from "./hooks/useScreenState";

import { AppBar, Box, Toolbar, Typography } from "@mui/material";

export default function App() {
  return (
    <ScreenStateProvider>
      <GlobalStyle />

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Timelogger
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <Box sx={{ flexGrow: 1 }} padding={4}>
        <Projects />
      </Box>
    </ScreenStateProvider>
  );
}
