import { createContext, useContext, createMemo, createSignal, JSX } from "solid-js";
import { de } from "./de";
import { chainedTranslator, flatten, resolveTemplate, translator } from "@solid-primitives/i18n";
import { dicts, Dict, Locale, resolveLocale } from "./dict";

const defaultDict = de;

type TranslationContextType = {
  locale: () => Locale;
  t: ReturnType<typeof chainedTranslator<Dict, string>>;
};

const TranslationContext = createContext<TranslationContextType>();

export const TranslationProvider = (props: { children: JSX.Element; locale?: string }) => {
  const locale = createMemo(() => resolveLocale(props.locale));

  const flatDict = createMemo(() => flatten(dicts[locale()]) as Dict);

  const trans = translator(flatDict, resolveTemplate);

  const t = chainedTranslator(defaultDict, trans);

  const contextValue: TranslationContextType = {
    locale,
    t,
  };

  return (
    <TranslationContext.Provider value={contextValue}>
      {props.children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};
