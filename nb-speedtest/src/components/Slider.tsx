import { children, Component, createMemo, Index, JSX } from "solid-js"

export const Slider: Component<{ currentIndex?: number, children?: JSX.Element }> = (props) => {
  const c = children(() => props.children)
  const count = createMemo(() => c.toArray().length)
  return <div class="w-full overflow-hidden relative">
    <div class='inline-flex flex-row items-stretch' style={{ width: `${count() * 100}%`, transform: `translateX(-${(props.currentIndex ?? 0) * 100 / count()}%)`, transition: "transform 0.5s ease-in-out" }}>
      <Index each={c.toArray()}>
        {(child) => <div class="flex-shrink-0 flex-grow-0 flex flex-col justify-center items-center overflow-hidden" style={{ flex: `0 0 calc(100% / ${count()})` }}>
          {child()}
        </div>
        }
      </Index >
    </div >
  </div >
}
