import type { Lang, Namespace } from "./types"

export type LoadLocaleFunction = (
  lang: Lang,
  namespace: Namespace
) => Promise<Record<string, string>>

/**
 * Загружает файл локали по умолчанию через динамический импорт.
 * Предполагается структура: /locales/{lang}/{namespace}.ts (относительно корня пакета).
 */
export const defaultLoadLocale: LoadLocaleFunction = async (
  lang,
  namespace
) => {
  try {
    const module = await import(`../locales/${lang}/${namespace}.ts`)
    return module.default as Record<string, string>
  } catch (error) {
    console.error(`Failed to load locale for ${lang}/${namespace}:`, error)
    return {} // возвращаем пустой объект, чтобы не ломать приложение
  }
}
