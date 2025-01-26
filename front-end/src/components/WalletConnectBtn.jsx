import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const WalletConnectBtn = () => {
	const [walletAddress, setWalletAddress] = useState('');
	const navigate = useNavigate();
	const getAptosWallet = () => {
		if ('aptos' in window) {
			return window.aptos;
		} else {
			toast.error('Petra Wallet not found! Please install');
			window.open('https://petra.app/', `_blank`);
		}
	};
	const handleConnect = async () => {
		if (walletAddress) {
			navigator.clipboard
				.writeText(walletAddress)
				.then(() => {
					toast.success('Wallet address copied to clipboard');
				})
				.catch((err) => {
					toast.error('Failed to copy wallet address');
				});
			return;
		}
		const wallet = getAptosWallet();
		try {
			const response = await wallet.connect();

			const account = await wallet.account();
			setWalletAddress(account.address);

			toast.success('Connected to wallet');
			if (!localStorage.getItem('email')) {
				navigate('/auth/details', {
					state: { walletAddress: account.address },
				});
				return;
			}
			navigate('/');
		} catch (error) {
			toast.error('Failed to connect wallet');
		}
	};
	return (
		<div
			onClick={handleConnect}
			className='py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-600 bg-blue-500 w-fit absolute top-4 right-4 text-white transition-all'
		>
			{walletAddress
				? walletAddress.slice(0, 5) + '...' + walletAddress.slice(-3)
				: 'Connect Wallet'}
		</div>
	);
};

export default WalletConnectBtn;
