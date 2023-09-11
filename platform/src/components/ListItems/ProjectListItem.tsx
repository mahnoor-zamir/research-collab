import {
	IconArrowRight,
	IconChevronDown,
	IconChevronRight,
	IconFileText,
	IconX,
} from "@tabler/icons-react";
import { FC, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IconRenderer } from "../IconRenderer";
import { useLocalStorage } from "@mantine/hooks";
import { IProject } from "../../interfaces/IProject";
import { FolderListItem } from "./FolderListItem";
import { useOpenFolderChapters } from "../../hooks/projects/useOpenFolderChapters";
import { ButtonWrapper } from "../buttons/ButtonWrapper";
import { useProjectChapters } from "../../hooks/chapter/useProjectChapters";
import { Chapter } from "../Chapters";
import { SmallText } from "../texts/SmallText";
import { IChapter } from "../../interfaces/IChapter";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Skeleton } from "@mantine/core";

export const ProjectListItem: FC<{
	name: string;
	projectId: string;
	projectFolders: IProject["folders"];
	onClick?: () => void;

	type: "standard" | "collaboration";
}> = ({ name, onClick, projectId, type, projectFolders }) => {
	const [parent, enableAnimations] = useAutoAnimate();
	const { project } = useParams();

	const [sidebarProjectOpen, setSidebarProjectOpen] = useLocalStorage({
		key: `sidebarProjectOpen-${projectId}`,
		defaultValue: localStorage.getItem(`sidebarProjectOpen-${project}`) || "",
	});
	const [openFolder, setOpenFolder] = useLocalStorage({
		key: `sidebarFolderOpen-${projectId}`,
		defaultValue: localStorage.getItem(`sidebarFolderOpen-${projectId}`) || "",
	});
	const { data: folderChapters } = useOpenFolderChapters(
		projectId,
		openFolder as string
	);
	const { data: chapters, isLoading } = useProjectChapters({
		projectId,
	});

	const navigate = useNavigate();

	return (
		<div
			className={`${
				sidebarProjectOpen ? "" : "mb-1"
			} transition-all ease-in-out duration-500`}
		>
			<li
				onClick={onClick}
				className={`px-1.5 py-1 transition-all ease-in-out duration-500 flex flex-col text-xs font-medium group hover:bg-coolGrey-1 bg-white rounded-normal cursor-default ${
					sidebarProjectOpen
						? "bg-coolGrey-1 text-coolGrey-7 border border-coolGrey-2"
						: "bg-transparent text-coolGrey-5 border border-border"
				}`}
			>
				<div className="gap-1 flex justify-between items-center">
					<div className="flex gap-1 items-center">
						<IconRenderer type={type} open={Boolean(sidebarProjectOpen)} />
						<span className=" whitespace-nowrap w-[12rem] text-ellipsis overflow-hidden">
							{name}
						</span>
					</div>
					<ButtonWrapper>
						{sidebarProjectOpen ? (
							<IconChevronDown
								className="text-coolGrey-4"
								size={16}
								onClick={(e) => {
									e.stopPropagation(),
										setSidebarProjectOpen(
											sidebarProjectOpen === projectId ? "" : projectId
										);
								}}
							/>
						) : (
							<IconChevronRight
								className="text-coolGrey-4"
								size={16}
								onClick={(e) => {
									e.stopPropagation(),
										setSidebarProjectOpen(
											sidebarProjectOpen === projectId ? "" : projectId
										);
								}}
							/>
						)}
					</ButtonWrapper>
				</div>
			</li>
			{isLoading ? (
				<Skeleton className="mt-1" height={20} width="100%" />
			) : (
				<>
					<div ref={parent}>
						{sidebarProjectOpen && projectFolders.length !== 0 && (
							<div className="ml-4 pl-2 py-2 border-l border-border ">
								{projectFolders?.map((folder) => {
									return (
										<FolderListItem
											folder={folder}
											folderChapters={folderChapters}
											small
											className="rounded-normal"
											openFolder={setOpenFolder}
											openedFolder={openFolder}
										/>
									);
								})}
							</div>
						)}
					</div>
					<div ref={parent}>
						{sidebarProjectOpen && chapters?.length !== 0 && (
							<div className="ml-4 py-1 border-l border-border">
								{chapters?.map((chapter: IChapter) => (
									<SmallText
										className="flex items-center justify-between py-0.5 px-0.5 ml-3 cursor-pointer rounded-normal hover:bg-coolGrey-1"
										onClick={() =>
											navigate(`project/${projectId}/chapter/${chapter.uid}`)
										}
									>
										<span className="flex gap-1 items-center">
											<IconFileText size={16} />{" "}
											{chapter.content.title || "Untitled Chapter"}
										</span>
									</SmallText>
								))}
							</div>
						)}
					</div>
				</>
			)}
		</div>
	);
};
