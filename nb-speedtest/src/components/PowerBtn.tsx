import { Component } from "solid-js";
import { JSX } from "solid-js/h/jsx-runtime";
import { useTranslation } from "../i18n/context";
import { TbPower } from "solid-icons/tb";

export const PowerBtn: Component<{ onClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> }> = (props) => {
  const { t } = useTranslation();
  return (
    <div class="p-8 bg-primary/5 rounded-full aspect-square">
      <div class="p-8 bg-primary/10 rounded-full aspect-square border border-primary/20">
        <div class="p-8 bg-primary/20 rounded-full aspect-square border border-primary/30">
          <button class="!btn !text-primary-content !border-primary !btn-xl !btn-circle !p-12 !text-5xl !bg-linear-to-b !from-primary !to-primary/50 !shadow-xl" onClick={props.onClick}>
            <TbPower />
            <span class='sr-only'>{t.speedtest.startBtn()}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
