import { createMemo, createSignal } from "solid-js";
import { de } from "./de";
import * as i18n from "@solid-primitives/i18n";

const defaultDict = de

export type Dict = typeof defaultDict

export type Locale = "de" | "en"

const dicts = {
	de: de,
}

export const [locale, setLocale] = createSignal<Locale>("de")

export const dict = createMemo(() => i18n.flatten(dicts[locale()] as Dict))

const translator = i18n.translator(dict, i18n.resolveTemplate)

export const t = i18n.chainedTranslator(defaultDict, translator)

