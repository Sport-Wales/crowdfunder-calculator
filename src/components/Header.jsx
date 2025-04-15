
// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { Search } from 'lucide-react';

const Header = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const isWelsh = location.pathname.includes('/cy');
	const [togglePosition, setTogglePosition] = useState(isWelsh ? 'right' : 'left');

	useEffect(() => {
		setTogglePosition(isWelsh ? 'right' : 'left');
	}, [isWelsh]);

	const toggleLanguage = () => {
		const nextPath = isWelsh ? '/en' : '/cy';
		navigate(nextPath);
	};

	return (
		<nav className="sw-bg-red h-24 border-b border-gray-200">
			<div className="container mx-auto px-8 h-full">
				<div className="flex justify-between items-center h-full">
					{/* Logo */}
					<a href="https://www.sport.wales/">
						<img
							src="/sport_wales_logo_white.png"
							alt="Sport Wales Logo"
							className="h-16 w-auto sm:h-20 md:h-24"
						/>
					</a>

					{/* Title */}
					<div className="flex-1 flex justify-center">
						<span className="text-white font-extrabold text-2xl sm:text-3xl text-center">
							{isWelsh ? 'Cyfrifiannell Cyllido Torfol' : 'Crowdfunder Calculator'}
						</span>
					</div>
					

					{/* Toggle Box — full height */}
					<a
						href="https://www.sport.wales/search/"
						className="group h-full px-4 flex items-center hover:bg-[--color-sw-yellow] rounded-sm cursor-pointer"
						style={{ transform: 'skewX(-7deg)' }}
					>
						<Search className="text-white transition-colors group-hover:text-black mr-2" />
						
					</a>

					<div className="bg-[--color-sw-blue] h-full px-6 flex items-center "
					     style={{ transform: 'skewX(-7deg)', borderRadius: '4px' }}
					>
						<span className="mr-3 font-bold text-white">English</span>

						{/* Toggle Switch */}
						<div
							onClick={toggleLanguage}
							className="relative w-14 h-7 px-2 bg-[#5c8193]   cursor-pointer transition-all duration-300"
						>
							<div
								className={
									'absolute top-1 w-6 h-5   bg-[--color-sw-blue] transition-all duration-300 ' +
									(togglePosition === 'left' ? 'left-1' : 'left-7')
								}
							/>
						</div>

						<span className="ml-3 font-bold text-white">Cymraeg</span>
					</div>
					
				</div>
			</div>
		</nav>

	);
};

export default Header;
