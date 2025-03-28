import { useState, useRef, useEffect, useCallback } from 'react';
import Reel from '../components/Reel';
import axios from 'axios';

export const Skeleton = ({ height, width, radius }) => (
	<div
		className={`bg-white/10 rounded-${radius} w-${width} h-${height} animate-pulse`}
	/>
);

const Player = () => {
	const [reelsData, setReelsData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentReel, setCurrentReel] = useState(0);
	const [activeReel, setActiveReel] = useState(null);

	const containerRef = useRef(null);
	const observerRef = useRef(null);
	const reelRefs = useRef([]);

	// Fetch reels from API
	useEffect(() => {
		const fetchReels = async () => {
			try {
				const res = await axios.get(
					import.meta.env.VITE_SERVER_URI + '/api/memes'
				);
				setReelsData(Array.isArray(res.data) ? res.data : []);
			} catch (error) {
				console.error(error);
				toast.error('Failed to fetch reels');
				setReelsData([]);
			} finally {
				setTimeout(() => setLoading(false), 1000);
			}
		};

		fetchReels();
	}, []);

	// Scroll to a specific reel
	const scrollToReel = useCallback((index) => {
		if (reelRefs.current[index]) {
			reelRefs.current[index].scrollIntoView({
				behavior: 'smooth',
				block: 'center',
			});
			setCurrentReel(index);
		}
	}, []);

	// Intersection Observer to track which reel is in view
	useEffect(() => {
		const options = {
			root: containerRef.current,
			rootMargin: '0px',
			threshold: 0.8, // Higher threshold ensures full meme is visible before switching
		};

		observerRef.current = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const index = reelRefs.current.indexOf(entry.target);
					if (index !== -1) {
						setCurrentReel(index);
						setActiveReel(index); // Update active reel
					}
				}
			});
		}, options);

		reelRefs.current.forEach((ref) => {
			if (ref) observerRef.current.observe(ref);
		});

		return () => observerRef.current.disconnect();
	}, [reelsData.length]);

	// Keyboard navigation (Arrow Up/Down)
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === 'ArrowDown' && currentReel < reelsData.length - 1) {
				scrollToReel(currentReel + 1);
			} else if (e.key === 'ArrowUp' && currentReel > 0) {
				scrollToReel(currentReel - 1);
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [currentReel, scrollToReel, reelsData.length]);

	// Skeleton loader
	if (loading) {
		return (
			<div className='relative hide-scrollbar flex flex-col items-center h-[94%] md:w-[30vw] overflow-y-scroll snap-y snap-mandatory scroll-smooth gap-4'>
				{Array.from({ length: 5 }).map((_, index) => (
					<div
						key={index}
						className='w-full h-full flex-shrink-0 border-8 border-transparent'
					>
						<Skeleton height='full' width='full' radius='lg' />
					</div>
				))}
			</div>
		);
	}

	// No memes found message
	if (!loading && reelsData.length === 0) {
		return (
			<div className='flex flex-col justify-center items-center h-[94%] space-y-4'>
				<h1 className='text-lg text-black bg-yellow-400 px-24 py-14 rounded-lg'>
					No Memes 🐵 Found!!!
				</h1>
			</div>
		);
	}

	return (
		<div
			ref={containerRef}
			className='relative h-[90vh] w-screen hide-scrollbar flex items-center md:w-[35vw] overflow-y-auto snap-y snap-mandatory scroll-smooth'
		>
			<div className='w-full h-full flex flex-col'>
				{(Array.isArray(reelsData) ? reelsData : []).map((reel, index) => (
					<div
						key={reel.id || index}
						ref={(el) => (reelRefs.current[index] = el)}
						className={`w-full h-[90vh] snap-center flex items-center mb-2 justify-center transition-all duration-300
							${index === currentReel ? 'scale-100 opacity-100' : 'scale-100 opacity-80'}
						`}
					>
						<Reel
							media={reel.media.link}
							type={reel.media.mediaType}
							title={reel.title}
							description={reel.description}
							likes={reel.likers.length}
							views={reel.views}
							shares={reel.shares}
							likedOrNot={reel.likers.includes(localStorage.getItem('userId'))}
							id={reel._id}
							activeReel={activeReel}
							setActiveReel={setActiveReel}
							creator_wallet={reel.creator.wallet}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default Player;
