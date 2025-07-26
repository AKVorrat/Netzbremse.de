export function range(start, end, step = 1): number[] {
	const result = [];
	for (let i = start; i <= end; i += step) {
		result.push(i);
	}
	return result;
}
