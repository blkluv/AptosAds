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
			console.log(import.meta.env.VITE_SERVER_URI + '/api/memes');
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
		}

		// Add further handling logic for submitting the reel (e.g., saving it to the server, blockchain, etc.)
	};

	return (
		<div className='h-[calc(100vh-60px)] overflow-hidden bg-gray-900 text-white py-8 px-4'>
			<h1 className='text-3xl text-yellow-400 font-bold text-center mb-8'>Upload a New Meme</h1>

			{/* Form to create a new reel */}
			<div className='max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8'>
				<form onSubmit={handleSubmit} className='space-y-6'>
					{/* Title Input */}
					<div>
						<label
							htmlFor='title'
							className='text-lg mb-2 font-semibold text-yellow-500'
						>
							Title
						</label>
						<input
							id='title'
							type='text'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className='w-full p-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500'
							placeholder='Enter the title for your meme'
							required
						/>
						{error.title && <p className='text-red-500'>{error.title}</p>}
					</div>

					{/* Description Input */}
					<div>
						<label
							htmlFor='description'
							className='text-lg mb-2 font-semibold text-yellow-500'
						>
							Description
						</label>
						<textarea
							id='description'
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className='w-full p-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500'
							placeholder='Enter a description for your meme'
							rows='4'
							required
						/>
						{error.description && (
							<p className='text-red-500'>{error.description}</p>
						)}
					</div>

					{/* Video Link Input */}
					<div>
						<label
							htmlFor='videoLink'
							className='text-lg mb-2 font-semibold text-yellow-500'
						>
							Upload Media
						</label>
						<p className='text-sm text-gray-300 py-2 px-1'>Type: Image or Video</p>
						<FileUploaderRegular
							sourceList='local, url, camera, gdrive'
							classNameUploader='uc-dark uc-orange'
							pubkey='63c390ba99b5cdeed23a'
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
										className='w-1/3 rounded-xl my-2'
									/>
								) : (
									<video
										src={videoLink}
										controls
										className='w-1/3 rounded-xl my-2'
									></video>
								)}
							</div>
						)}
					</div>

					<div className='w-full'>
						<button
							type='submit'
							className='px-6 py-2 w-full bg-yellow-400 hover:bg-yellow-500 rounded-lg text-black text-lg font-medium'
						>
							Upload
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ListingPage;
