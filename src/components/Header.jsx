// src/components/Header.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
	const navigate = useNavigate();
	const isWelsh = useLocation().pathname.includes('/cy');

	const toggleLanguage = () => {
		if (isWelsh) {
			navigate('/en');
		} else {
			navigate('/cy');
		}
	};

	return (
		<nav className="sw-bg-red py-4 border-b border-gray-200">
			<div className="mx-auto px-8 sm:px-8 lg:px-1">
				<div className="flex px-10 justify-between h-16">
					<div className="flex items-stretch space-x-8">
						<div className="flex-shrink-0 flex items-center space-x-3">
							<a href="https://www.sport.wales/">
								<img src="/sport_wales_logo_white.png" alt="Sport Wales Logo" className="h-12 w-auto sm:h-16 md:h-20 lg:h-24" />
							</a>
						</div>

						<div className="hidden md:flex items-center space-x-8">
							<span className="text-m font-semibold text-white px-1">
								{isWelsh ? 'Cyfrifiannell Cyllido Torfol' : 'Crowdfunder Calculator'}
							</span>
						</div>
					</div>

					<div className="flex items-center">
						<button
							onClick={toggleLanguage}
							className="px-4 py-2 bg-[--color-sw-blue] text-white rounded-lg hover:bg-white hover:text-black transition-opacity text-sm font-semibold"
						>
							{isWelsh ? 'English' : 'Cymraeg'}
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Header;