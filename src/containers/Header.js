import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import BellIcon from "@heroicons/react/24/outline/BellIcon";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import { openRightDrawer } from "../features/common/rightDrawerSlice";
import { RIGHT_DRAWER_TYPES } from "../utils/globalConstantUtil";
import { themeChange } from "theme-change";
import MoonIcon from "@heroicons/react/24/outline/MoonIcon";
import SunIcon from "@heroicons/react/24/outline/SunIcon";
import { useTranslation } from "react-i18next";

function Header() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { noOfNotifications, pageTitle } = useSelector((state) => state.header);
  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem("theme")
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

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
  }, [currentTheme]);

  const openNotification = () => {
    dispatch(
      openRightDrawer({
        header: "Notifications",
        bodyType: RIGHT_DRAWER_TYPES.NOTIFICATION,
      })
    );
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close the mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "ar" : "en");
  };

  return (
    <div className="navbar sticky top-0 bg-base-100 z-10 shadow-md">
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
          <Link className="text-xl font-bold text-black ml-10" to="/app/Home">
            EGR System
          </Link>

          {/* Mobile Menu Button (Only visible when menu is closed) */}
          {!isMobileMenuOpen && (
            <button
              onClick={toggleMobileMenu}
              className="block lg:hidden text-[#872341] focus:outline-none"
            >
              <div className="space-y-1">
                <span className="block w-6 h-0.5 bg-black"></span>
                <span className="block w-6 h-0.5 bg-black"></span>
                <span className="block w-6 h-0.5 bg-black"></span>
              </div>
            </button>
          )}

          {/* Menu Links */}
          <div
            ref={mobileMenuRef}
            className={`lg:flex items-center w-full lg:w-auto ${
              isMobileMenuOpen ? "block mt-60 flex justify-center" : "hidden"
            }`}
          >
            <ul className="flex flex-col lg:flex-row lg:space-x-6 text-black mt-4 lg:mt-0">
              <li>
                <Link
                  to="/app/Home"
                  className="block py-2 hover:text-[#BE3144]"
                >
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link
                  to="/app/profile"
                  className="block py-2 hover:text-[#BE3144]"
                >
                  {t("profile")}
                </Link>
              </li>
              <li>
                <Link
                  to="/app/provider"
                  className="block py-2 hover:text-[#BE3144]"
                >
                  {t("providers2")}
                </Link>
              </li>
              <li>
                <a
                  href="/app/digitalwallet"
                  className="block py-2 hover:text-[#BE3144]"
                >
                  {t("digital_wallet")}
                </a>
              </li>
              <li>
                <a
                  href="/app/documents"
                  className="block py-2 hover:text-[#BE3144]"
                >
                  {t("documents")}
                </a>
              </li>
              {/* <li>
                <Link
                  to="/app/settings-profile"
                  className="block py-2 hover:text-[#BE3144]"
                >
                  {t("settings")}
                </Link>
              </li> */}
              <li>
                <Link to="/login" className="block py-2 hover:text-[#BE3144]">
                  {t("login")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex-none">
          <button
            className="btn btn-ghost mr-2 btn-circle"
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

        {/* Language Switch Button */}
        <button onClick={toggleLanguage} className="text-black mr-6">
          {i18n.language === "en" ? "العربية" : "English"}
        </button>
      </nav>
    </div>
  );
}

export default Header;
