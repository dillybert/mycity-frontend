import { useState } from "react"
import { Button } from "@workspace/ui/components/button"
import { useI18n } from "@workspace/i18n/provider"

export function App() {
  const [count, setCount] = useState(0)
  const { t, setLang } = useI18n<"hub">()

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more {t("settings")}
      </p>
      <Button className="transition-all">{t("settings")}</Button>
      <Button onClick={() => setLang("kz")}>Change lang to Kazakh</Button>
      <Button onClick={() => setLang("ru")}>Change lang to Russian</Button>
    </>
  )
}
