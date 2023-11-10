import { FC, ReactNode } from "react";
import { Divider, Flex, Skeleton } from "@mantine/core";
import { IconAtom, IconBook, Icon3dCubeSphere } from "@tabler/icons-react";

import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import { Text } from "@mantine/core";
import { IProject } from "../../interfaces/IProject";
import { useTimeFromNow } from "../../hooks/useTimeFromNow";
import { ProjectWrapperHeights } from "../../styles/ProjectWrapperHeights";
import { BannerImage } from "../BannerImage";

export const ProjectWrapper: FC<{
	children: ReactNode;
	className: string;
	project: IProject;
	isLoading: boolean;
	tab: string;
}> = ({ children, project, isLoading, className, tab }) => {
	if (isLoading) {
		return (
			<div
				className={`flex flex-col pt-5 bg-base dark:bg-baseDark px-7  gap-2 rounded-normal h-[calc(100vh-20px)] w-full`}
			>
				<div className="flex justify-between">
					<Skeleton height={20} mt={6} width={100} />
					<Skeleton height={20} mt={6} width={200} />
				</div>
				<Divider className="!border-coolGrey-1 dark:!border-borderDark" />
				<div className="flex">{children}</div>
			</div>
		);
	}

	const breadcrumbs = [
		{
			label: project?.title,
			path: "/projects",
			icon: project ? (
				project.type === "standard" ? (
					<IconBook size={18} />
				) : (
					<Icon3dCubeSphere size={18} />
				)
			) : (
				<Skeleton height={18} width={18} />
			),
		},
	];

	return (
		<div
			className={`flex flex-col bg-base dark:bg-baseDark gap-2 rounded-normal ${className}`}
		>
			<BannerImage
				image={"https://images.unsplash.com/photo-1525307932909-fd14b501d8d3"}
				alt="Banner by Jez Timms on Unsplash"
				height={`h-48 ${
					tab === "overview" ? "" : "!h-0"
				} transition-all ease-in-out duration-400`}
			/>
			<div className="flex">{children}</div>
		</div>
	);
};
