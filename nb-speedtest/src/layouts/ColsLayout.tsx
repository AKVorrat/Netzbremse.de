import { ParentComponent } from "solid-js";

export const ColsLayout: ParentComponent<{ class?: string, breakpoint?: "lg" | "xl" }> = (props) => {
  const bp = props.breakpoint || 'lg'

  const gridClasses = bp === 'xl'
    ? 'xl:grid-cols-[repeat(2,minmax(0,65ch))]'
    : 'lg:grid-cols-[repeat(2,minmax(0,65ch))]'

  return <div class={`grid grid-cols-[minmax(0,65ch)] ${gridClasses} gap-x-8 lg:gap-x-12 xl:gap-x-40 justify-center gap-y-8 ${props.class || ''}`}>
    {props.children}
  </div>
}
