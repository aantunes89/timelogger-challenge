import { Button, ButtonProps } from "@mui/material";
import styled from "styled-components";

export const RoundButton = styled(Button)<ButtonProps>(() => ({
  borderRadius: "100px !important",
  marginLeft: ".5rem !important",
}));
