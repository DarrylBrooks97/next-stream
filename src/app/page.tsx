import Stream from './components/client/Stream';

export default async function Home() {
	const res = await fetch('https://pokeapi.co/api/v2/ability', { cache: 'force-cache' });

	if (!res.ok) throw new Error(res.statusText);

	const data = await res.json();

	if (!data) throw new Error('No data');

	const abilities = data.results.map((a: any) => a.name);

	return (
		<div className="w-screen h-screen md:flex md:justify-center md:items-center">
			<div className="w-full px-3 md:w-3/4">
				<Stream options={abilities} />
			</div>
		</div>
	);
}
