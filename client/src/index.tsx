import * as React from "react";
import { createRoot } from "react-dom/client";
import Application from "./app/App";
import Modal from "react-modal";

const root = createRoot(document.getElementById("root") as Element);
root.render(<Application />);

Modal.setAppElement("#root");
