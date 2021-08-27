import React, { useState, useContext } from "react";
import "./Profile.scss";
import Alert from "../Alert";
import { handleDelete } from "../../axios/users";
import { withRouter } from "react-router-dom";
import { UserContext } from "../Context";
import Loading from "../Loader/loader";
import 'bootstrap/dist/css/bootstrap.css';

const Profile = ({ history }) => {
	const [success] = useState(false);

	const { profile, handleAlert } = useContext(UserContext);

	const handleDeleteUser = () => {
		handleDelete()
			.then(response => {
				handleAlert(
					"success",
					"Votre compte a bien été supprimé !"
				);
				setTimeout(() => {
					history.push("/");
				}, 5000);
				localStorage.clear();
			})
			.catch(error => handleAlert("danger", error.response.data.error));
	};

	return (
		<>
			{profile ? (
				<div className="coloor container w-50 mt-2 mb-2">
					{success ? <Alert /> : null}
					<div className=" em">
					<img src="/images/icon-left-font.png"
								className="new"
								alt="post-capture"
								height="220"
								autoFocus/>
						<h3 className="darkBlue">Bienvenue sur votre page profile {profile.username} !</h3>
						
						<p className="pt-3 mb-4 rem">
							 Ici vous retrouverez toutes vos informations personnelles ainsi qu'un bouton permettant la suppression de votre compte.
							<br />
							Les commentaires et les posts peuvent être modérés par un administrateur.
						</p>	
					</div>
					<ul className="d-flex-column align-items-center justify-content-center rem padNone">
						<li className="darkBlue none py-1">Pseudo : {profile.username}</li>
						<li className="darkBlue none py-1">Email : {profile.email}</li>
						<li className="darkBlue none py-1">Rôle: {profile.role}</li>
						<li className="darkBlue none py-1 ">
							Administrateur : {JSON.stringify(profile.isAdmin)}
						</li>
					</ul>
					<div className=" d-flex justify-content-center rem">
						<button type="button"
							onClick={handleDeleteUser}
							className="btn btn-danger mt-3">
							Supprimer votre compte
						</button>
					</div>
					<p className="mt-4 redBlood">Attention ! Cette action est irrévérsible !</p>
				</div>
			) : (
				<Loading />
			)}
		</>
	);
};

export default withRouter(Profile);
