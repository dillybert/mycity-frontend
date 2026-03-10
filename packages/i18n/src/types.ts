import ruHub from "../locales/ru/hub"
import ruRide from "../locales/ru/ride"

export const LANGS = ["ru", "kz"] as const
export type Lang = (typeof LANGS)[number]

export type Namespace = "hub" | "ride"

export type NamespaceMessages = {
  hub: typeof ruHub
  ride: typeof ruRide
}

// Гарантируем, что ключи — строки
export type TranslationKey<NS extends Namespace> = Extract<
  keyof NamespaceMessages[NS],
  string
>
