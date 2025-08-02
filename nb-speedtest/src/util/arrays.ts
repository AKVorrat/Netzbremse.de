export function createRange(start, end, step = 1): number[] {
	const result = [];
	for (let i = start; i <= end; i += step) {
		result.push(i);
	}
	return result;
}

export function createArray<T>(length: number, generator: () => T): T[] {
	const result: T[] = new Array(length)
	for (let i = 0; i < length; i++) {
		result[i] = generator()
	}
	return result;
}