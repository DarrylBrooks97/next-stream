'use client';
import { useState } from 'react';
import { cn } from '~/lib/helpers';

export default function ClientForm({ options }: { options: string[] }) {
	const [description, setDescription] = useState<string>('');
	const [isDone, setIsDone] = useState(true);
	const [clicked, setClicked] = useState<string | null>(null);

	const handleSubmit = async (ability: string) => {
		setIsDone(false);
		setDescription('');
		setClicked(ability);

		const res = await fetch('/api/description', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ ability }),
		});

		if (!res.ok) throw new Error(res.statusText);

		const stream = res.body?.getReader();
		if (!stream) throw new Error('No stream');

		while (true) {
			const { done, value } = await stream.read();

			if (done) {
				setIsDone(true);
				setClicked(null);
				break;
			}

			const text = new TextDecoder().decode(value);
			setDescription(prev => prev + text);
		}
	};

	return (
		<div className="flex flex-col my-auto h-screen overflow-clip justify-between w-full md:flex-row md:h-auto">
			<div className="flex flex-col justify-between space-y-3">
				<p className="font-bold text-2xl self-center pt-6 md:pt-0">Abilities</p>
				<div className="grid grid-col-2 gap-2 max-h-[300px] overflow-y-scroll md:w-[500px] md:min-h-[384px] md:grid-cols-4 md:gap-5 md:overflow-y-clip">
					{options.map(o => (
						<button
							key={o}
							disabled={!isDone && clicked === o}
							onClick={() => handleSubmit(o)}
							className={cn(
								'h-full w-full disabled:border-purple-400 truncate p-3 min-h-[40px] border-2 border-black hover:border-purple-400 rounded-md',
								!isDone && clicked === o && 'animate-pulse',
							)}
						>
							{o.at(0)?.toLocaleUpperCase() + o.slice(1)}
						</button>
					))}
				</div>
			</div>
			<div className="flex flex-col md:w-[500px] justify-between space-y-3">
				<p className="font-bold text-2xl self-center">Description</p>
				<div className="h-96 border-black border-2 p-3 rounded-md">
					<p className="text-lg">{description}</p>
				</div>
			</div>
		</div>
	);
}
