import Link from "next/link";
import { IoClose } from "react-icons/io5";




const MobileNav = ({ setNavMobile }) => {
  return (
    <nav className="block md:hidden bg-black text-gray-300 w-full h-full">
      <IoClose
        onClick={() => setNavMobile(false)}
        className="text-3xl absolute right-6 top-6 cursor-pointer "
      />

      <ul className="flex flex-col justify-center space-y-8 h-full items-center capitalize font-secondary">
        <Link href="/" onClick={() => setNavMobile(false)}>
          <li className="text-md">home</li>
        </Link>
        <Link href="/meals" onClick={() => setNavMobile(false)}>
          <li className="text-md">meals</li>
        </Link>

        <Link href="/" onClick={() => setNavMobile(false)}>
          <li className="text-md">drinks</li>
        </Link>
        <Link href="/savedmeals" onClick={() => setNavMobile(false)}>
          <li className="text-md">saved meals</li>
        </Link>

        <Link href="/" onClick={() => setNavMobile(false)}>
          <li className="text-md">contact us</li>
        </Link>
      </ul>
    </nav>
  );
};

export default MobileNav;
