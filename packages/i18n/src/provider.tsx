import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react"
import type { Lang, Namespace, TranslationKey } from "./types"
import { getLang, saveLang } from "./storage"
import type { LoadLocaleFunction } from "./loadLocale"
import { defaultLoadLocale } from "./loadLocale"

export interface I18nProviderProps<NS extends Namespace> {
  namespace: NS
  children: React.ReactNode
  loadLocale?: LoadLocaleFunction
  fallbackLang?: Lang
}

interface I18nContextValue<NS extends Namespace> {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: TranslationKey<NS>) => string // теперь key типизирован
}

const I18nContext = createContext<I18nContextValue<Namespace> | null>(null)

export function I18nProvider<NS extends Namespace>({
  namespace,
  children,
  loadLocale = defaultLoadLocale,
  fallbackLang = "ru",
}: I18nProviderProps<NS>): React.ReactElement {
  const [lang, setLangState] = useState<Lang>(getLang)
  const [messages, setMessages] = useState<Record<string, string>>({})
  const [fallbackMessages, setFallbackMessages] = useState<
    Record<string, string>
  >({})
  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true
    Promise.all([
      loadLocale(lang, namespace),
      lang !== fallbackLang
        ? loadLocale(fallbackLang, namespace)
        : Promise.resolve({}),
    ])
      .then(([main, fallback]) => {
        if (!mountedRef.current) return
        setMessages(main)
        if (lang !== fallbackLang) {
          setFallbackMessages(fallback)
        }
      })
      .catch((error) => {
        console.error("Error loading locales:", error)
      })

    return () => {
      mountedRef.current = false
    }
  }, [lang, namespace, loadLocale, fallbackLang])

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "lang" && e.newValue && e.newValue !== lang) {
        setLangState(e.newValue as Lang)
      }
    }
    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [lang])

  const setLang = useCallback((newLang: Lang) => {
    saveLang(newLang)
    setLangState(newLang)
  }, [])

  const t = useCallback(
    (key: TranslationKey<NS>): string => {
      return messages[key] ?? fallbackMessages[key] ?? key
    },
    [messages, fallbackMessages]
  )

  const contextValue = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t])

  return (
    <I18nContext.Provider value={contextValue as I18nContextValue<Namespace>}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n<NS extends Namespace>(): I18nContextValue<NS> {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    throw new Error("useI18n must be used within I18nProvider")
  }
  return ctx as I18nContextValue<NS>
}
