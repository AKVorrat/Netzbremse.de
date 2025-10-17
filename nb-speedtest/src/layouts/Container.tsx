import { ParentComponent } from "solid-js";

export const Container: ParentComponent<{ class?: string }> = (props) => {
  return <div class={`my-10 lg:my-20 mx-6 lg:mx-20 ${props.class || ''}`}>
    {props.children}
  </div>
}
