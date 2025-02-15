import React, { useContext, useState } from "react";
import Logo from "../../assets/freshcart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import HumburgerBotton from "../../assets/NavBar/burger-menu.svg";
import classNames from "classnames";
import { authContext } from "./../../Context/AuthContext";
import { MdOutlineLogin } from "react-icons/md";
import { HiMiniUserPlus } from "react-icons/hi2";
import { VscSignIn } from "react-icons/vsc";
import { CartContext } from "../../Context/CartContext";
import { WishListContext } from "../../Context/WishListContext";
import { JwtContext } from "../../Context/JwtContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userToken, setuserToken } = useContext(authContext);
  const { numCart } = useContext(CartContext);
  const { numWishList } = useContext(WishListContext);
  const [accountBtn, setAccountBtn] = useState(false);
  let { userName, setUserName } = useContext(JwtContext);
  
  const navigate = useNavigate();

  const menuClass = classNames(
    "p-0.5",
    "border",
    "rounded",
    "text-gray-600",
    "border-gray-500",
    "hover:text-gray-800",
    "hover:bg-slate-400/80",
    { "bg-slate-400": isMenuOpen },
  );

  const accountClass = classNames(
    "inline-flex",
    "items-center",
    "rounded-lg",
    "bg-emerald-600",
    "px-5",
    "py-2.5",
    "text-center",
    "text-sm",
    "font-medium",
    "text-white",
    "hover:bg-emerald-800",
    "cursor-pointer",
    { "bg-emerald-800": accountBtn },
  );

  function hundelLogout() {
    localStorage.removeItem("userToken");
    setuserToken(null);
    navigate("/login");
    setIsMenuOpen(false);
  }

  return (
    <>
      <div>
        <nav className="mainNavbar fixed inset-x-0 top-0 z-[9999] min-h-18 border-gray-100 bg-slate-300 font-[EncodeSans]">
          <div className="container mx-auto flex max-w-screen-2xl flex-wrap items-center justify-between p-4">
            {/* Logo */}
            <div className="flex items-center gap-5">
              <NavLink
                to=""
                className="flex items-center space-x-3 rtl:space-x-reverse"
              >
                <img src={Logo} className="h-8" alt="FreshCart-Logo" />
              </NavLink>

              {/* pages for lg Screen and higher */}

              {userToken && (
                <ul className="hidden gap-3 text-slate-800 lg:flex">
                  <li>
                    <NavLink to="/"> Home </NavLink>
                  </li>
                  <li>
                    <NavLink to="/products"> Products </NavLink>
                  </li>
                  <li>
                    <NavLink to="/categories"> Categories </NavLink>
                  </li>
                  <li>
                    <NavLink to="/brands"> Brands </NavLink>
                  </li>
                   
                </ul>
              )}
            </div>

           <div className="right flex items-center justify-between gap-5">
              <div className="icons flex items-center justify-between ">
                <NavLink
                  to="/wishlist"
                  className="group relative cursor-pointer px-3 text-black"
                  title="wishlist"
                >
                  <i className="fas fa-heart text-red-700 transition-opacity duration-300 group-hover:opacity-50"></i>
                  {numWishList > 0 && (
                    <div className="absolute -top-4 -right-1 flex size-5 items-center justify-center rounded-full bg-red-600 p-1 text-center font-normal text-white">
                      {numWishList}
                    </div>
                  )}
                </NavLink>
                <NavLink
                  to="/cart"
                  className="group relative cursor-pointer px-4 text-black"
                  title="cart"
                >
                  <i className="fas fa-cart-shopping lg text-green-700 transition-opacity duration-300 group-hover:opacity-50"></i>
                  {numCart > 0 && (
                    <div className="absolute -top-4 -right-1 flex size-5 items-center justify-center rounded-full bg-emerald-600 p-1 text-center font-normal text-white">
                      {numCart}
                    </div>
                  )}
                </NavLink>
              </div>
              <div className="hidden items-center space-x-6 lg:flex rtl:space-x-reverse">
                {userToken ? (
                  <div className="relative flex flex-col items-center justify-center pe-10">
                    <button
                      onClick={() => setAccountBtn(!accountBtn)}
                      className={accountClass}
                      type="button"
                    >
                      Account
                      <i className="fa-solid fa-angle-down ps-2"></i>
                    </button>
                    {accountBtn && (
                      <div
                        id="dropdownInformation"
                        className="absolute top-12 z-10 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow-sm"
                      >
                        <div className="px-4 py-3 text-center text-sm text-gray-900">
                          <span>Account</span>
                        </div>
                        <ul
                          onClick={() => setAccountBtn(!accountBtn)}
                          className="p-4 text-start"
                        >
                          <li className="p-1">
                            <NavLink to="/myprofile">MyProfile</NavLink>
                          </li>
                          <li className="p-1">
                            <span
                              className="cursor-pointer"
                              onClick={hundelLogout}
                              to=""
                            >
                              Logout
                            </span>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <ul className="flex gap-1">
                    <li className="underline underline-offset-2">
                      <Link to="/login"> Login </Link>
                    </li>
                    <span className="font-semibold">/</span>
                    <li className="underline underline-offset-2">
                      <Link to="/register"> Register </Link>
                    </li>
                  </ul>
                )}
              </div>
            </div>

            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={menuClass}
              >
                <figure>
                  <img src={HumburgerBotton} alt="MenuHumburgerBotton" />
                </figure>
              </button>
            </div>
          </div>
          <div>
            {isMenuOpen && (
              <div className="mobileNavbar bg-slate-300 lg:hidden">
                <ul
                  onClick={() => setIsMenuOpen(false)}
                  className="flex flex-col items-start space-y-5 px-4"
                >
                  <li>
                    <NavLink to="/"> Home </NavLink>
                  </li>
                  <li>
                    <NavLink to="/products"> Products </NavLink>
                  </li>
                  <li>
                    <NavLink to="/categories"> Categories </NavLink>
                  </li>
                  <li>
                    <NavLink to="/brands"> Brands </NavLink>
                  </li>
                  <li>
                    <NavLink to="/cart" className="relative">
                      Cart
                      {numCart > 0 && (
                        <div className="absolute -top-1 -right-6 flex size-5 items-center justify-center rounded-full bg-emerald-600 p-1 text-center font-normal text-white">
                          {numCart}
                        </div>
                      )}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/wishlist" className="relative">
                      Wishlist
                      {numWishList > 0 && (
                        <div className="absolute -top-1 -right-6 flex size-5 items-center justify-center rounded-full bg-emerald-600 p-1 text-center font-normal text-white">
                          {numWishList}
                        </div>
                      )}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/myprofile">My Profile</NavLink>
                  </li>
                  <div className="w-full border-t py-4">
                    {userToken && (
                      <div>
                        <li>
                          <div
                            className="group flex w-[120px] cursor-pointer items-center justify-center gap-2 rounded-full border-1 border-red-400 px-2 py-1.5 transition-all duration-300 hover:bg-red-400"
                            onClick={hundelLogout}
                            to=""
                          >
                            <span
                              className="font-normal"
                              onClick={hundelLogout}
                              to=""
                            >
                              Logout
                            </span>
                            <VscSignIn className="" />
                          </div>
                        </li>
                      </div>
                    )}
                  </div>
                </ul>
                <ul className="flex flex-col justify-center gap-3 px-4 font-semibold">
                  {!userToken && (
                    <>
                      <li
                        onClick={() => setIsMenuOpen(false)}
                        className="flex w-[120px] cursor-pointer items-center justify-center gap-1 rounded-full border border-emerald-600 p-2 hover:bg-emerald-600"
                      >
                        <Link to="/login">Login</Link>
                        <MdOutlineLogin />
                      </li>
                      <li
                        onClick={() => setIsMenuOpen(false)}
                        className="mb-2 flex w-[120px] cursor-pointer items-center justify-center gap-1 rounded-full border border-emerald-600 p-2 transition-all duration-300 hover:bg-emerald-600"
                      >
                        <Link to="/register">Register</Link>
                        <HiMiniUserPlus />
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}
