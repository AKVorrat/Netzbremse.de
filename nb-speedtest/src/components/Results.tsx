import { Component, Index } from "solid-js"
import { SingleResult } from "./SingleResult"
import { TestResult } from "../types/test-result"

export const AllResults: Component<{ results: TestResult[] }> = (props) => {
  return <div class="w-full max-h-[34rem] overflow-y-scroll">
    <div class='grid grid-cols-[min-content] gap-x-5 items-center justify-center'>
      <Index each={props.results}>
        {(result) => <>
          <h3 class="font-title mt-1">{result().label}</h3>
          <SingleResult result={result()}></SingleResult>
        </>}
      </Index>
    </div>
  </div>
}
