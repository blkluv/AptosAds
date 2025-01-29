import { Link } from 'react-router-dom';
import WalletConnectBtn from './WalletConnectBtn';
import { FaUpload } from 'react-icons/fa6';

const Navbar = () => {
	return (
		<nav className='px-5 max-md:px-1 flex backdrop-blur-lg items-center justify-between fixed top-0 left-0 right-0 z-10 border-b-2 border-yellow-500'>
			<Link to={'/'} className='flex items-center gap-2 p-2'>
				<img
					width={50}
					src='https://cdn.dorahacks.io/static/files/194a1cc81977f3c2a920ad645e3bc8c7.png@128h.webp'
					alt='logo'
				/>
				<div className='flex'>
					<h1 className='text-2xl max-md:text-lg'>Aptos</h1>
					<h1 className='text-2xl max-md:text-lg text-yellow-400'>Odds</h1>
				</div>
			</Link>
			<div className='flex items-center gap-4'>
				<Link
					to={'/list'}
					className='text-yellow-400 max-md:text-sm max-md:text-px-1 hover:bg-yellow-500 hover:border-none hover:text-black flex items-baseline gap-2 text-lg border-2 border-yellow-400 rounded-lg py-1.5 px-4'
				>
					<FaUpload />
					Upload
				</Link>
				<WalletConnectBtn />
			</div>
		</nav>
	);
};

export default Navbar;
