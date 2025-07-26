import { Component } from "solid-js";
import { JSX } from "solid-js/h/jsx-runtime";
import { t } from "../i18n/dict";

export const PowerBtn: Component<{ onClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> }> = (props) => {
  return (
    <div class="p-8 bg-primary/5 rounded-full aspect-square">
      <div class="p-8 bg-primary/10 rounded-full aspect-square border border-primary/20">
        <div class="p-8 bg-primary/20 rounded-full aspect-square border border-primary/30">
          <button class="!btn !text-primary-content !border-primary !btn-xl !btn-circle !p-12 !text-5xl !bg-linear-to-b !from-primary !to-primary/50 !shadow-xl" onClick={props.onClick}>
            <svg aria-hidden="true" fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="overflow: visible; color: currentcolor;" height="1em" width="1em"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M378 108a191.41 191.41 0 0 1 70 148c0 106-86 192-192 192S64 362 64 256a192 192 0 0 1 69-148"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 64 256 256"></path></svg>
            <span class='sr-only'>{t.speedtest.startBtn()}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
