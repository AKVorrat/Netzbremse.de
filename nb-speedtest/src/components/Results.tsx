import { Component, Index } from "solid-js"
import { SingleResult } from "./SingleResult"
import { Results } from "@cloudflare/speedtest"

export const AllResults: Component<{ results: Results[], labels: string[] }> = (props) => {
  const resultAt = (index: number) => props.results?.length > index ? props.results[index] : undefined

  return <div class="w-full max-h-[34rem] overflow-y-scroll">
    <div class='grid grid-cols-[min-content] gap-x-5 items-center justify-center'>
      <Index each={props.labels}>
        {(label, index) => <>
          <h3 class="font-title mt-1">{label()}</h3>
          <SingleResult result={resultAt(index)}></SingleResult>
        </>}
      </Index>
    </div>
  </div>
}
