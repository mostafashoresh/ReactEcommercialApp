import React from "react";
import { Outlet, Link , use, useLocation, useParams } from "react-router-dom";
import { useState, useRef } from "react";
import {
  HiOutlineShoppingBag,
  HiOutlineUser,
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineBars3BottomRight,
  HiXMark,
} from "react-icons/hi2";

import "./Navigation.styles.scss";

const Navigation = () => {
  const [theme, setTheme] = useState("light");
  const [close, setClose] = useState(true);

  const ChangeTheme = (input) => {
    const html = document.getElementById("html-tag");
    html.setAttribute("data-theme", input);
    setTheme(input);
  };

  const MobileMenuContainer = useRef();

  const CloseWindowAfterResize = () => {
    const windowWith = window.innerWidth;
    if (windowWith > "642") {
      MobileMenuContainer.current.style.display = "none";
      setClose(true);
    }
  };

  window.addEventListener("resize", CloseWindowAfterResize);

  const ToggleMenuDisplay = () => {
    if (close) {
      MobileMenuContainer.current.style.display = "block";
      setClose(false);
    } else {
      MobileMenuContainer.current.style.display = "none";
      setClose(true);
    }
  };

  const location = useLocation() ; 
  const param = useParams() ; 



  return (
    <div>
      <div className="navbar bg-base-100 flex flex-row justify-between shadow-md py-3 mb-3">
        <div className="flex">
          <div>
            <Link to="/" className="normal-case text-xl font-bold">
              RealShop
            </Link>
          </div>
          <div className="dropdown dropdown-start">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="indicator">
                <HiOutlineShoppingBag
                  style={{
                    height: "1.5rem",
                    width: "1.5rem",
                    strokeWidth: "2",
                  }}
                />

                <span className="badge badge-sm indicator-item">8</span>
              </div>
            </label>
            <div
              tabIndex={0}
              className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg">8 Items</span>
                <span className="text-info">Subtotal: $999</span>
                <div className="card-actions">
                  <Link className="btn btn-primary btn-block" to="/card">
                    View cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button className="btn btn-ghost btn-circle">
              <Link to="/sign-in">
                <HiOutlineUser
                  style={{
                    height: "1.5rem",
                    width: "1.5rem",
                    strokeWidth: "2",
                  }}
                />
              </Link>
            </button>
          </div>
          <div>
            {theme === "dark" ? (
              <button
                className="btn btn-ghost btn-circle"
                onClick={() => ChangeTheme("light")}
              >
                <HiOutlineMoon
                  style={{
                    height: "1.5rem",
                    width: "1.5rem",
                    strokeWidth: "2",
                  }}
                />
              </button>
            ) : (
              <button
                className="btn btn-ghost btn-circle"
                onClick={() => ChangeTheme("dark")}
              >
                <HiOutlineSun
                  style={{
                    height: "1.5rem",
                    width: "1.5rem",
                    strokeWidth: "2",
                  }}
                />
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-row-reverse max-[640px]:hidden">
          <div className="menu flex flex-row pr-3 ">
            <Link className="px-2 normal-case text-l font-bold" to="/">
              Home
            </Link>
            <Link className="px-2 normal-case text-l font-bold" to="/shop">
              SHOP
            </Link>
            <Link className="pl-2 normal-case text-l font-bold" to="/dashboard">
              Dashboard
            </Link>
          </div>
        </div>
        <div className=" min-[641px]:hidden">
          <a className="btn btn-ghost" href="#menu"  onClick={ToggleMenuDisplay}>
            <HiOutlineBars3BottomRight
              style={{ strokeWidth: "3", height: "1.5rem", width: "1.5rem" }}
            />
          </a>
        </div>
      </div>
      <div className="mobile-menu-container" ref={MobileMenuContainer}>
        <div className="mobile-menu bg-neutral">
          <a className="btn absolute top-0 right-0" onClick={ToggleMenuDisplay}>
            <HiXMark
              className="text-accent"
              style={{ strokeWidth: "3", height: "1.5rem", width: "1.5rem" }}
            />
          </a>
          <div className="flex flex-col absolute top-20 left-5">
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/dashboard">Dashboard</Link>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Navigation;
