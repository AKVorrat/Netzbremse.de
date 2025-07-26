import type { Component } from 'solid-js';
import NBSpeedTest from './SpeedTest';
import { t } from './i18n/dict';
import { Faq } from './Faq';

const App: Component = () => {
  return (
    <>
      <div class="bg-primary min-h-[45ch] grid grid-cols-2 items-center gap-40 p-24">
        <div class='max-w-[65ch] justify-self-end'>
          <h2 class="text-4xl text-primary-content text-balance">{t.title()}</h2>
          <p class="text-primary-content mt-6! text-xl prose !prose-invert">{t.description()}</p>
          <p class="text-primary-content mt-4! text-xl prose !prose-invert">{t.disableAdblocker("#data")}</p>
        </div>
        <div class='max-w-[65ch] justify-self-stretch'>
          <NBSpeedTest></NBSpeedTest>
        </div>
      </div>
      <div class='grid grid-cols-2 gap-40 my-20 mx-20'>
        <div class='p-3 max-w-[65ch] justify-self-end'>
          <h2 class='text-4xl text-balance'>{t.faqTitle()}</h2>
        </div>
        <div class='max-w-[65ch] justify-self-start'>
          <Faq></Faq>
        </div>
      </div>
    </>

  );
};

export default App;
