import { createSignal, createEffect, onCleanup } from 'solid-js';

export function createInterpolatedSignal(
	inputSignal: () => number,
	duration = 1000 // ms
): () => number {
	const [interpolated, setInterpolated] = createSignal(inputSignal());

	let startTime: number | null = null;
	let from = inputSignal();
	let to = inputSignal();
	let frame: number;

	const animate = (timestamp: number) => {
		if (startTime === null) startTime = timestamp;
		const elapsed = timestamp - startTime;
		const t = Math.min(elapsed / duration, 1);
		const current = from + (to - from) * t;
		setInterpolated(current);
		if (t < 1) {
			frame = requestAnimationFrame(animate);
		}
	};

	createEffect(() => {
		const newValue = inputSignal();
		from = interpolated(); // current value shown
		to = newValue;
		startTime = null;
		cancelAnimationFrame(frame); // cancel previous animation
		frame = requestAnimationFrame(animate);
	});

	onCleanup(() => cancelAnimationFrame(frame));

	return interpolated;
}
