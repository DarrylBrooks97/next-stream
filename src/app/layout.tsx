import './globals.css';

export const metadata = {
	title: 'Streaming abilities',
	description: 'Testing out api streams',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
