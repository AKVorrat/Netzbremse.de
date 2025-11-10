import { IconExclamationCircleFilled } from '@tabler/icons-solidjs';
import { Component, Show } from "solid-js";
import { useTranslation } from '../i18n/context';
import { createTimeSignal } from '../util/time-signal';

export const PeakHoursInfo: Component = () => {
	const { t } = useTranslation()
	const now = createTimeSignal()
	const isPeakHours = () => {
		const germanyTime = new Date(now().toLocaleString("en-US", { timeZone: "Europe/Berlin" }))
		const hours = germanyTime.getHours()
		return hours >= 18 && hours < 22
	}
	return <>
		<Show when={!isPeakHours()}>
			<div role="alert" class="alert mt-8">
				<IconExclamationCircleFilled class='text-primary w-12 h-12' />
				<p class='prose text-base'>
					{t.speedtest.peakHoursInfo()}
				</p>
			</div>
		</Show>
	</>
}
