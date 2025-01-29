import React, { useState, useRef, useEffect, useCallback } from 'react';
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

	useEffect(() => {
		const fetchReels = async () => {
			try {
				const res = await axios.get(
					import.meta.env.VITE_SERVER_URI + '/api/memes'
				);
				setReelsData(res.data);
			} catch (error) {
				console.error(error);
				toast.error('Failed to fetch reels');
			} finally {
				setTimeout(() => {
					setLoading(false);
				}, 1000);
			}
		};

		fetchReels();
	}, []);

	const [currentReel, setCurrentReel] = useState(0);
	const containerRef = useRef(null);
	const observerRef = useRef(null);
	const reelRefs = useRef([]);

	// Dynamic height calculation
	const calculateReelHeight = useCallback(() => {
		return window.innerHeight;
	}, []);

	// Scroll to specific reel
	const scrollToReel = useCallback((index) => {
		if (reelRefs.current[index]) {
			reelRefs.current[index].scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
			setCurrentReel(index);
		}
	}, []);

	// Intersection Observer setup
	useEffect(() => {
		const options = {
			root: containerRef.current,
			rootMargin: '0px',
			threshold: 0.5,
		};

		observerRef.current = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const index = reelRefs.current.indexOf(entry.target);
					if (index !== -1) {
						setCurrentReel(index);
					}
				}
			});
		}, options);

		// Observe reel elements
		reelRefs.current.forEach((ref) => {
			if (ref) observerRef.current.observe(ref);
		});

		return () => {
			observerRef.current.disconnect();
		};
	}, [reelsData.length]);

	// Keyboard navigation
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
			className='relative hide-scrollbar flex items-center rounded-lg md:w-[30vw] overflow-y-scroll snap-y snap-mandatory scroll-smooth'
		>
			<div className='w-full h-full flex flex-col'>
				{reelsData.map((reel, index) => (
					<div
						key={reel.id || index}
						ref={(el) => (reelRefs.current[index] = el)}
						className={`
              w-full snap-start transition-all duration-300 
              ${
								index === currentReel
									? 'scale-100 opacity-100'
									: 'scale-90 opacity-70'
							}
            `}
					>
						<Reel
							media={reel.media.link}
							title={reel.title}
							description={reel.description}
							likes={reel.likers.length}
							views={reel.views}
							shares={reel.shares}
							likedOrNot={reel.likers.includes(localStorage.getItem('userId'))}
							id={reel._id}
						/>
					</div>
				))}
			</div>

			{/* Optional Navigation Indicators */}
			<div className='fixed right-4 top-1/2 transform -translate-y-1/2 space-y-2'>
				{reelsData.map((_, index) => (
					<div
						key={index}
						onClick={() => scrollToReel(index)}
						className={`
              w-3 h-3 rounded-full cursor-pointer
              ${
								index === currentReel
									? 'bg-blue-500'
									: 'bg-gray-300 hover:bg-gray-400'
							}
            `}
					/>
				))}
			</div>
		</div>
	);
};

export default Player;
