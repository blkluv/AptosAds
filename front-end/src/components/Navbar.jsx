import { Link } from "react-router-dom";
import WalletConnectBtn from "./WalletConnectBtn";
import { FaUpload } from "react-icons/fa6";
import { FaBarsStaggered } from "react-icons/fa6";
import { User } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="px-5 primary-font max-md:px-1 flex backdrop-blur-lg items-center h-[10vh] justify-between fixed top-0 left-0 right-0 z-10 border-b-2 border-yellow-500">
      <Link to={"/"} className="flex items-center gap-2 p-2">
        <img
          width={50}
          src="https://cdn.dorahacks.io/static/files/194a1cc81977f3c2a920ad645e3bc8c7.png@128h.webp"
          alt="logo"
        />
        <div className="flex">
          <h1 className="text-2xl max-md:text-lg">MEME</h1>
          <h1 className="text-2xl text-yellow-400 max-md:text-lg">BET</h1>
        </div>
      </Link>
      <div className="items-center hidden gap-4 md:flex max-md:gap-2">
        <Link
          to={"/list"}
          className="text-yellow-400 max-md:text-sm max-md:text-px-1 hover:bg-yellow-500 hover:border-none hover:text-black flex items-baseline gap-2 max-md:gap-1 text-lg border-2 border-yellow-400 rounded-lg py-1.5 px-4"
        >
          <FaUpload />
          Upload
        </Link>
        <WalletConnectBtn />
        <Link
          to={"/dashboard"}
          className="text-yellow-400 max-md:text-sm max-md:text-px-1 hover:bg-yellow-500 hover:border-transparent hover:text-black flex items-baseline gap-2 max-md:gap-1 text-lg border-2 border-yellow-400 rounded-lg py-1.5 px-4"
        >
          <User />
        </Link>
      </div>

	  <div className="dropdown md:hidden dropdown-bottom absolute right-[20px]">
	  <label tabIndex={0} className="btn btn-ghost">
          <FaBarsStaggered size={24} className="text-yellow-400" />
        </label>
        <div
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 flex flex-col gap-3 items-center rounded-box w-52 absolute top-[20px] right-[0px]"
        >
          <div className="flex justify-center w-full">
            <Link
              to={"/list"}
              className="text-yellow-400 hover:bg-slate-100   hover:border-none hover:text-black flex items-baseline justify-center w-full gap-2 max-md:gap-1 text-lg border-2 border-yellow-400 rounded-lg py-1.5 px-4"
            >
              <FaUpload />
              Upload
            </Link>
          </div>
          <div className="flex justify-center w-full">
            <WalletConnectBtn />
          </div>
          <div className="flex justify-center w-full">
            <Link
              to={"/dashboard"}
              className="text-yellow-400 hover:bg-slate-100   hover:border-none hover:text-black flex items-baseline justify-center w-full gap-2 max-md:gap-1 text-lg border-2 border-yellow-400 rounded-lg py-1.5 px-4"
            >
              <User />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
