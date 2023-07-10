import { Link } from "react-router-dom";
import React, { useRef, useState } from "react";
import { apple, google } from "../../assets/icons";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Divider, PasswordInput, TextInput } from "@mantine/core";
import { loginUser, registerUser } from "../../api/user";
import { useSignUp } from "../../hooks/user/useSignup";
import { sign } from "crypto";
import { AuthTitle } from "./AuthTitle";
import { inputStyles } from "./inputStyles";
import { BlueButton } from "../buttons/BlueButton";

export function Register() {
	const emailRef = useRef<HTMLDivElement>(null) as any;
	const nameRef = useRef<HTMLDivElement>(null) as any;
	const passwordRef = useRef<HTMLDivElement>(null) as any;
	const passwordConfirmRef = useRef<HTMLDivElement>(null) as any;

	const { mutate: signup } = useSignUp();
	const navigate = useNavigate();

	const { createAUserWithEmailAndPassword, currentUser } = useAuthContext();
	const [loading, setLoading] = useState(false);

	const handleAccountCreation = async (e: React.FormEvent) => {
		e.preventDefault();
		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return alert("Passwords do not match");
		}

		try {
			signup({
				email: emailRef.current.value,
				password: passwordRef.current.value,
				name: nameRef.current.value,
			});
		} catch (error: unknown) {
			console.log(error);
			if (error instanceof Error) alert(error.message);
		}
		setLoading(false);
	};

	return (
		<AuthTitle
			title="Create an account 👋"
			subtitle="
			Welcome! Let&#39;s get you set up with an account"
		>
			<form onSubmit={handleAccountCreation}>
				<TextInput
					ref={nameRef}
					type="text"
					required
					placeholder="Your Name"
					label="Name"
					styles={{
						...inputStyles,
					}}
				/>
				<TextInput
					ref={emailRef}
					required
					placeholder="your@email.com"
					label="Email Address"
					type="email"
					styles={{
						...inputStyles,
					}}
				/>
				<PasswordInput
					variant="unstyled"
					ref={passwordRef}
					placeholder="YourUnique_Password!123"
					required
					label="Password"
					styles={{
						...inputStyles,
					}}
				/>
				<PasswordInput
					variant="unstyled"
					ref={passwordConfirmRef}
					placeholder="YourUnique_Password!123"
					required
					label="Confirm Password"
					className="mb-5"
					styles={{
						...inputStyles,
					}}
				/>
				<BlueButton>Register</BlueButton>
			</form>
			<Divider my="md" label="or" labelPosition="center" />

			<Link to="/auth/login">
				<p className="text-center text-xs text-blueText font-medium ">
					Already have an account ?
					<span className="underline pl-5 cursor-pointer hover:underline-offset-2 ease-in-out duration-300 text-gray-400 font-semibold">
						Login
					</span>
				</p>
			</Link>
		</AuthTitle>
	);
}
