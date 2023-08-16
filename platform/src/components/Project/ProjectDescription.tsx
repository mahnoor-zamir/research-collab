import { FC, useEffect } from "react";
import { IProject } from "../../interfaces/IProject";
import { BaseEditor } from "../Editor";
import { Button, Skeleton } from "@mantine/core";
export const ProjectDescription: FC<{
	project: IProject;
	editor: any;
	updateDescription: (description: string) => void;
	user: string;
}> = ({ project, editor, updateDescription }) => {
	return (
		<div
			className="flex flex-col flex-grow px-3 mx-auto w-80 bg-base"
			onMouseLeave={() => {
				editor.getHTML() !== project?.description &&
					updateDescription(editor.getHTML());
			}}
		>
			<div className="">
				<h3 className="text-center text-coolGrey-7 font-medium text-xs">
					Project Description
				</h3>
			</div>

			{!editor ? (
				<Skeleton
					className="flex flex-col flex-grow mx-auto my-5 w-full "
					height={200}
					radius="lg"
				/>
			) : (
				<BaseEditor
					editor={editor}
					height="calc(100vh - 192px)"
					content={project?.description}
				/>
			)}
		</div>
	);
};
