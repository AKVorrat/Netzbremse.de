import { Component } from "solid-js";
import { TbExclamationCircle } from "solid-icons/tb";
import { t } from "../../i18n/dict";
import { TestResult } from "../../types/test-result";

export const ErrorAccordion: Component<{
  testResult: TestResult & { success: false };
}> = (props) => {
  return (
    <div class="collapse collapse-arrow bg-base-200">
      <input
        type="checkbox"
        class="peer"
      />
      <div class="collapse-title text-lg font-medium peer-checked:bg-base-300 peer-checked:text-base-content">
        <div class="flex flex-row flex-wrap items-center justify-between gap-2">
          <span class="text-base lg:text-lg">{props.testResult.label}</span>
          <div class="text-xs lg:text-sm opacity-70 flex items-center gap-2">
            <TbExclamationCircle class="w-4 h-4 text-error" />
            <span class="text-error">{t.speedtest.error()}</span>
          </div>
        </div>
      </div>
      <div class="collapse-content peer-checked:bg-base-300">
        <div class="w-full max-w-full overflow-hidden">
          <h4 class="font-semibold mb-3">{t.speedtest.error()}</h4>
          <div class="bg-error/10 border border-error/20 rounded-lg p-3">
            <p class="text-sm text-error-content">
              {props.testResult.error.message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};