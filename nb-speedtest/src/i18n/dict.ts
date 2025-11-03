import { de } from "./de";
import { en } from "./en";

export type Dict = typeof de;
export type Locale = "de" | "en";

export const dicts: Record<Locale, Dict> = {
	de: de,
	en: en,
};

export function resolveLocale(langAttribute?: string): Locale {
	if (langAttribute && isValidLocale(langAttribute)) {
		return langAttribute;
	}
	const envDefault = import.meta.env.VITE_DEFAULT_LANG;
	if (envDefault && isValidLocale(envDefault)) {
		return envDefault;
	}
	return "de";
}

function isValidLocale(locale: string): locale is Locale {
	return locale in dicts;
}

