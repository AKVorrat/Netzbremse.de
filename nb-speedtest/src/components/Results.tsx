import { Component, Index } from "solid-js"
import { SingleResult } from "./SingleResult"
import { Results } from "@cloudflare/speedtest"

export const AllResults: Component<{ results: Results[], labels: string[] }> = (props) => {
  const resultAt = (index: number) => props.results?.length > index ? props.results[index] : undefined

  return <div>
    <div class='flex flex-col items-center justify-center'>
      <Index each={props.labels}>
        {(label, index) => <>
          <h3 class="font-title">{label()}</h3>
          <SingleResult result={resultAt(index)}></SingleResult>
        </>}
      </Index>
    </div>
  </div>
}
