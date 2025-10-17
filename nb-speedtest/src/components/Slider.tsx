import { children, Component, createEffect, createMemo, createSignal, Index, JSX, on } from "solid-js"

export const Slider: Component<{ currentIndex?: number, children?: JSX.Element }> = (props) => {
  const c = children(() => props.children)
  const count = createMemo(() => c.toArray().length)
  const [skipAnimation, setSkipAnimation] = createSignal(false)

  createEffect(on(() => props.currentIndex, (current, previous) => {
    const distance = Math.abs((current ?? 0) - previous)
    setSkipAnimation(distance > 1)
  }, { defer: true }))

  return <div class="w-full overflow-hidden relative">
    <div class='inline-flex flex-row items-stretch'
      style={{
        width: `${count() * 100}%`,
        transform: `translateX(-${(props.currentIndex ?? 0) * 100 / count()}%)`,
        transition: skipAnimation() ? "none" : "transform 0.5s ease-in-out",
      }}>
      <Index each={c.toArray()}>
        {(child, index) =>
          <div inert={index !== props.currentIndex}
            class="flex-shrink-0 flex-grow-0 flex flex-col justify-center items-center overflow-x-hidden"
            style={{
              flex: `0 0 calc(100% / ${count()})`
            }}>
            {child()}
          </div>
        }
      </Index >
    </div >
  </div >
}
