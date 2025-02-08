import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import BellIcon from "@heroicons/react/24/outline/BellIcon";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import { openRightDrawer } from "../features/common/rightDrawerSlice";
import { RIGHT_DRAWER_TYPES } from "../utils/globalConstantUtil";
import { themeChange } from "theme-change";
import MoonIcon from "@heroicons/react/24/outline/MoonIcon";
import SunIcon from "@heroicons/react/24/outline/SunIcon";

function Header() {
  const dispatch = useDispatch();
  const { noOfNotifications, pageTitle } = useSelector((state) => state.header);
  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem("theme")
  );

  useEffect(() => {
    themeChange(false);
    if (currentTheme === null) {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        setCurrentTheme("dark");
      } else {
        setCurrentTheme("light");
      }
    }
  }, []);

  const openNotification = () => {
    dispatch(
      openRightDrawer({
        header: "Notifications",
        bodyType: RIGHT_DRAWER_TYPES.NOTIFICATION,
      })
    );
  };

  return (
    <div className="navbar sticky top-0 bg-base-100 z-10 shadow-md ">
      <div className="flex-1">
        <label
          htmlFor="left-sidebar-drawer"
          className="btn btn-primary drawer-button lg:hidden"
        >
          <Bars3Icon className="h-5 inline-block w-5" />
        </label>
      </div>
      <nav className="bg-white fixed w-full shadow-md z-50 mt-1">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Brand Logo */}
          <Link
            className="text-xl font-bold text-[#872341] ml-10"
            to="/app/Home"
          >
            EGR System
          </Link>

          {/* Mobile Menu Button */}
          <button className="block lg:hidden text-purple-900 focus:outline-none">
            <div className="space-y-1">
              <span className="block w-6 h-0.5 bg-purple-900"></span>
              <span className="block w-6 h-0.5 bg-purple-900"></span>
              <span className="block w-6 h-0.5 bg-purple-900"></span>
            </div>
          </button>

          {/* Menu Links */}
          <div className={`lg:flex items-center  w-full lg:w-auto`}>
            <ul className="flex flex-col lg:flex-row lg:space-x-6 text-[#872341] mt-4 lg:mt-0">
              <li>
                <Link
                  to="/app/Home"
                  className="block py-2 hover:text-[#BE3144]"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/app/profile"
                  className="block py-2 hover:text-[#BE3144]"
                >
                  Profile
                </Link>
              </li>
              <li>
                <a href="#features" className="block py-2 hover:text-[#BE3144]">
                  Digital Wallet
                </a>
              </li>
              <li>
                <a href="#about" className="block py-2 hover:text-[#BE3144]">
                  Documents
                </a>
              </li>
              <li>
                <Link
                  to="/app/settings-profile"
                  className="block py-2 hover:text-[#BE3144]"
                >
                  Settings
                </Link>
              </li>
              <li>
                <Link to="/login" className="block py-2 hover:text-[#BE3144]">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex-none">
          <button
            className="btn btn-ghost mr-6 btn-circle"
            onClick={openNotification}
          >
            <div className="indicator">
              <BellIcon className="h-6 w-6" />
              {noOfNotifications > 0 ? (
                <span className="indicator-item badge bg-[#E17564] badge-sm">
                  {noOfNotifications}
                </span>
              ) : null}
            </div>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Header;
