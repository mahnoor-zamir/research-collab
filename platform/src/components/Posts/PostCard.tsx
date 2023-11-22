import { FC } from "react";
import { IPost } from "../../interfaces/IPost";
import { Image, Text, Badge, Group, Card } from "@mantine/core";
import { useDefaultDateTime } from "../../hooks/useTimeFromNow";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../../Providers/ThemeProvider";
import {
	collaborationTypeColour,
	postTypeColour,
} from "../../utils/typeColours";
export const PostCard: FC<{
	post: IPost;
	openPost: (postId: string) => void;
	style?: string;
}> = ({ post, openPost, style }) => {
	const postCardPicture = () => {
		const pictures = [
			"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=684&q=80",
			"https://images.unsplash.com/photo-1510218830377-2e994ea9087d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1316&q=80",
			"https://images.unsplash.com/photo-1516780236580-ef416334d5b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=698&q=80",
			"https://images.unsplash.com/photo-1490709501740-c7ac36b7d587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80,",
			"https://images.unsplash.com/photo-1546521677-b3a9b11bee6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=685&q=80",
		];
		switch (post?.collaborationType) {
			case "Accountability":
				return pictures[0];
			case "Collaboration":
				return pictures[1];
			case "Critique":
				return pictures[2];
			case "Feedback":
				return pictures[3];
			case "Other":
				return pictures[4];
			default:
				return pictures[0];
		}
	};

	const { theme } = useThemeContext();
	const navigate = useNavigate();
	const gray = "#e5e7eb";
	const gray2 = "#ced4da";
	const blue = "#394251";

	return (
		<div
			className={`basis-[20.5rem] self-start max-w-[24rem] grow group hover:border-coolGrey-3 ${style}`}
		>
			<Card
				padding="md"
				withBorder
				className="!bg-transparent !border-border dark:!border-borderDark dark:!hover:shadow-none dark:hover:!border-coolGrey-5 hover:!shadow-md transition-all duration-200 ease-in-out cursor-pointer"
				onClick={() => openPost(post.uid)}
				// style={{
				// 	background: post?.theme?.background || "white",
				// 	borderColor: "#ebebeb",
				// 	borderRadius: "0.25rem",
				// }}
			>
				{/* <Card.Section>
					<Image
						src={postCardPicture()}
						height={160}
						alt={post.postTitle}
						className="group-hover:grayscale-0 grayscale transition-all ease-in-out duration-300"
					/>
				</Card.Section> */}
				<Group
					position="apart"
					mt="xs"
					mb="xs"
					className="flex flex-row gap-1 items-start"
				>
					<UserRenderer post={post} />
					<div className="flex gap-1">
						<Badge
							color={collaborationTypeColour(post?.collaborationType)}
							variant={theme === "light" ? "light" : "outline"}
							radius="sm"
							size="md"
						>
							{post?.collaborationType}
						</Badge>
						<Badge
							color={postTypeColour(post?.postType)}
							variant={theme === "light" ? "light" : "outline"}
							size="md"
							radius="sm"
						>
							{post?.postType}
						</Badge>
					</div>
				</Group>

				<Text
					weight={600}
					size="md"
					className="text-coolGrey-7 dark:text-coolGrey-3"
					// style={{
					// 	color: post?.theme?.projectTitle || blue,
					// }}
				>
					{post.projectTitle || "Untitled post"}
				</Text>
				<Text
					weight={500}
					size="xs"
					className="text-coolGrey-7 dark:text-coolGrey-3"
					// style={{
					// 	color: post?.theme?.postTitle || gray2,
					// }}
				>
					{post.postTitle || "Untitled post"}
				</Text>

				<Text
					size="xs"
					color="dimmed"
					className="line-clamp-3 h-14"
					// style={{
					// 	color: post?.theme?.text || blue,
					// }}
				>
					{post.collaboration}
				</Text>
				{post.genres?.length > 0 && (
					<div className="flex flex-wrap gap-2 my-4 cursor-default h-8 line-clamp-3">
						{post.genres.map((genre) => (
							<Text key={genre} size="xs" color="dimmed" weight={600}>
								#{genre}
							</Text>
						))}
					</div>
				)}
				{/* <BlueButton onClick={() => openPost(post.uid)}>
					<IconEye size={18} className="mr-2" /> Explore post
				</BlueButton> */}
			</Card>
		</div>
	);
};

const UserRenderer = ({ post }: { post: IPost }) => {
	return (
		<div className="flex items-center gap-2 mb-3">
			<Image
				src="https://images.unsplash.com/photo-1490709501740-c7ac36b7d587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
				alt="Profile picture"
				width={30}
				height={30}
				radius="lg"
			/>
			<div className="flex flex-col text-coolGrey-7 dark:text-coolGrey-3">
				<Text className="text-xs font-semibold">{post?.owner.name}</Text>
				<Text size="xs" color="dimmed">
					{useDefaultDateTime(post?.dateCreated.toString())}
				</Text>
			</div>
		</div>
	);
};
