import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import google from "../../images/google.png";
import {
	useCreateUserWithEmailAndPassword,
	useSignInWithEmailAndPassword,
	useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
const Signup = () => {
	const emailRef = useRef("");
	const passwordRef = useRef("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const navigate = useNavigate();
	const [createUserWithEmailAndPassword, user, loading, error] =
		useCreateUserWithEmailAndPassword(auth);
	const [signInWithGoogle, googleUser, googleLoading, googleError] =
		useSignInWithGoogle(auth);
	const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
	const handleGoogleBtn = () => {
		signInWithGoogle();
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		createUserWithEmailAndPassword(email, password, {
			sendEmailVerification: true,
		});
		if (user) {
			signInWithEmailAndPassword(email, password);
			navigate("/");
		}
		if (error) {
			if (error.message.includes("email")) {
				setEmailError("email already in use");
			} else {
				setPasswordError("Password must be at least 6 characters long");
			}
		}
	};
	if (googleUser) {
		navigate("/");
	}

	return (
		<div className="signup-container">
			<div className="signup-form shadow-lg">
				<form onSubmit={handleSubmit}>
					<div className="input">
						<h6>Email</h6>
						<input type="email" name="email" id="email" ref={emailRef} />
						<span className="error text-danger">
							{error?.message.includes("email") && "*email already in use"}
						</span>
					</div>
					<div className="input mt-3">
						<h6>Password</h6>
						<input
							type="password"
							name="password"
							id="email"
							ref={passwordRef}
						/>
						<span className="error text-danger">
							{error &&
								!error?.message.includes("email") &&
								"*password at least 6 characters long"}
						</span>
					</div>
					<input type="submit" value="Signup" className="py-2" />
				</form>
				<p className="text-center">
					<small>
						Already registered?
						<span className="ms-1">
							<Link to="/login" style={{ textDecoration: "none" }}>
								Login
							</Link>
						</span>
					</small>
				</p>
				<p className="text-center">----- or -----</p>
				<button
					onClick={handleGoogleBtn}
					className="d-flex py-1 btn align-items-center justify-content-center shadow border-rounded"
				>
					<img src={google} height={36} width={36} alt="google" />
					<span>Continue With Google</span>
				</button>
				<p className="m-0 text-center text-danger">
					{googleError && <small>*Popup closed by user</small>}
				</p>
			</div>
		</div>
	);
};

export default Signup;
