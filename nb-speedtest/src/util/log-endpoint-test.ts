export async function testLogEndpointReachability(): Promise<boolean> {
	try {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 5000);

		await fetch('https://aim.cloudflare.com/__log', {
			method: 'POST',
			body: JSON.stringify({ test: true }),
			signal: controller.signal,
		});

		clearTimeout(timeoutId);
		return true;
	} catch (error) {
		return false;
	}
}
