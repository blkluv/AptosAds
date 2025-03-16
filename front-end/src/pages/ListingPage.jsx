import React, { useState } from 'react';
import { FileUploaderRegular } from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';
import axios from 'axios';
import toast from 'react-hot-toast';

const ListingPage = () => {
	// State variables for the form fields
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [videoLink, setVideoLink] = useState('');
	const [error, setError] = useState({
		title: null,
		description: null,
		videoLink: null,
	});
	const [loading, setLoading] = useState(false);
	const [mediaType, setMediaType] = useState('video');

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!title) {
			setError({ ...error, title: 'Title is required' });
			return;
		}
		if (!description) {
			setError({ ...error, description: 'Description is required' });
			return;
		}
		if (!videoLink) {
			setError({ ...error, videoLink: 'Media file is required' });
			return;
		}
		try {
			setLoading(true);
			const res = await axios.post(
				import.meta.env.VITE_SERVER_URI + '/api/memes',
				{
					title,
					description,
					media: {
						link: videoLink,
						mediaType,
					},
					email: localStorage.getItem('email'),
				}
			);
			toast.success('Meme uploaded successfully');
		} catch (error) {
			console.error(error);
			toast.error('Failed to upload meme');
		} finally {
			setLoading(false);
			setTitle('');
			setDescription('');
			setVideoLink('');
		}
		// Add further handling logic for submitting the reel (e.g., saving it to the server, blockchain, etc.)
	};

	return (
		<div className='min-h-[calc(100vh-60px)] bg-gray-900 text-white py-8 px-4'>
			{/* Form to create a new reel */}
			<div className='max-w-3xl p-8 mx-auto bg-gray-800 rounded-lg shadow-lg primary-font'>
				<h1 className='mb-8 text-3xl font-bold text-center text-yellow-400 primary-font'>
					Upload a New Meme 😂
				</h1>
				<form onSubmit={handleSubmit} className='space-y-6'>
					{/* Title Input */}
					<div>
						<label
							htmlFor='title'
							className='mb-2 text-lg font-semibold text-yellow-500'
						>
							Title
						</label>
						<input
							id='title'
							type='text'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className='w-full p-2 text-white bg-gray-700 rounded-lg secondary-font focus:outline-none focus:ring-2 focus:ring-yellow-500'
							placeholder='Enter the title for your meme'
							required
						/>
						{error.title && <p className='text-red-500'>{error.title}</p>}
					</div>

					{/* Description Input */}
					<div>
						<label
							htmlFor='description'
							className='mb-2 text-lg font-semibold text-yellow-500'
						>
							Description
						</label>
						<textarea
							id='description'
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className='w-full p-2 text-white bg-gray-700 rounded-lg secondary-font focus:outline-none focus:ring-2 focus:ring-yellow-500'
							placeholder='Enter a description for your meme'
							rows='6'
							required
							maxLength={500}
						/>
						{error.description && (
							<p className='text-red-500'>{error.description}</p>
						)}
					</div>

					{/* Video Link Input */}
					<div className='uploadcare-widget'>
						<label
							htmlFor='videoLink'
							className='flex items-baseline gap-1 mb-1 text-lg font-semibold text-yellow-500'
						>
							Upload Media
							<p className='text-sm text-white secondary-font'>(Image/Video)</p>
						</label>
						<p className='pb-3 text-sm text-gray-300 secondary-font'>
							Note: Aspect ratio should be 9:16
						</p>
						<FileUploaderRegular
							sourceList='local, url, camera, gdrive'
							classNameUploader='uc-dark uc-orange'
							pubkey='299a07b6a5e65a456eea'
							multiple={false}
							accept='image/*, video/*'
							onFileUploadSuccess={(e) => {
								setMediaType(e.isImage ? 'image' : 'video');
								setVideoLink(e.cdnUrl);
							}}
						/>
						{error.videoLink && (
							<p className='text-red-500'>{error.videoLink}</p>
						)}
						{videoLink && (
							<div className='flex items-center space-x-2'>
								{mediaType === 'image' ? (
									<img
										src={videoLink}
										alt='Uploaded Image'
										className='w-1/3 my-2 rounded-xl'
									/>
								) : (
									<video
										src={videoLink}
										controls
										className='w-1/3 my-2 rounded-xl'
									></video>
								)}
							</div>
						)}
					</div>

					<div className='w-full'>
						<button
							type='submit'
							className='w-full px-6 py-2 text-xl font-medium text-center text-black bg-yellow-400 rounded-lg hover:bg-yellow-500'
						>
							{loading ? (
								<img
									className='mx-auto animate-spin'
									width={30}
									src='https://www.freeiconspng.com/thumbs/load-icon-png/load-icon-png-8.png'
								/>
							) : (
								'Publish'
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ListingPage;
