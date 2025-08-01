"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n-navigation";
import LanguageDropdown from "./LanguageDropdown";
import { HiMenu, HiX, HiMoon, HiSun } from "react-icons/hi";
import { useTheme } from "../hooks/useTheme";
import { usePathname } from "next/navigation";

const Header = () => {
  const t = useTranslations("common");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Object array for navigation items
  const navItems = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/about" },
    { name: "Use Cases", link: "/usecases" },
    { name: "Statistics", link: "/statistics" },
    { name: "Upload", link: "/upload" },
  ];

  return (
    <header className="bg-white shadow-sm dark:bg-black">
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
        rel="stylesheet"
      ></link>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <img
                className="h-20 w-auto"
                src="/img/new-logo-green.png"
                alt="Logo"
              />
            </Link>
            {/* Hamburger Menu Icon */}
            <div className="flex lg:hidden ml-auto">
              <button
                onClick={toggleMenu}
                className="text-green-600 hover:text-green-900 focus:outline-none focus:text-green-900"
              >
                {isMenuOpen ? (
                  <HiX className="h-6 w-6" />
                ) : (
                  <HiMenu className="h-6 w-6" />
                )}
              </button>
            </div>
            {/* Menu Items */}
            <nav
              className={`ml-10 space-x-4 hidden lg:flex ${
                isMenuOpen ? "block" : "hidden"
              } lg:block`}
            >
              {navItems.map((item) => {
                const isActive = pathname === `/en${item.link === "/" ? "" : item.link}`;

                return (
                  <Link
                    key={item.name}
                    href={item.link}
                    className={`px-3 py-2 rounded-md text-sm font-medium
                      ${isActive
                        ? 'text-blue-600 font-bold'
                        : 'text-black hover:text-green-900 dark:text-gray-200 dark:hover:text-green-300 hover:underline'
                      }`}
                  >
                    {t(item.name)}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Dark Mode"
              className="p-1 rounded focus:outline-none"
            >
              {theme === "dark" ? (
                <HiSun className="mr-4 h-5 w-5 text-white" />
              ) : (
                <HiMoon className="mr-4 h-5 w-5 text-black" />
              )}
            </button>

            <LanguageDropdown />
            <div className="hidden lg:flex">
              <Link
                href="/signup"
                className=" bg-white text-green-600 hover:bg-gray-50 border border-green-600 px-4 py-2 rounded-xl text-sm font-medium"
              >
                {t("Sign Up")}
              </Link>
              <Link
                href="/login"
                className="ml-4 bg-white text-green-600 hover:bg-gray-50 border border-green-600 px-4 py-2 rounded-xl text-sm font-medium"
              >
                {t("Log In")}
              </Link>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <nav className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.link}
                  className="block text-green-600 hover:text-green-900 px-3 py-2 rounded-md text-base font-medium"
                >
                  {t(item.name)}
                </Link>
              ))}
              {/* Add Sign Up and Log In buttons to mobile menu */}
              <Link
                href="/signup"
                className="block text-green-600 hover:text-green-900 px-3 py-2 rounded-md text-base font-medium"
              >
                {t("Sign Up")}
              </Link>
              <Link
                href="/login"
                className="block text-green-600 hover:text-green-900 px-3 py-2 rounded-md text-base font-medium"
              >
                {t("Log In")}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;