import { createSignal, onCleanup } from "solid-js";

export function createAnimatedSignal(initial?: number | null, duration = 1000) {
	const [value, setValue] = createSignal(initial);
	let target = initial;
	let start = initial;
	let startTime: number | null = null;
	let raf: number | null = null;
	let isPaused = false;

	function step(timestamp: number) {
		if (startTime === null) startTime = timestamp;
		const elapsed = timestamp - startTime;

		const progress = Math.min(elapsed / duration, 1);
		const interpolated = start + (target - start) * progress;
		setValue(interpolated);

		if (progress < 1) {
			raf = requestAnimationFrame(step);
		} else {
			setValue(target);
			raf = null;
		}
	}

	function animateTo(newValue?: number | null) {
		if (start === null || start === undefined) {
			setValue(newValue)
			start = newValue
			return
		}
		if (newValue === value()) {
			return
		}

		if (raf) {
			cancelAnimationFrame(raf);
		}

		start = value();   // current displayed value
		target = newValue; // new target
		startTime = null;
		isPaused = false;
		raf = requestAnimationFrame(step);
	}

	function setPaused(paused: boolean = true) {
		if (paused && !isPaused) {
			isPaused = true;
			if (raf) {
				cancelAnimationFrame(raf);
				raf = null;
			}
		} else if (!paused && isPaused) {
			isPaused = false;
			if (target != null && start != null) {
				startTime = null;
				raf = requestAnimationFrame(step);
			}
		}
	}

	onCleanup(() => {
		if (raf) {
			cancelAnimationFrame(raf);
		}
	});

	return [value, animateTo, setPaused] as const;
}
