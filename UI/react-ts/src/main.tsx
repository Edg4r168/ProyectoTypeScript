import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { StudentProvider } from "./students/contex/StudentProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StudentProvider>
      <App />
    </StudentProvider>
  </StrictMode>
);
