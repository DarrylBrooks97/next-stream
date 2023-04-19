export const runtime = 'experimental-edge';

const endpoint = 'https://pokeapi.co/api/v2/ability/';

export async function POST(request: Request) {
	const { ability } = await request.json();

	if (!ability) return new Response('No text provided', { status: 400 });

	const res = await fetch(endpoint + ability);

	if (!res.ok) return new Response('Error with pokeapi request', { status: 500 });
	if (!res.body) return new Response('No ability found', { status: 200 });

	const { effect_entries } = await res.json();

	const englishVersion = effect_entries.find((entry: any) => entry.language.name === 'en');

	const lines = englishVersion.effect;

	const encoder = new TextEncoder();

	const stream = new ReadableStream({
		async start(controller) {
			for (const line of lines) {
				for (const text of line.split(/(\s)/g)) {
					await delay(50);
					const chunk = encoder.encode(text);
					controller.enqueue(chunk);
				}
			}

			controller.close();
		},
	});

	return new Response(stream);
}

function delay(ms: number): Promise<void> {
	return new Promise<void>(resolve => setTimeout(resolve, ms));
}
