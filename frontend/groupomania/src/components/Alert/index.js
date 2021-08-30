import React from "react";
import "./Alert.scss";

const Alert = ({ status, text }) => {
	console.log(status)
	console.log(text)
	return (
		<>
			{status === "success" && text ? (
				<div className="alert alert-success" role="alert">
					{text}
				</div>
			) : (
				<div className="alert alert-danger" role="alert">
					{text}
				</div>
			)}
		</>
	);
};
export default Alert;
