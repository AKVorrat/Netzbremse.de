import { ParentComponent } from "solid-js";

export const FaqItem: ParentComponent<{ title: string }> = (props) => {
  return (
    <details class="collapse collapse-arrow bg-primary">
      <summary class="collapse-title font-semibold font-title text-primary-content text-xl">{props.title}</summary>
      <div class="collapse-content prose !prose-invert text-primary-content">
        {props.children}
      </div>
    </details>
  )
}
