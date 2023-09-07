import { FC } from "react";
import { IProject } from "../../interfaces/IProject";
import { FolderListItem } from "../ListItems/FolderListItem";
import { ButtonWrapper } from "../buttons/ButtonWrapper";
import { IconDotsVertical } from "@tabler/icons-react";
import { IChapter } from "../../interfaces/IChapter";
import { Chapter } from "../Chapters/Chapter";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { SortableItem } from "../DragAndDrop/SortableItems";
import { Droppable } from "../DragAndDrop/Droppable";
import { DragOverlay } from "@dnd-kit/core";
import { Draggable } from "../DragAndDrop/Draggable";

export const ProjectChapters: FC<{
	project: IProject;
	chapters: IChapter[];
	openChapter: (projectId: string, chapterId: string) => void;
	openChapterModal: (chapterId: string) => void;
	openFolder: (folderId: string) => void;
	folderChapters: IChapter[];
	openedFolder: string;
}> = ({
	project,
	chapters,
	openChapter,
	openChapterModal,
	openFolder,
	folderChapters,
	openedFolder,
}) => {
	const [parent] = useAutoAnimate();
	return (
		<div ref={parent} className="p-2 gap-1.5 flex flex-col">
			{project?.folders?.map((folder: any, index: number) => (
				<Droppable id={folder.uid} type="folder">
					<FolderListItem
						openFolder={openFolder}
						folder={folder}
						folderChapters={folderChapters}
						key={index}
						withNumber
						openedFolder={openedFolder}
						className="px-2.5 py-1.5 border border-border flex items-end justify-between rounded-normal "
						icon={
							<ButtonWrapper>
								<IconDotsVertical size={14} className="cursor-pointer" />
							</ButtonWrapper>
						}
					/>
				</Droppable>
			))}

			{chapters?.map((chapter: IChapter, index: number) => (
				<Draggable id={chapter.uid}>
					<Chapter
						openChapter={() => openChapter(chapter.projectId, chapter.uid)}
						key={index}
						chapter={chapter}
						openChapterModal={() => openChapterModal(chapter.uid)}
						disabled={false}
					/>
				</Draggable>
			))}
		</div>
	);
};
