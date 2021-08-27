import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.scss";
function Footer() {
	return (
		<footer className=" footer">
			<NavLink to="#" className="test">F.A.Q</NavLink>
			<NavLink to="#" className="test">Conditions</NavLink>
			<NavLink to="#" className="test">Notre équipe</NavLink>
			<NavLink to="#" className="test pad">A propos</NavLink>
		</footer>
	);
}
export default Footer;
