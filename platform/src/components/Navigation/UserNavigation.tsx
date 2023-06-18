import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function UserNavigation() {
	const { signOutCurrentUser } = useAuthContext();
	const navigate = useNavigate();
	const style =
		"font-medium px-2 py-2 mx-1 text-sm text-blueText hover:bg-white rounded-md hover:text-black";
	const handleSignOut = async () => {
		await signOutCurrentUser();
	};
	return (
		<div className="flex">
			<Link to="/dashboard/posts">
				<div className=" ml-auto my-3 flex cursor-pointer">
					<a className={style}>Dashboard</a>
				</div>
			</Link>
			<Link to="/auth/register">
				<div className="my-3 flex cursor-pointer">
					<a className={style} onClick={handleSignOut}>
						Logout
					</a>
				</div>
			</Link>
		</div>
	);
}
