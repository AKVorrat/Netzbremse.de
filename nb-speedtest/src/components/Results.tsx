import { Component, Index } from "solid-js"
import { SingleResult } from "./SingleResult"
import { TestResult } from "../types/test-result"

export const AllResults: Component<{ results: TestResult[], totalCount: number }> = (props) => {
  // Render the total count of results elements right away to avoid layout shift
  const runs = (): (TestResult | undefined)[] => {
    const runs = [...props.results]
    while (runs.length < props.totalCount) {
      runs.push(undefined)
    }
    return runs
  }
  return <div class="w-full max-h-[34rem] overflow-y-scroll">
    <div class='grid grid-cols-[min-content] gap-x-5 items-center justify-center'>
      <Index each={runs()}>
        {(result) => <>
          <h3 class="font-title mt-1">{result()?.label || "-"}</h3>
          <SingleResult result={result()}></SingleResult>
        </>}
      </Index>
    </div>
  </div>
}
