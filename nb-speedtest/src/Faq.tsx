import { Component, For } from "solid-js";
import { useTranslation } from "./i18n/context";
import { FaqItem } from "./FaqItem";

export const Faq: Component = () => {
  const { t } = useTranslation();
  return (
    <div class="flex flex-col gap-4">
      <For each={t.faq()}>
        {(item) => (
          <FaqItem title={item.title}>
            {typeof item.body === "function" ? item.body() : item.body}
          </FaqItem>
        )}
      </For>
    </div>
  )
}
