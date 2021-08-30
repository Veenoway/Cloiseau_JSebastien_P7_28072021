import React, { useState, useContext } from "react";
import "../Register/Register.scss";
import { handleLogin } from "../../axios/users";
import { NavLink, Redirect } from "react-router-dom";
import { UserContext } from "../Context";

const LogIn = () => { // Fonction de connexion

	const [login, setLogin] = useState({ email: "", password: "" });
	const { setProfile, handleAlert } = useContext(UserContext);
	const [redirect, setRedirect] = useState(false);

	const submitHandler = e => { // Validation du form si les champs sont remplis
		e.preventDefault();
		handleLogin(login) 
			.then(res => { 
				localStorage.setItem("token", res.data.token); 
				setProfile(res.data.user);  
				setRedirect(true); 
			})
			.catch(error => {
				handleAlert("danger", error.response.data.error);
			});
	};

	return (
		<>
			<form className="login" onSubmit={submitHandler}>
				<div className="form-group">
					<h2 className="mb-5">Bienvenue sur votre page de connexion</h2>
					<label htmlFor="email">Email</label>
					<input type="email"
						className="form-control"
						name="email"
						id="email"
						value={login.email}
						onChange={e => setLogin({ ...login, email: e.target.value })} // Remplace la valeur du mail de state login
						aria-describedby="emailHelp"
						placeholder="Enter email"
						autoFocus/>
				</div>
				<div className="form-group mt-4">
					<label htmlFor="exampleInputPassword1">Mot de passe</label>
					<input type="password"
						className="form-control "
						name="password"
						id="password"
						value={login.password}
						onChange={e => setLogin({ ...login, password: e.target.value })} // Remplace la valeur du mot de passe de state login
						placeholder="Password"
						autoFocus/>
				</div>{" "}
				<h2 id="emailHelp" className="form-text" aria-hidden="true"></h2>
				<button type="submit" className="btn btn-success mt-5 mb-4">
					Se connecter
				</button>
				<p className="my-4">Vous n'avez pas de compte ?</p>
				<NavLink to="/"> S'inscrire</NavLink> 
			</form> 
			{redirect && <Redirect to="/myprofile" />} 
		</>
	); 
};

export default LogIn;
