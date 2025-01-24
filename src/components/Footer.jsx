import React from 'react';
import { useLocation } from 'react-router-dom';


const Footer = () => {
	const isWelsh = useLocation().pathname.includes('/cy');

	const footerContent = () => {
		if (isWelsh) {
			return ' Chwaraeon Cymru. Cedwir pob hawl.';
		} else {
			return ' Sport Wales Digital. All rights reserved.';
		}
	};

	return (
		<footer className="bg-gray-800 text-white py-8">
			<div className="max-w-screen-xl mx-auto px-4">
				<div className="text-center">
					<p>© {new Date().getFullYear()} {footerContent()}</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;