import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "@workspace/ui/globals.css"
import { App } from "./App"
import { ThemeProvider } from "@workspace/ui/providers/theme-provider"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="mycity-frontend-theme">
      <App />
    </ThemeProvider>
  </StrictMode>
)
