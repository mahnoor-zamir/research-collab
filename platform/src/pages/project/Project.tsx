import { ProjectDescription } from "../../components/Project";
import { v4 as uuidv4 } from "uuid";
import {
	IconGlobe,
	IconHome,
	IconMessage,
	IconNews,
	IconSettings,
} from "@tabler/icons";
import {
	NoChapters,
	Chapter,
	ChapterWrapper,
	ChapterRenderer,
} from "../../components/Chapters";
import { useAuthContext } from "../../contexts/AuthContext";
import { IChapter } from "../../interfaces/IChapter";
import { CharacterWrapper } from "../../components/Characters/CharacterWrapper";
import { Loading } from "../../components/Loading";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
	getProjectChapters,
	createChapter,
	deleteSingleChapter,
} from "../../api/project/chapters";
import { DeleteModal } from "../../components/Modals";
import {
	getSingleProject,
	deleteSingleProject,
	updateProjectDescription,
	updateProjectTitle,
} from "../../api/project/projects";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { chapterCreator } from "../../hooks";
import { Divider, Tabs, Tooltip } from "@mantine/core";
import { useEditor } from "@tiptap/react";
import { extensions } from "../../components/Editor/utils/editorExtensions";
import { useTabContext } from "../../contexts/TabContext";
import { ProjectSettings } from "../../components/Project/ProjectSettings";
import { CreateChapterButton } from "../../components/buttons";
import { IconTrash } from "@tabler/icons";
import { IProject } from "../../interfaces/IProject";
import { useSingleProject } from "../../hooks/projects/useSingleProject";
import { ChatWrapper } from "../../components/Project/chatrooms/ChatWrapper";
import { tabStyles } from "../../styles/tabStyles";
export function Project() {
	const queryClient = useQueryClient();
	const { currentUser } = useAuthContext();
	const { project, projectTab } = useParams();
	const [openModal, setOpenModal] = useState(false);
	const [openDeleteProject, setOpenDeleteProject] = useState(false);
	const [chapterId, setChapterId] = useState("");
	const navigate = useNavigate();

	const { data: currentProject, isLoading: projectLoading } = useSingleProject(
		project as string
	);

	const { data: chapters, isLoading } = useQuery(
		["chapters", project],
		() => getProjectChapters(currentUser.uid, project as string),
		{ enabled: !!currentProject }
	);
	const addChapter = useMutation(createChapter, {
		onSuccess: () => {
			queryClient.invalidateQueries("chapters");
		},
	});
	const deleteChapter = useMutation(
		() => deleteSingleChapter(currentUser.uid, project as string, chapterId),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("chapters");
				setOpenModal(false);
			},
		}
	);
	const updateDescription = useMutation(
		(description: string) =>
			updateProjectDescription(currentUser.uid, project as string, description),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["project", project]);
			},
		}
	);
	const openChapterModal = (chapterId: string) => {
		setChapterId(chapterId);
		setOpenModal(true);
	};
	const createNewChapter = () => {
		addChapter.mutate(chapterCreator(currentUser.uid, project as string));
	};

	const openChapter = (projectId: string, chapterId: string) => {
		navigate(`/project/${projectId}/chapter/${chapterId}`);
	};

	const editor = useEditor({
		extensions,
	});

	if (isLoading || !editor || !currentProject) {
		return <Loading isLoading={true} />;
	}
	return (
		<>
			<DeleteModal
				opened={openModal}
				setOpened={setOpenModal}
				deleteBranch={deleteChapter.mutate}
				type="chapter"
			/>
			<ChapterWrapper project={currentProject}>
				<Tabs
					className="w-full border-none important:border-none h-[calc(100vh-7.0rem)]"
					value={projectTab}
					onTabChange={(tab) => navigate(`/project/${project}/${tab}`)}
					defaultValue="home"
					radius={"md"}
					orientation="vertical"
					styles={tabStyles}
					keepMounted={false}
				>
					<Tabs.List>
						<Tooltip label="Home" position="right" withArrow>
							<Tabs.Tab value="home">
								<IconHome size={18} />
							</Tabs.Tab>
						</Tooltip>
						<Tooltip label="World" position="right" withArrow>
							<Tabs.Tab value="world-info" disabled>
								<IconGlobe size={18} />
							</Tabs.Tab>
						</Tooltip>
						<Tooltip label="Publish" position="right" withArrow>
							<Tabs.Tab value="publish" disabled>
								<IconNews size={18} />
							</Tabs.Tab>
						</Tooltip>
						{currentProject?.type === "collaboration" && (
							<>
								<Divider my="sm" />
								<Tooltip label="Chat" position="right" withArrow>
									<Tabs.Tab value="chat">
										<IconMessage size={18} />
									</Tabs.Tab>
								</Tooltip>
							</>
						)}
						<Divider my="sm" />
						<Tooltip label="Settings" position="right" withArrow>
							<Tabs.Tab value="settings">
								<IconSettings size={18} />
							</Tabs.Tab>
						</Tooltip>
					</Tabs.List>

					<Tabs.Panel value="home">
						<div className="flex flex-wrap">
							<ChapterRenderer
								chapterCount={chapters?.length}
								createNewChapter={createNewChapter}
							>
								{chapters?.length == 0 ? (
									<NoChapters createNewChapter={createNewChapter} />
								) : (
									<>
										{chapters?.map((chapter: IChapter, index: number) => (
											<Chapter
												openChapter={() =>
													openChapter(chapter.projectId, chapter.uid)
												}
												key={index}
												chapter={chapter}
												openChapterModal={() => openChapterModal(chapter.uid)}
												disabled={false}
											/>
										))}{" "}
									</>
								)}
							</ChapterRenderer>
							{editor && currentProject && (
								<ProjectDescription
									project={currentProject}
									user={currentUser.uid}
									editor={editor}
									updateDescription={updateDescription.mutate}
								/>
							)}
							{/* <CharacterWrapper> - Protagonist </CharacterWrapper> */}
						</div>
					</Tabs.Panel>

					<Tabs.Panel value="world-info">
						<CharacterWrapper> - Protagonist </CharacterWrapper>
					</Tabs.Panel>

					<Tabs.Panel value="settings">
						<ProjectSettings project={currentProject} />
					</Tabs.Panel>
					<Tabs.Panel value="chat">
						<ChatWrapper />
					</Tabs.Panel>
				</Tabs>
			</ChapterWrapper>
		</>
	);
}
