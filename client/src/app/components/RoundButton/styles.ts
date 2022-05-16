import { Button, ButtonProps } from "@mui/material";
import styled from "styled-components";

export const RoundButton = styled(Button)<ButtonProps>(() => ({
  borderRadius: "50px !important",
  marginLeft: ".5rem !important",
}));
