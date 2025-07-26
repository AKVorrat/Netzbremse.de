import { Component, For } from "solid-js";
import { t } from "./i18n/dict";
import { FaqItem } from "./FaqItem";

export const Faq: Component = () => {
  return (
    <div>
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
