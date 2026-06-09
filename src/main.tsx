import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "next-themes";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <ThemeProvider
      attribute="class"
      themes={["spidey", "hay"]}
      defaultTheme="spidey"
      enableSystem={false}
      value={{ spidey: "dark spidey", hay: "dark hay" }}
    >
      <App />
    </ThemeProvider>
  </HelmetProvider>
);
