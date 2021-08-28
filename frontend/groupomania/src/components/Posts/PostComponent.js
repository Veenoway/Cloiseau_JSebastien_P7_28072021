import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import CommentIcon from '@material-ui/icons/Comment';
import BlockIcon from '@material-ui/icons/Block';
import Comment from "../Comment";
import { UserContext } from "../Context";
import { handleNewCom, handleComs } from "../../axios/comment";
import Loading from "../Loader/loader";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

const PostComponent = ({ post, handlePostsByUserId, moderatePost, handleDeletePost, match, history }) => {

	const date = new Date(post.createdAt).toLocaleString();
	const [commentInput, setCommentInput] = useState(false);
	const [comments, setComments] = useState(null);
	const [newComment, setNewComment] = useState("");
	const postProfileId = post.UserId;
	const { profile, handleAlert } = useContext(UserContext);

	const handleNewComment = e => {
		handleNewCom(post, newComment)
			.then(response => {
				setNewComment("");
				handleComments();
				handleAlert("success", response.data.message);
			})
			.catch(error => handleAlert("danger", error.response.data.error));
	};

	const handleComment = e => {
		setNewComment({ comments: e.target.value });
		return
	};

	const handleComments = () => {
		handleComs(post)
			.then(response => {
				setComments(response.data.message);
				return
			})
			.catch(error => handleAlert("danger", error.response.data.error));
	};

	useEffect(() => {
		if (match.params.UserId) {
			handlePostsByUserId(match.params.UserId);
		}
	}, [match.params.UserId]);

	return (
		<>
			{profile ? (
				<div className="col-md-12 mt-4">
					<div className="card flex-md-column box-shadow h-md-250 pb-4 bgc">
						<div className=" d-flex flex-column align-items-center coloor bgc w-100">
							<div className="d-flex mb-2 text-primary mt-2 ">
								<span onClick={() => history.push(`/wall/${postProfileId}`)}
									className="badge rounded-pill blue seePost mt-3"
									autoFocus>
									{post.User.isAdmin ? <SupervisorAccountIcon className="admin mr-2"/> : null}
									{post.User.username}
									{profile.isAdmin ? ( <BlockIcon style={{ fontSize: 30 }} onClick={() => moderatePost(post.id)} className="icon ml-1" autoFocus/>) : null}
								</span>
							</div>
							<div className="width d-flex justify-content-center">
								{ post.attachment ?  <img src={post.attachment}
								className="m-3 w-100 h-100 "
								alt="post-capture"
								autoFocus/> : null }</div> 
								<h4 className="mt-2 white">{post.title}</h4>
								<p className="card-text mb-auto mt-2 white mx-4 hem">{post.content}</p>
								<span className=" mt-4 text-muted white">{date} 
								{profile.isAdmin || profile.id === post.UserId ? (
								<DeleteForeverIcon
									aria-label="Delete this post"
									className="icon delete infobulle ml-3 mb-1"
									style={{ fontSize: 30 }}
									onClick={() => handleDeletePost(post.id)}
								/>
							) : null}</span>
							</div>
						</div>
					<div className="card-footer bla p-3">
						{!post.isModerate ? (
							<CommentIcon
								className="icon mb-2 d-flex ml-2 mt-2"
								fontSize="large"
								onClick={() => commentInput
										? setCommentInput(false)
										: setCommentInput(true) + handleComments(post.id)
								}
							/>
						) : (
							<p style={{ color: "#cf1c28" }}>
								Vous ne pouvez pas ajouter de commentaire, ce post a été modéré
							</p>
						)}

						{commentInput && comments ? (
							<>
								<div className="input-group mb-3">
									<label htmlFor="comments"></label>
									<input type="text"
										className="form-control "
										placeholder="Votre commentaire"
										aria-label="comments"
										aria-describedby="basic-addon2"
										name="comments"
										onChange={e => handleComment(e)}
										autoFocus/>
									<div className="input-group-append">
										{newComment === "" ? (
											<button className="btn btn-dark "
												disabled
												type="submit"
												onClick={e => handleNewComment(e)}
												autoFocus>
													Envoyer
											</button>
										) : (
											<button className="btn dblue"
												type="submit"
												onClick={e => handleNewComment(e)}
												autoFocus>
													Envoyer
											</button>
										)}
									</div>
								</div>
								{comments.map(comment => (
									<Comment key={comment.id} comment={comment} />
								))}
							</>
						) : null}
					</div>
				</div>
			) : (
				<Loading />
			)}
		</>
	);
};
export default withRouter(PostComponent);
