import { FC, ReactNode, useEffect, useState } from "react";
import { Divider, ScrollArea, Skeleton } from "@mantine/core";
import { IconFilePlus, IconFiles } from "@tabler/icons";
import { CreateChapterButton } from "../buttons";

export const ChapterRenderer: FC<{
	children: ReactNode;
	chapterCount: number;
	isLoading: boolean;
	createNewChapter: () => void;
}> = ({ children, chapterCount, createNewChapter, isLoading }) => {
	return (
		<div className="flex-grow w-80 min-w-[20rem] mx-auto  bg-secondary border-border">
			<div className="flex gap-2 ml-2 font-medium items-center">
				<IconFiles size={18} />
				{isLoading ? (
					<Skeleton width={100} height={20} />
				) : (
					<h3 className=" flex text-xs gap-1">
						Chapters <span className=" ml-2">{chapterCount}</span>
					</h3>
				)}

				<div className="ml-auto mr-1">
					<CreateChapterButton
						createNewChapter={createNewChapter}
						text="New Chapter"
						icon={<IconFilePlus size={18} />}
					/>
				</div>
			</div>
			<Divider color="grey.0" />
			<ScrollArea
				className=""
				offsetScrollbars
				h={"calc(100vh - 146px)"}
				scrollbarSize={6}
			>
				{children}
			</ScrollArea>
		</div>
	);
};
