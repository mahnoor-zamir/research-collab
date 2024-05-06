import { Tabs, Text } from "@mantine/core";
import { useUserProfileProjects } from "../hooks/projects/useUserProfileProjects";
import { useCreateProject } from "../hooks/projects/useCreateProject";
import { useAuthContext } from "../contexts/AuthContext";
import { Title } from "../components/Title";
import { initials, initialsColor } from "../utils/userIcons";
import { useNavigate } from "react-router-dom";
import { ProfileProjects } from "../components/Profile/ProfileProjects";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { ProfileFriends } from "../components/Profile/ProfileFriends";
import { DailyCount } from "../components/Profile/DailyCount";
import { Trophies } from "../components/Profile/Trophies";
import { RecentNotifications } from "../components/Profile/RecentNotifications";

export const ProfilePage = () => {
  const { currentUser } = useAuthContext();
  const { data: projects, isLoading } = useUserProfileProjects();

  const [parent] = useAutoAnimate();
  const { mutate } = useCreateProject();

  const navigate = useNavigate();

  function greeting() {
    const today = new Date();
    const curHr = today.getHours();
    if (curHr < 12) {
      return "Good Morning";
    } else if (curHr < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  }

  return (
    <div className="flex grow flex-row ">
      <div className="relative h-[calc(100dvh-3.4rem)] flex-grow place-items-center overflow-y-auto rounded-lg bg-base pr-2 dark:bg-baseDark">
        <img
          src="/profile-page-banner.jpg"
          alt="Profile Banner"
          className="w-full h-52 object-cover rounded-t-lg"
        />
        <div className="dark:border-baseBorder absolute left-16 top-[10.5rem] mx-auto flex h-28 w-28 items-center justify-center rounded-full border-[0.75rem] border-base bg-coolGrey-1/70 dark:border-baseDark dark:bg-borderDark/70">
          <div className={`truncate text-4xl font-bold  ${initialsColor(currentUser.name)} -mt-2`}>
            {initials(currentUser.name)}
          </div>
        </div>

        <div className="mx-auto mt-20 max-w-screen-lg">
          <Title>
            {greeting()} {currentUser.name}!
          </Title>
          <div className="flex max-w-3xl flex-col">
            <p className="-mt-4 text-sm text-coolGrey-4 dark:text-coolGrey-3">
              "Research is a journey of discovery, driven by curiosity and collaboration. It's the pursuit of knowledge, pushing boundaries and unlocking new possibilities. It's the heartbeat of innovation, guiding us towards a brighter future."
            </p>
            <div>
              <Text
                weight={600}
                size="md"
                className="float-right italic text-coolGrey-7 dark:text-pink-700"
              >
                - Rosalind Franklin
              </Text>
            </div>
          </div>
          <Tabs
            className=" !my-4 w-full border-none"
            defaultValue="projects"
            radius={"md"}
            keepMounted={false}
          >
            <Tabs.List className="flex !items-center !gap-2  !border-none !pb-2">
              <Tabs.Tab
                className="!rounded-lg !border-none !p-[0.6rem] !px-3 font-semibold !text-coolGrey-6 transition-all duration-300 ease-in-out hover:!bg-coolGrey-7 hover:!text-coolGrey-1 data-[active]:!bg-coolGrey-7 data-[active]:!text-coolGrey-1 dark:!text-coolGrey-4 dark:hover:!bg-purple-800/50 dark:data-[active]:!bg-purple-800 dark:data-[active]:!text-coolGrey-1"
                value="projects"
              >
                Your Research Projects
              </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="projects" ref={parent}>
              <div className="flex flex-col gap-2 rounded-lg py-2">
                <ProfileProjects projects={projects} createProject={mutate} isLoading={isLoading} />
              </div>
            </Tabs.Panel>
          </Tabs>
        </div>
      </div>
      <div className="bg-coolGrey flex w-[20rem] flex-col gap-1 rounded-lg bg-coolGrey-1 px-2 dark:bg-baseDarker">
        <DailyCount />
        <ProfileFriends user={currentUser} height="h-[16rem]" />
        <RecentNotifications />
      </div>
    </div>
  );
};
