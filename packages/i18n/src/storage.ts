import { type Lang, LANGS } from "./types"

const STORAGE_KEY = "lang"
const DEFAULT_LANG: Lang = "ru"

function isValidLang(lang: unknown): lang is Lang {
  return typeof lang === "string" && LANGS.includes(lang as Lang)
}

/**
 * Возвращает текущий язык из URL-параметра или localStorage.
 * Если в URL указан валидный язык, он сохраняется в localStorage.
 */
export function getLang(): Lang {
  const params = new URLSearchParams(window.location.search)
  const urlLang = params.get("lang")

  if (isValidLang(urlLang)) {
    // Сохраняем только если значение отличается от текущего в localStorage
    const stored = localStorage.getItem(STORAGE_KEY)
    if (urlLang !== stored) {
      localStorage.setItem(STORAGE_KEY, urlLang)
    }
    return urlLang
  }

  const storedLang = localStorage.getItem(STORAGE_KEY)
  if (isValidLang(storedLang)) {
    return storedLang
  }

  return DEFAULT_LANG
}

/**
 * Устанавливает язык: обновляет URL-параметр и сохраняет в localStorage.
 */
export function saveLang(lang: Lang): void {
  const params = new URLSearchParams(window.location.search)
  params.set("lang", lang)
  const newUrl = `${window.location.pathname}?${params.toString()}`
  window.history.replaceState({}, "", newUrl)

  // Проверка на изменение, чтобы не писать лишний раз
  const stored = localStorage.getItem(STORAGE_KEY)
  if (lang !== stored) {
    localStorage.setItem(STORAGE_KEY, lang)
  }
}
