import { FC } from "react";
import {
	ProjectListItem,
	CategoryListItem,
	CommunityListItem,
} from "../ListItems";
import { useAuthContext } from "../../contexts/AuthContext";
import { IProject } from "../../interfaces/IProject";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/useToast";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { createProject, getUserProjects } from "../../api/project/projects";
import {
	IconBooks,
	IconLogout,
	IconHelp,
	IconSettings,
	IconTemplate,
	IconHome,
} from "@tabler/icons";
import { cyclops8 } from "../../assets/icons";
import { MainFrame } from "../Project";
import { useSignout } from "../../hooks/user/useSignout";
import { useUserProjects } from "../../hooks/projects/useUserProjects";
import { useFavouriteProjects } from "../../hooks/projects/useFavouriteProjects";
export const Sidebar: FC<{}> = () => {
	const navigate = useNavigate();
	const { currentUser } = useAuthContext();
	const queryClient = useQueryClient();
	const { mutate: signOut } = useSignout();

	// const { data: projects, isLoading: isProjectLoading } = useUserProjects();
	console.log(currentUser);
	const { data: projects, isLoading: isProjectLoading } =
		useFavouriteProjects();

	const openProject = (route: string) => {
		navigate(route);
	};
	const openPages = (route: string) => {
		navigate(route);
	};

	return (
		<div className="flex h-screen">
			<aside className="flex overflow-y-auto h-full w-60" aria-label="Sidebar">
				<div className="flex flex-col py-2 px-3 w-full">
					<Link to="/">
						<div className="ml-2 my-2 flex">
							<img
								src={cyclops8}
								alt="writality"
								width={25}
								height={25}
								className="inline-block"
							/>
							<div className="font-semibold px-2 text-sm">Writality</div>
						</div>
					</Link>
					<CategoryListItem name="" mt="mt-2">
						<CommunityListItem
							name="Library"
							onClick={() => openPages("library")}
						>
							<IconHome stroke={2.2} size={20} />
						</CommunityListItem>
						<CommunityListItem name="Posts" onClick={() => openPages("posts")}>
							<IconTemplate size={20} />
						</CommunityListItem>
						<CommunityListItem
							name="Stories"
							onClick={() => openPages("stories")}
						>
							<IconBooks size={20} />
						</CommunityListItem>
					</CategoryListItem>
					<CategoryListItem
						mt="mt-8 mb-3"
						name="Favourites"
						// button={true}
						// onClick={() => addProject.mutate(currentUser.uid)}
						loading={isProjectLoading}
					>
						{projects?.map((project: IProject, index: number) => {
							return (
								<ProjectListItem
									key={index}
									onClick={() => openProject(`project/${project.uid}`)}
									name={project.title || "Untitled Project"}
									projectId={project.uid}
									type={project.type}
								/>
							);
						})}
					</CategoryListItem>
					<div className="mt-auto mb-4">
						<CommunityListItem
							name="Settings"
							onClick={() => navigate("/settings")}
						>
							<IconSettings size={23} />
						</CommunityListItem>
						<CommunityListItem name="Help" onClick={() => navigate("/help")}>
							<IconHelp size={23} />
						</CommunityListItem>
						<CommunityListItem name="Logout" onClick={signOut}>
							<IconLogout size={23} />
						</CommunityListItem>
					</div>
				</div>
			</aside>
			<MainFrame>
				<Outlet />
			</MainFrame>
		</div>
	);
};
