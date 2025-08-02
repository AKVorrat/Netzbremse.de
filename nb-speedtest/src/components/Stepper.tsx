import { Component, createMemo, For, Show } from "solid-js";
import { createRange } from "../util/arrays";
import { t } from "../i18n/dict";

export const Stepper: Component<{ step: number, stepCount: number }> = (props) => {
  const steps = createMemo(() => createRange(1, props.stepCount)
    .map(n => t.speedtest.stepN(n)))

  return (
    <ul class="steps">
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
