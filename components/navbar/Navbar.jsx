import Link from "next/link";


const Navbar = () => {
  return (
    <div className="capitalize hidden md:flex">
      <ul className="flex items-center space-x-12 text-white">
        <li >
          <Link className="cursor-pointer"  href="/">home</Link>
        </li>
        <li>
          <Link href="/meals">Meals</Link>
        </li>
        <li>
          <Link href="/">Drinks</Link>
        </li>
        <li>
          <Link href="/savedmeals">Saved food</Link>
        </li>
        <li>
          <Link href="/contact">contact us</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
