import { Grid, GridProps } from "@mui/material";
import styled from "styled-components";

export const ContentContainer = styled(Grid)<GridProps>(() => ({
  width: "100%",
  color: "var(--text-title)",
  label: {
    color: "var(--text-body)",
    marginRight: ".5rem",
  },

  p: {
    width: "100%",
    display: "flex",
  },

  ".truncate": {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "100%",
    display: "inline-block",
  },
}));
