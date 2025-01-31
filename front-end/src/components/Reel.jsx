import { useState, useRef, useEffect } from 'react';
import { FaHeart, FaChevronUp, FaShare } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FaHandHoldingHeart } from 'react-icons/fa';
import ViralToggle from './ViralAction';

const Reel = ({
	media,
	title,
	description,
	likes,
	shares,
	likedOrNot,
	id,
	activeReel,
	setActiveReel,
	type,
	creator_wallet,
}) => {
	const [liked, setLiked] = useState(likedOrNot || false);
	const [likesCount, setLikesCount] = useState(likes);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const videoRef = useRef(null);
	const isActive = activeReel === id;

	// Handle like action
	const handleLike = async () => {
		if (liked) {
			toast.error('You have already liked this post');
			return;
		}

		try {
			await axios.post(
				import.meta.env.VITE_SERVER_URI + `/api/memes/like/${id}`,
				{
					email: localStorage.getItem('email'),
				}
			);
			setLikesCount((prev) => prev + 1);
			setLiked(true);
		} catch (error) {
			console.error('Error liking the post:', error);
			toast.error('Failed to like the post');
		}
	};

	// Play/pause current video & pause others
	const togglePlayPause = () => {
		if (!isActive) {
			setActiveReel(id); // Set current reel as active
		}
	};

	useEffect(() => {
		if (videoRef.current) {
			if (isActive) {
				videoRef.current.play();
				videoRef.current.muted = false; // Unmute when active
			} else {
				videoRef.current.pause();
				videoRef.current.muted = true; // Mute when not active
			}
		}
	}, [isActive]);

	// Intersection Observer to detect visibility
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				if (entry.isIntersecting) {
					if (videoRef.current) {
						videoRef.current.play();
						videoRef.current.muted = false; // Unmute when in view
					}
				} else {
					if (videoRef.current) {
						videoRef.current.pause();
						videoRef.current.muted = true; // Mute when out of view
					}
				}
			},
			{
				threshold: 0.5, // 50% of the video should be in view
			}
		);

		if (videoRef.current) {
			observer.observe(videoRef.current);
		}

		// Cleanup observer on component unmount
		return () => {
			if (videoRef.current) {
				observer.unobserve(videoRef.current);
			}
		};
	}, []);

	// Toggle drawer open/close
	const toggleDrawer = () => {
		setDrawerOpen((prev) => !prev);
	};

	const getAptosWallet = () => {
		if ('aptos' in window) {
			return window.aptos;
		} else {
			toast.error('Petra Wallet not found! Please install');
			window.open('https://petra.app/', `_blank`);
		}
	};

	const handleSupport = async () => {
		const wallet = getAptosWallet(); // see "Connecting"

		const transaction = {
			arguments: [creator_wallet, '717'],
			function: '0x1::coin::transfer',
			type: 'entry_function_payload',
			type_arguments: ['0x1::aptos_coin::AptosCoin'],
		};

		try {
			const pendingTransaction = await window.aptos.signAndSubmitTransaction(
			{	...transaction}
			);
			console.log('Pending transaction:', pendingTransaction);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='relative rounded-none flex flex-col h-[89vh] w-[30vw] max-sm:w-[100vw] bg-base-100'>
			<div className='flex flex-col h-full w-full items-center justify-center'>
				{type === 'video' ? (
					<video
						ref={videoRef}
						className='w-auto h-[100vh] max-w-full max-h-screen object-contain'
						src={media}
						autoPlay={isActive}
						loop
						playsInline
						onClick={togglePlayPause}
						muted={!isActive} // Only unmute if active
					/>
				) : (
					<img
						className='w-auto h-[100vh] max-w-full max-h-screen object-contain'
						src={media}
						alt='Meme'
					/>
				)}
			</div>

			{/* Description Drawer Section */}
			<div
				className={`transition-all duration-300 ease-in-out ${
					drawerOpen ? 'h-[50%]' : 'h-[7%]'
				} bg-[#000000b5] text-white p-4 absolute bottom-0 left-0 w-full rounded-t-2xl`}
			>
				{/* Title */}
				<h1
					className={`text-lg  font-semibold text-white primary-font mb-2 ${
						drawerOpen ? 'absolute top-2' : 'relative w-[90%] truncate'
					}`}
				>
					{title}
				</h1>

				{/* Description */}
				<p
					className={`text-base text-gray-300 transition-all duration-300 ease-in-out ${
						drawerOpen
							? 'h-[80%]  w-[87%]  mt-7 overflow-auto'
							: 'h-0 overflow-hidden'
					}`}
				>
					{description}
				</p>

				{/* Arrow to toggle drawer */}
				<div className='absolute bottom-11 left-1/2 transform -translate-x-1/2'>
					<button
						onClick={toggleDrawer}
						className='bg-transparent text-[#eee31a] rounded-full'
					>
						<FaChevronUp
							size={20}
							className={`transform ${drawerOpen ? 'rotate-180' : ''}`}
						/>
					</button>
				</div>
			</div>

			{/* Viral/Not Viral Buttons */}
			<ViralToggle memeId={id} />

			{/* Icons (Like, Share) */}
			<div className='absolute bottom-16 right-4 flex flex-col items-center gap-4'>
				{/* Like Button with Likes Count */}
				<div className='flex flex-col items-center'>
					<button
						className={`p-2 rounded-full border border-[#eee31a] text-white bg-slate-900 hover:bg-gray-700 ${ liked ? 'text-yellow-500' : ''}`}
						onClick={handleLike}
					>
						<FaHeart size={16} />
					</button>
					<span className='text-xs text-white mt-2'>{likesCount} Likes</span>
				</div>

				{/* Share Button with Shares Count */}
				<div className='flex flex-col items-center'>
					<button className='p-2 rounded-full border border-[#eee31a] text-white bg-slate-900 hover:bg-gray-700'>
						<FaShare size={15} />
					</button>
					<span className='text-xs text-white mt-2'>{shares} Shares</span>
				</div>

				<div onClick={handleSupport} className='flex flex-col items-center'>
					<button className='p-2 rounded-full border border-[#eee31a] text-white bg-slate-900 hover:bg-gray-700'>
						<FaHandHoldingHeart size={15} />
					</button>
					<span className='text-xs text-white mt-2'>{shares} Support</span>
				</div>
			</div>
		</div>
	);
};

export default Reel;
