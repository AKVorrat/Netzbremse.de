import { Component, createMemo, For, Show } from "solid-js";
import { createRange } from "../util/arrays";
import { useTranslation } from "../i18n/context";

export const Stepper: Component<{ step: number, stepCount: number }> = (props) => {
  const { t } = useTranslation();
  const steps = createMemo(() => createRange(1, props.stepCount)
    .map(n => t.speedtest.stepN(n)))

  return (
    <ul class="steps w-full">
      <For each={steps()}>
        {(item, index) => (
          <li class="step " classList={{ "step-primary": index() <= props.step }}>
            <span class="sr-only">{item}</span>
          </li>
        )}
      </For>
    </ul >
  )
}
