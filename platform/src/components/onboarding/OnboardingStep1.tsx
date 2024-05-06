import { FC } from "react";
import { Title } from "../Title";
import { BlueButton } from "../buttons/BlueButton";
import { Text } from "@mantine/core";

export const OnboardingStep1: FC<{
	next: () => void;
}> = ({ next }) => {
	return (
		<section className="my-auto flex flex-col gap-4">
			<Title className="mb-0">Welcome to Collaborative Research Platform! </Title>
			<Text className="w-80 dark:text-coolGrey-5">
				We are excited to have you here. 
			</Text>

			<BlueButton className="mt-4 max-w-[100px]" onClick={next}>
				Let's go!
			</BlueButton>
		</section>
	);
};
