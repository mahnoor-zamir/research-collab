import { IconCubePlus } from "@tabler/icons-react";
import { IProject } from "../../interfaces/IProject";
import { Divider, Skeleton } from "@mantine/core";
import { ProjectListItem } from "./ProjectListItem";
import { FC } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export const UserProjects: FC<{
	isLoading: boolean;
	projects: IProject[];
	openProject: (project: string) => void;
	removeFavouriteProject: (project: string) => void;
	createProject: () => void;
	tab: string;
}> = ({
	isLoading,
	projects,
	openProject,
	removeFavouriteProject,
	createProject,
	tab,
}) => {
	const [parent] = useAutoAnimate();

	if (isLoading) {
		return (
			<>
				<Skeleton height={10} width="100%" radius="sm" mb={10} mt={20} />
				<Skeleton height={20} width="100%" radius="sm" mb={3} />
				<Skeleton height={20} width="100%" radius="sm" mb={3} />
				<Skeleton height={20} width="100%" radius="sm" mb={3} />
				<Skeleton height={20} width="100%" radius="sm" mb={3} />
			</>
		);
	}

	return (
		<div className="flex">
			{projects?.length > 0 && (
				<section className="grow" ref={parent}>
					<Divider className="!border-coolGrey-1 dark:!border-borderDark !mb-2 " />
					<div className="flex gap-1 flex-col grow overflow-y-auto h-[calc(100dvh-100px)]">
						{projects?.map((project: IProject, index: number) => {
							return (
								<ProjectListItem
									key={project.uid}
									onClick={() => openProject(`project/${project.uid}/overview`)}
									name={project.title || "Untitled Project"}
									projectId={project.uid}
									projectFolders={project.folders}
									type={project.type}
									chapters={project.chapters}
								/>
							);
						})}
					</div>
				</section>
			)}

			{!projects ||
				(projects?.length === 0 && (
					<div className="text-blueTextLight text-center text-xs font-normal ">
						{tab === "collaborations"
							? "You have no collaborative projects yet. To create a collaboration, go to a project's settings and change the type"
							: "You have no projects. Create your first project."}
						{tab !== "collaborations" && (
							<IconCubePlus
								size={16}
								className="mx-auto cursor-pointer mt-2 "
								onClick={createProject}
							/>
						)}
					</div>
				))}
		</div>
	);
};
