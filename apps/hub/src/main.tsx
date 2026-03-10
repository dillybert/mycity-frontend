import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "@workspace/ui/globals.css"
import { App } from "./App"
import { ThemeProvider } from "@workspace/ui/providers/theme-provider"
import { I18nProvider } from "@workspace/i18n"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="mycity-frontend-theme">
      <I18nProvider namespace="hub">
        <App />
      </I18nProvider>
    </ThemeProvider>
  </StrictMode>
)
