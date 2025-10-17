import { ParentComponent } from "solid-js";

export const FaqItem: ParentComponent<{ title: string }> = (props) => {
  return (
    <div tabindex="0" class="collapse collapse-arrow bg-primary">
      <input type="checkbox" aria-hidden="true" />
      <div class="collapse-title font-semibold font-title text-primary-content text-xl">{props.title}</div>
      <div class="collapse-content prose !prose-invert text-primary-content">
        {props.children}
      </div>
    </div>
  )
}
