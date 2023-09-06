import React, { useEffect, useRef } from 'react';

import useWindowSize from '../../hooks/useWindowSize';

const SmoothScroll = ({ children }) => {
	// 1.
	const windowSize = useWindowSize();

	//2.
	const scrollingContainerRef = useRef();

	// 3.
	const data = {
		ease: 0.1,
		current: 0,
		previous: 0,
		rounded: 0,
	};

	// 4.
	useEffect(() => {
		setBodyHeight();
	}, [windowSize, children]);

	const setBodyHeight = () => {
		setTimeout(() => {
			document.body.style.height = `${
				scrollingContainerRef.current.getBoundingClientRect().height
			}px`;
		}, 50);
	};

	// 5.
	useEffect(() => {
		requestAnimationFrame(() => smoothScrollingHandler());
	}, []);

	const smoothScrollingHandler = () => {
		data.current = window.scrollY;
		data.previous += (data.current - data.previous) * data.ease;
		data.rounded = Math.round(data.previous * 100) / 100;

		// Apply the smooth scrolling
		if (scrollingContainerRef.current)
			scrollingContainerRef.current.style.transform = `translateY(-${data.rounded}px)`;

		// Recursive call
		requestAnimationFrame(() => smoothScrollingHandler());
	};

	return (
		<div
			style={{
				position: 'fixed',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				overflow: 'hidden',
			}}>
			<div ref={scrollingContainerRef}>{children}</div>
		</div>
	);
};

export default SmoothScroll;
