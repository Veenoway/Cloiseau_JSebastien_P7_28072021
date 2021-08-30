import React, { useState, useContext } from "react";
import { handleSignUp } from "../../axios/users";
import { withRouter, Redirect, NavLink } from "react-router-dom";
import { UserContext } from "../Context";

function SignUp() {

	const [signUp, setSignUp] = useState({ email: "", password: "", username: "", role: "" });
	const { setProfile, handleAlert } = useContext(UserContext);
	const [redirect, setRedirect] = useState(false);
	const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const password_regex = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;
	const username_regex = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;

	const submitHandler = e => {
		e.preventDefault();

		handleSignUp(signUp)
			.then(res => {
				localStorage.setItem("token", res.data.token);
				const user = {
					id: res.data.user_id,
					username: res.data.username,
					role: res.data.role,
					email: res.data.email,
					isAdmin: res.data.isAdmin
				};
				setProfile(user);
				setRedirect(true);
				handleAlert("success", "Votre compte a bien été crée");
			})
			.catch(error => {
				handleAlert("danger", error.response.data.error);
			});
	};
	const [emailValid, setEmailValid] = useState(false);
	const [passwordValid, setPasswordValid] = useState(false);
	const [usernameValid, setUsernameValid] = useState(false);
	const [roleValid, setRoleValid] = useState(false);

	
	const handleChange = e => { // la valeur est égale à ce que l'utilisateur écrit dans l'input
		e.preventDefault();
		const { name, value } = e.target;
		if (e) {
			setSignUp({ ...signUp, [name]: value });
		}

		switch (name) { 
			case "email":
				email_regex.test(value) ? setEmailValid(true) : setEmailValid(false);
				break;
			case "password":
				password_regex.test(value)
					? setPasswordValid(true)
					: setPasswordValid(false);
				break;
			case "username":
				username_regex.test(value) && value.length <= 20
					? setUsernameValid(true)
					: setUsernameValid(false);
				break;
			case "role":
				username_regex.test(value) && value.length <= 20
					? setRoleValid(true)
					: setRoleValid(false);
				break;
			default:
				handleAlert("danger", "Un problème est survenue, veuillez reesayer");
		}
	};

	return (
		<>
			<div className="container my-4">
				<form className="signUp form-row" onSubmit={submitHandler} >
					<h2 className="my-5">Bienvenue sur le réseau social de Groupomania !</h2>
					<label htmlFor="email" >Adresse Mail</label>
					<input type="email"
						className={`form-control ${emailValid ? "valid" : "error"} `}
						name="email"
						id="email"
						value={signUp.email}
						onChange={handleChange}
						aria-describedby="emailHelp"
						placeholder="Enter email"/>
					<label htmlFor="password" className="mt-4 ">Mot de passe</label>
					<div className="form-groups">
						<input type="password"
							className={`form-control ${passwordValid ? "valid" : "error"} `}
							name="password"
							id="password"
							value={signUp.password}
							onChange={handleChange}
							placeholder="Password"/>
							<small id="smallPassword" className="text-muted">
								Minimum de 8 charactères contenant une majuscule, une minuscule, un chiffre et un charactère spécial comme : !@#$%^&*
							</small>
					</div>
					<div className=" form-group col-md-6 mt-4 ">
						<label htmlFor="username" className="margin">Pseudo</label>
						<input type="text"
							className={`form-control ${usernameValid ? "valid" : "error"} `}
							name="username"
							id="username"
							value={signUp.username}
							onChange={handleChange}
							placeholder="username"/>
					</div>
					<div className=" form-group col-md-6 mt-4 ">
						<label htmlFor="role" className="margin">Fonction</label>
						<input type="text"
							className={`form-control ${roleValid ? "valid" : "error"} `}
							name="role"
							id="role"
							value={signUp.role}
							onChange={handleChange}
							placeholder="UX Designer, Développeur"/>
					</div>

					{emailValid && passwordValid && usernameValid && roleValid ? (
						<button type="submit" className="btn btn-success mt-4 marg mb-2" >
							S'enregistrer
						</button>
					) : (
						<button type="submit" className="btn btn-danger mt-4 marg mb-2" disabled>
							S'enregistrer
						</button>
					)}
					<div className="mt-3 ">
						<p>Vous avez déjà un compte ?</p>
						<NavLink to="/login"> Se connecter</NavLink>
					</div>
				</form>
			</div>

			{redirect && <Redirect to="/myprofile" />}
		</>
	);
}

export default withRouter(SignUp);
