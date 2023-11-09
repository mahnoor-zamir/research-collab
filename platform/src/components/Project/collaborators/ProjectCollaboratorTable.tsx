import { IconTrash } from "@tabler/icons-react";
import { ButtonWrapper } from "../../buttons/ButtonWrapper";
import { inputStyles } from "../../../styles/inputStyles";
import { Select, Text } from "@mantine/core";
import { IProject } from "../../../interfaces/IProject";
import { FC } from "react";
import { useDefaultDate, useTimeFromNow } from "../../../hooks/useTimeFromNow";
import { circle4 } from "../../../assets/icons";

export const ProjectCollaboratorTable: FC<{
	collaborators: IProject["collaborators"];
}> = ({ collaborators }) => {
	if (!collaborators || collaborators?.length === 0) {
		return (
			<div className="dark:bg-hoverDark/30 bg-coolGrey-1/60 max-w-4xl flex-grow rounded-normal h-64 p-4 px-6 items-center justify-center flex flex-col gap-4">
				<img src={circle4} alt="circle4" width={100} height={100} />
				<p className="text-sm max-w-md text-center mx-auto dark:text-coolGrey-6">
					You have no guests. Invite guests to your project to monitor and view
					the progress of your project. They will not be able to edit or modify
					your project.
				</p>
			</div>
		);
	}

	return (
		<div className="dark:bg-hoverDark/30 bg-coolGrey-1/60 max-w-4xl flex-grow rounded-normal h-64 p-6">
			<div className="w-full flex gap-3 text-coolGrey-4 dark:text-coolGrey-4 text-xs uppercase font-bold">
				<div className="w-3/12">
					<Text className="">Name</Text>
				</div>
				<div className="w-2/12">
					<Text className="">Date Added</Text>
				</div>
				<div className="w-2/12">
					<Text className="">Last Contribution</Text>
				</div>
				<div className="w-5/12" />
			</div>
			{collaborators.length > 0 ? (
				<div className="border-b border-border dark:border-borderDark">
					{collaborators.map((collaborator) => {
						return (
							<div className="w-full flex gap-3 text-coolGrey-12 dark:text-coolGrey-4 text-sm items-center py-2">
								<div className="w-3/12 flex flex-col">
									<Text className="!text-lg font-semibold">
										{collaborator.uid.name}
									</Text>
									<Text className="">{collaborator.uid.email}</Text>
								</div>
								<div className="w-2/12">
									<Text className="">
										{useDefaultDate(collaborator.dateAdded)}
									</Text>
								</div>
								<div className="w-2/12">
									<Text className="">
										{collaborator?.lastContribution
											? useTimeFromNow(collaborator?.lastContribution)
											: "Never"}
									</Text>
								</div>
								<div className="w-5/12 flex items-center">
									<Select
										data={[
											{
												label: "Admin",
												value: "admin",
											},
											{
												label: "Editor",
												value: "editor",
											},
											{
												label: "Owner",
												value: "owner",
											},
											{
												label: "Guest",
												value: "guest",
											},
										]}
										defaultValue={collaborator.role}
										onChange={(value) => {
											console.log(value);
										}}
										styles={inputStyles}
										className="ml-auto pt-2"
									/>
									<ButtonWrapper
										className="ml-2 p-2"
										onClick={() => {
											console.log("remove collaborator");
										}}
									>
										<IconTrash size={20} />
									</ButtonWrapper>
								</div>
							</div>
						);
					})}
				</div>
			) : null}
		</div>
	);
};
