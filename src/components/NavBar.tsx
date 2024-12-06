import LanguageSelector from "./LanguageSelector";
import { AuthStatus } from "../features/Auth/Components/AuthStatus";
import { Link } from "react-router-dom";
import { useState } from "react";
import { HamburgIcon } from "./icons/HamburgIcon";
import { CartQuantity } from "../features/cart/components/CartQuantity";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleToggleNavBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="bg-gray-100 border-gray-200 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex justify-center gap-4">
            <h1 className="self-center text-2xl font-semibold whitespace-nowrap text-black">
              E-commerce
            </h1>
          </Link>

          <div className="flex md:order-2">
            <div className="relative  hidden md:flex justify-center gap-4 ">
              <CartQuantity />
              <AuthStatus />
              <LanguageSelector />
            </div>
            <button
              onClick={handleToggleNavBar}
              data-collapse-toggle="navbar-search"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-search"
              aria-expanded="false"
            >
              <HamburgIcon />
            </button>
          </div>
          <div
            className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
              isOpen ? "block " : "hidden"
            }`}
            id="navbar-search"
          >
            <div className="relative mt-3 flex flex-col md:hidden items-end gap-4">
              <CartQuantity />
              <AuthStatus />
              <LanguageSelector />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
