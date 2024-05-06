import { FC } from "react";
import { IProject } from "../../interfaces/IProject";
import { IconLayoutGrid, IconList } from "@tabler/icons-react";
import { Skeleton } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { EmptyItem } from "../Chapters/EmptyItem";
import { useLocalStorage } from "@mantine/hooks";
import { GridProjects } from "../Project/GridProjects";
import { ListProjects } from "../Project/ListProjects";

export const ProfileProjects: FC<{
  projects: IProject[];
  createProject: () => void;
  isLoading: boolean;
}> = ({ projects, createProject, isLoading }) => {
  const navigate = useNavigate();

  const [layout, setLayout] = useLocalStorage<"grid" | "list">({
    key: "project-layout",
    defaultValue: "grid",
  });

  if (isLoading) {
    return (
      <div>
        <div className="mb-2 text-xs font-medium">Your Research Projects</div>
        <div className="flex gap-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} height={150} width={250} />
          ))}
        </div>
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="flex flex-col items-left justify-left h-full">
        <EmptyItem
          title="Projects"
          p1="You do not currently have any ongoing research. You may wish to work with other people or start your own research project."
          p2="Start your first research project to get started"
          createNewChapter={createProject}
        />
      </div>
    );
  }

  return (
    <div className="mt-8"> {/* Adjust the top margin as needed */}
      <div className="text-md mb-2 flex items-center justify-between font-medium">
        <div className="mr-auto">Your Research Projects</div>
        <div className="flex gap-1">
          <button
            className={`rounded-lg border p-2 ${
              layout === "grid"
                ? "cursor-default border-transparent bg-coolGrey-1 dark:bg-hoverDark"
                : "cursor-pointer border-coolGrey-2 transition-all duration-300 ease-in-out hover:border-coolGrey-3 hover:shadow dark:border-borderDark dark:hover:bg-hoverDark"
            }`}
            onClick={() => setLayout("grid")}
          >
            <IconLayoutGrid size={16} />
          </button>
          <button
            className={`rounded-lg border p-2 ${
              layout === "list"
                ? "cursor-default border-transparent bg-coolGrey-1 dark:bg-hoverDark"
                : "cursor-pointer border-coolGrey-2 transition-all duration-300 ease-in-out hover:border-coolGrey-3 hover:shadow dark:border-borderDark dark:hover:bg-hoverDark"
            }`}
            onClick={() => setLayout("list")}
          >
            <IconList size={16} />
          </button>
        </div>
      </div>

      {layout === "grid" ? (
        <div className="flex flex-row flex-wrap gap-3">
          {projects.map((project, index) => (
            <GridProjects
              key={index}
              project={project}
              onClick={() => navigate(`/project/${project.uid}/overview`)}
            />
          ))}
        </div>
      ) : (
        <ListProjects projects={projects} />
      )}
    </div>
  );
};
