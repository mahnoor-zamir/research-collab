import { Container } from "@mantine/core";

type Props = {};

export function HomeBanner({}: Props) {
	return (
		<Container
			size="xl"
			className="w-full grid place-items-center m-auto h-72 "
		>
			<div className="group w-full h-3/4 bg-stone-400 rounded-lg shadow-lg flex flex-col justify-center items-center  hover:bg-base transition-all duration-500 ease-in-out hover:border-baseBorderDark hover:border border-transparent">
				<h1 className="text-4xl font-bold text-gray-800 group-hover:text-stone-300 group-hover:underline-offset-2 group-hover:underline">
					Welcome to Writality
				</h1>
				<h2 className="text-gray-600 text-center max-w-md group-hover:text-slate-300">
					The world's first Collaborative Creative Writing Platform.
				</h2>
			</div>
		</Container>
	);
}

// hover:bg-gradient-to-r  hover:from-purple-500 hover:to-red-500 transition-all ease-in-out duration-500
