import { de } from "./de";
import { en } from "./en";

export type Dict = typeof de;
export type Locale = "de" | "en";

export const dicts: Record<Locale, Dict> = {
	de: de,
	en: en,
};

