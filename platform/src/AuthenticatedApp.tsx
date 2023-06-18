import React from "react";
import { AuthContextWrapper, useAuthContext } from "./contexts/AuthContext";
import { RouterProvider } from "react-router-dom";
import { TabContextWrapper } from "./contexts/TabContext";
import { publicRouter, router } from "./router";
import { getUser } from "./api/user";
import { UserLoader } from "./UserLoader";
export function AuthenticatedApp({}) {
	const { currentUser } = useAuthContext();

	if (!currentUser) {
		return <RouterProvider router={publicRouter} />;
	}

	return (
		<UserLoader>
			<TabContextWrapper>
				<RouterProvider router={router} />
			</TabContextWrapper>
		</UserLoader>
	);
}
