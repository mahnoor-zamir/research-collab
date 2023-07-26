import { FC, ReactNode, useState } from "react";
import { IChapterVersion } from "../../interfaces/IChapterVersion";
import { useTimeFromNow } from "../../hooks/useTimeFromNow";
import { IconDeviceFloppy, IconFileText } from "@tabler/icons";
import {
	Divider,
	Flex,
	Input,
	Skeleton,
	Text,
	TextInput,
	Tooltip,
} from "@mantine/core";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import { useSingleProject } from "../../hooks/projects/useSingleProject";
import { IconBook2, IconGitMerge } from "@tabler/icons";
import { tooltipStyles } from "../../styles/tooltipStyles";
import { ProjectWrapperHeights } from "../../styles/ProjectWrapperHeights";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
export const EditorWrapper: FC<{
	children: ReactNode;
	content: IChapterVersion;
	save: () => void;
}> = ({ children, content, save }) => {
	const { data: project, isLoading } = useSingleProject(content?.projectId);
	const [searchParams, setSearchParams] = useSearchParams();
	const location = useLocation();
	const merge = searchParams.get("merge");

	if (isLoading) {
		return (
			<div
				className={`flex flex-col pt-5 bg-secondary px-7  gap-2 rounded-normal ${ProjectWrapperHeights}`}
			>
				<div className="flex justify-between">
					<Skeleton height={20} mt={6} width={100} />
					<Skeleton height={20} mt={6} width={200} />
				</div>
				<Divider className=" border-border" />
				<div className="flex">{children}</div>
			</div>
		);
	}
	const breadcrumbs = [
		{
			label: project?.title,
			path: "/project/" + project?.uid + "/home",
			icon: <IconBook2 size={18} />,
			isLoading: isLoading,
		},
		{
			label:
				"[" +
				content?.type +
				"] " +
				(content.title || content.name || "Untitled Chapter"),
			path: location.pathname + "?branch=" + content?.uid,
			icon: <IconFileText size={18} />,
			isLoading: isLoading,
		},
	];

	if (merge === "replace") {
		breadcrumbs.push({
			label: "Replace main with " + content.name,
			path: location.pathname + "?merge=" + merge,
			icon: <IconGitMerge size={18} />,
			isLoading: isLoading,
		});
	}

	if (merge === "into") {
		breadcrumbs.push({
			label: "Merge " + content.name + " into main",
			path: location.pathname + "?merge=" + merge,
			icon: <IconGitMerge size={18} />,
			isLoading: isLoading,
		});
	}

	return (
		<div className="flex flex-col bg-secondary px-3 py-3 h-[calc(100vh-42px)] gap-2 rounded-normal">
			<div className=" flex font-medium gap-2 bg-secondary text-blueText items-center">
				<Flex>{breadcrumbs && <Breadcrumbs items={breadcrumbs} />}</Flex>
				<Text
					className="text-center my-auto font-medium text-xs  ml-auto mr-3"
					color="dimmed"
				>
					{content?.dateUpdated?.date
						? "Last updated: " + useTimeFromNow(content.dateUpdated.date + "")
						: "No updates yet"}
				</Text>

				<div className="border-l border-border group" onClick={save}>
					<Tooltip
						label="Save"
						position="left"
						withArrow
						styles={tooltipStyles}
					>
						<div className="ml-3 p-1 border rounded-normal cursor-pointer">
							<IconDeviceFloppy
								size={18}
								className="text-blueText group-hover:text-black"
							/>
						</div>
					</Tooltip>
				</div>
			</div>
			<Divider className="border-border" />
			<div className="h-[calc(100vh-120px)] overflow-y-hidden bg-secondary">
				<div className="text-editor flex justify-between align-middle">
					{children}
				</div>
			</div>
		</div>
	);
};
