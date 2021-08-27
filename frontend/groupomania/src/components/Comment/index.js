import React, { useContext } from "react";
import axios from "axios";
import "./comments.scss";
import { UserContext } from "../Context";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const Comment = comment => {
	const date = new Date(comment.comment.createdAt).toLocaleString();
	const { profile, handleAlert } = useContext(UserContext);
	
	return (
		<>
			{profile ? (
				<div aria-live="polite"
					aria-atomic="true"
					className="d-flex justify-content-center align-items-center w-100 mt-4">
					{}
					<div className="w-100 mainCom ">
						<div className="  d-flex justify-content-between">
							<p className="test">{comment.comment.User.username}</p>
							<span className="date">{date}</span>
						</div>
						<div className="comments d-flex">{comment.comment.comments}</div>
					</div>
				</div>
			) : null}
		</>
	);
};
export default Comment;
