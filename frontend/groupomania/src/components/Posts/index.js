import React, { useState, useEffect, useContext } from 'react';
import './Post.scss';
import PostComponent from './PostComponent';
import Loading from '../Loader/loader';
import { addPost, deletePost, getPost, getPosts,moderate, } from '../../axios/posts';
import { UserContext } from '../Context';




const Post = () => { 

	// HOOK

	const [posts, setPosts] = useState(null); 
	const [active, setActive] = useState(false);
	const { handleAlert } = useContext(UserContext);
	const [newPost, setNewPost] = useState({ title: '', content: '', attachment: null });
	

	

	const handlePosts = () => { // On récupère les posts et on envoie les donnée 
		getPosts()
			.then((response) => {
				setPosts(response.data); // Afficher les posts présents
			})
			.catch((error) => handleAlert('danger', error.response.data.error));
	};

	useEffect(() => { // Tant que des posts existe on les affiches
		if (!posts) {
			handlePosts();
		}
	}, [posts]);

	useEffect(() => { // Si le post contient un titre et un content ALORS on active le bouton de validation tant que newPost change
		if (newPost.title !== '' && newPost.content !== '' || newPost.title !== '' && newPost.content !== '' && newPost.attachment ) {
			setActive(true); 
		}
	}, [newPost]);

	const handlePostsByUserId = (UserId) => { // Récupération des posts d'une personne
		getPost(UserId) // On récupère l'id de l'utilisateurs
			.then((response) => {
				setPosts(response.data); // On affiche ses posts
			})
			.catch((error) => handleAlert('danger', error.response.data.error));
	};

	const submitHandler = (e) => { // On crée un ensemble de clé valeurs représentant les champs des forms et leurs valeurs 

		e.preventDefault();
		const formData = new FormData();
		formData.append('title', newPost.title); 
		formData.append('content', newPost.content);

		if ( newPost.attachment !== null){ // Si l'utilisateur met une image
			formData.append('attachment', newPost.attachment, newPost.attachment.name);	
		}
		

		addPost(formData) // On post formData 
			.then((response) => {
				handlePosts(); // Affiche les posts
				handleAlert('success', 'Your post has been sent');
				handleReset()
			})
			.catch((error) => handleAlert('danger', error.response.data.error));
	};

	const handlePost = (e) => { 
		if (e.target.name !== 'attachment') { // S'il n'y a pas d'image 
			setNewPost({ ...newPost, [e.target.name]: e.target.value }); 
		} else {
			setNewPost({
				...newPost, attachment: e.target.files[0], // S'il ya une image 
			});
		}
	};
	
	const handleDeletePost = (id) => { // Suppression d'un post
		deletePost(id) // On supprime le post avec son id 
			.then((response) => {
				const data = posts.filter((post) => post.id !== id); // On supprime si les id concorde 
				setPosts(data); // On réaffiche les posts avec une nouvelle valeur pour posts
				handleAlert('success', response.data.message);
			})

			.catch((error) => handleAlert('danger', error.response.data.error));
	};


	const moderatePost = (id) => { // Moderation du post 
		moderate(id) // Si isModerate = 0 alors on le passe à un // Si isModerate = 1 alors on le passe à zero le post que l'on souhaite avec le params id (id du post)
			.then((response) => {
				handlePosts(); // On affiches les posts
				handleAlert('success', response.data.message);
			})
			.catch((error) => handleAlert('danger', error.response.data.error));
	};

	const handleReset = () => { // Permet de reset les values du form
		setNewPost({ title:'', content: '', attachment: null, })
		setActive(false)
	  };

	 
	

	return (
		<>
	
			{posts ? ( 
				<>
					<div className='card borderin p-4 w-100 postform '>
						<form id="reset" onSubmit={submitHandler}
							onReset={handleReset}
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
									<input className='form-control attachment mt-4'onChange={(e) => handlePost(e)}  id='attachment' name='attachment' type='file' width='30%' />
									{active ? (
									<button className='btn btn-primary w-25 ' type='submit' onclick={handleReset}>
										Poster
									</button>
									) : (
									<button disabled className='btn btn-dark w-25 ' type='submit' onclick={handleReset}>
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
