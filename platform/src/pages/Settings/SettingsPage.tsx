import { FC } from "react";
import { Divider, Skeleton, Tabs, Tooltip } from "@mantine/core";
import { useAuthContext } from "../../contexts/AuthContext";
import { SettingsHeader } from "../../components/settings/SettingsHeader";
import { tooltipStyles } from "../../styles/tooltipStyles";
import { tabStyles } from "../../styles/tabStyles";
import { useNavigate, useParams } from "react-router-dom";
import {
	IconHome,
	IconSettings,
	IconUser,
	IconVocabulary,
} from "@tabler/icons-react";
import { ProfileSettings } from "./ProfileSettings";
import { LanguageSettings } from "./LanguageSettings";
export const SettingsPage: FC<{}> = () => {
	const navigate = useNavigate();
	const { settingsTab } = useParams();

	return (
		<div className="h-[calc(100vh-2.6rem)] place-items-center rounded-normal border border-border bg-base px-3 py-2 ">
			<SettingsHeader />
			<Tabs
				className="w-full border-none important:border-none h-[calc(100vh-7.0rem)]"
				value={settingsTab}
				onTabChange={(tab) => navigate(`/settings/${tab}`)}
				defaultValue="home"
				radius={"md"}
				orientation="vertical"
				styles={tabStyles}
				keepMounted={false}
			>
				<Tabs.List>
					<Tooltip
						label="Profile"
						position="right"
						withArrow
						styles={tooltipStyles}
					>
						<Tabs.Tab value="profile">
							<IconUser size={18} />
						</Tabs.Tab>
					</Tooltip>

					<Tooltip
						label="Language"
						position="right"
						withArrow
						styles={tooltipStyles}
					>
						<Tabs.Tab value="language">
							<IconVocabulary size={18} />
						</Tabs.Tab>
					</Tooltip>

					{/* <Divider my="xs" className="border-border" />
					<Tooltip
						label="Settings"
						position="right"
						withArrow
						styles={tooltipStyles}
					>
						<Tabs.Tab value="settings">
							<IconSettings size={18} />
						</Tabs.Tab>
					</Tooltip> */}
				</Tabs.List>
				<Tabs.Panel value="profile">
					<ProfileSettings />
				</Tabs.Panel>
				<Tabs.Panel value="language">
					<LanguageSettings />
				</Tabs.Panel>
			</Tabs>
		</div>
	);
};
