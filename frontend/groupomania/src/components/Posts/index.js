import React, { useState, useEffect, useContext } from 'react';
import './Post.scss';
import PostComponent from './PostComponent';
import Loading from '../Loader/loader';
import { addPost, deletePost, getPost, getPosts,moderate } from '../../axios/posts';
import { UserContext } from '../Context';




const Post = () => {
	const [posts, setPosts] = useState(null);
	const [active, setActive] = useState(false);
	const { handleAlert } = useContext(UserContext);
	const [newPost, setNewPost] = useState({ title: '', content: '', attachment: null });

	const handlePosts = () => {
		getPosts()
			.then((response) => {
				setPosts(response.data);
			})
			.catch((error) => handleAlert('danger', error.response.data.error));
	};

	useEffect(() => {
		if (!posts) {
			handlePosts();
		}
	}, [posts]);

	useEffect(() => {
		if (newPost.title !== '' && newPost.content !== '') {
			setActive(true);
		}
	}, [newPost]);

	const handlePostsByUserId = (UserId) => {
		getPost(UserId)
			.then((response) => {
				setPosts(response.data);
			})
			.catch((error) => handleAlert('danger', error.response.data.error));
	};

	const submitHandler = (e) => {

		
		e.preventDefault();
		
		const formData = new FormData();
		formData.append('title', newPost.title);
		formData.append('content', newPost.content);
		console.log("attachment:", newPost.attachment )
		if ( newPost.attachment !== null){
			formData.append('attachment', newPost.attachment, newPost.attachment.name);	
		}
		

		addPost(formData)
		
			.then((response) => {
				
				handlePosts();
				handleAlert('success', 'Your post has been sent');
			})
			.catch((error) => handleAlert('danger', error.response.data.error));
	};

	const handlePost = (e) => {
		if (e.target.name !== 'attachment') {
			setNewPost({ ...newPost, [e.target.name]: e.target.value });
		} else {
			setNewPost({
				...newPost, attachment: e.target.files[0],
			});
		}
	};
	
	const handleDeletePost = (id) => {
		deletePost(id)
			.then((response) => {
				
				const data = posts.filter((post) => post.id !== id);
				setPosts(data);
				handleAlert('success', response.data.message);
			})

			.catch((error) => handleAlert('danger', error.response.data.error));
	};

	const moderatePost = (id) => {
		moderate(id)
			.then((response) => {
				handlePosts();
				handleAlert('success', response.data.message);
			})
			.catch((error) => handleAlert('danger', error.response.data.error));
	};

	return (
		<>
	
			{posts ? (
				<>
					<div className='card borderin p-4 w-100 postform '>
						<form onSubmit={submitHandler}
							method='post'
							encType='multipart/form-data'
							className='postForm'>
							<div className='card-header'>
								<label htmlFor='title' className="marginR">Titre</label>
								<input type='text'
									className='form-control title'
									value={newPost.title}
									onChange={(e) => handlePost(e)}
									id='title'
									name='title'
									placeholder='Votre titre'
									aria-label='Votre titre'
									aria-describedby='basic-addon1'/>
							</div>
							<div className='card-body'>
								<label htmlFor='content' className="marginR">Post</label>
								<textarea className='form-control formInput'
									value={newPost.content}
									onChange={(e) => handlePost(e)}
									placeholder='Dites nous quelque chose..'
									id='content'
									name='content'/>
								<div className="d-flex justify-content-space-around align-items-center">
									<label className='attachment' htmlFor='attachment'></label>
									<input className='form-control attachment mt-4'onChange={(e) => handlePost(e)} id='attachment' name='attachment' type='file' width='30%'/>
									{active ? (
									<button className='btn btn-primary w-25 ' type='submit'>
										Poster
									</button>
									) : (
									<button disabled className='btn btn-dark w-25 ' type='submit'>
										Poster
									</button>)}
								</div>
							</div>
						</form>
					</div>
					<div className='post'>
						{posts && (
							<>
								{posts.map((post) => (
									<PostComponent key={post.id}
										post={post}
										handlePostsByUserId={handlePostsByUserId}
										moderatePost={moderatePost}
										handleDeletePost={handleDeletePost}/>
								))}
							</>
						)}
					</div>
				</>
			) : (
				<Loading />
			)}
		</>
	);
};
export default Post;
