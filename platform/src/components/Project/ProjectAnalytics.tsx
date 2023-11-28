import { FC, ReactNode } from "react";
import "chart.js/auto";
import { Skeleton } from "@mantine/core";
import { useGetProjectWordCount } from "../../hooks/analytics/useGetProjectWordCount";
import { useParams } from "react-router-dom";

type analyticsType = {
	wordCount: number;
	chapterCount: number;
	branchCount: number;
	versionCount: number;
	userCount: number;
	chapterWithMostWords: string;
};

export const ProjectAnalytics: FC<{}> = ({}) => {
	const { project } = useParams();
	const { data: chapterAnalytics, isLoading } = useGetProjectWordCount(
		project as string
	);

	return (
		<div className="col-span-3 row-span-2 rounded-lg flex flex-col items-center max-h-96 overflow-y-hidden">
			<div className="w-full">
				{isLoading ? (
					<div className="flex flex-wrap gap-2 max-h-[18rem]">
						<Skeleton height={112} width={116} />
						<Skeleton height={112} width={116} />
						<Skeleton height={112} width={116} />
						<Skeleton height={112} width={116} />
						<Skeleton height={112} width={116} />
						<Skeleton height={112} width={116} />
					</div>
				) : (
					<div className="flex gap-2 flex-wrap max-h-[18rem] overflow-y-auto dark:text-orange-500">
						<ListItem title="Words">{chapterAnalytics?.wordCount}</ListItem>
						<ListItem title="Chapters">
							{chapterAnalytics?.chapterCount}
						</ListItem>
						<ListItem title="Branches">
							{chapterAnalytics?.branchCount}
						</ListItem>
						<ListItem title="Versions">
							{chapterAnalytics?.versionCount}
						</ListItem>
						<ListItem title="Contributors">
							{chapterAnalytics?.userCount}
						</ListItem>
						<ListItem title="Largest chapter">
							{chapterAnalytics?.chapterWithMostWords || "-"}
						</ListItem>
					</div>
				)}
			</div>
		</div>
	);
};

const ListItem: FC<{ children: ReactNode; title: string }> = ({
	children,
	title,
}) => {
	return (
		<div className="flex basis-24 flex-grow flex-shrink-0 flex-col h-28 border-border dark:border-borderDark border rounded-lg p-1 items-center">
			<p className=" text-gray-500 dark:text-coolGrey-4 text-center border-b border-border dark:border-borderDark w-full h-[2.3rem] flex justify-center items-center text-xs">
				{title}
			</p>
			<p className="text-lg font-bold text-center">{children}</p>
		</div>
	);
};
