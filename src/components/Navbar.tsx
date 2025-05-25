import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const currentLang = i18n.language;

  const languages = [
    { code: "en", label: "🇺🇸" },
    { code: "mm", label: "🇲🇲" },
  ];

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setLangMenuOpen(false);
  };

  return (
    <nav className="bg-green-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <h1 className="text-2xl font-bold tracking-wide">{t("appTitle")}</h1>

          {/* Hamburger menu button */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                <FaTimes className="text-2xl mr-2" />
              ) : (
                <FaBars className="text-2xl mr-2" />
              )}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 text-lg font-semibold items-center">
            <Link to="/" className="hover:text-gray-300 transition">
              {t("home")}
            </Link>
            <Link to="/notes" className="hover:text-gray-300 transition">
              {t("notes")}
            </Link>

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center justify-center px-3 py-1 rounded-md font-medium border border-green-300 shadow hover:bg-green-800 transition"
              >
                {languages.find((l) => l.code === currentLang)?.label || "🇺🇸"}
                <FaChevronDown className="ml-2" />
              </button>

              {langMenuOpen && (
                <ul className="absolute right-0 z-10 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg">
                  {languages.map((lang) => (
                    <li
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className="px-4 py-2 cursor-pointer hover:bg-green-100 text-green-800 transition"
                    >
                      {lang.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
       {menuOpen && (
        <div className="md:hidden flex flex-row justify-between items-center mt-4 text-lg font-semibold space-x-4 relative pb-4">
          <Link
            to="/"
            className="hover:text-gray-300 transition"
            onClick={() => setMenuOpen(false)}
          >
            {t("home")}
          </Link>

          <Link
            to="/notes"
            className="hover:text-gray-300 transition"
            onClick={() => setMenuOpen(false)}
          >
            {t("notes")}
          </Link>

          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center px-3 py-1 rounded-md font-medium border border-green-300 shadow hover:bg-green-800 transition"
            >
              {languages.find((l) => l.code === currentLang)?.label}
              <FaChevronDown className="ml-2" />
            </button>

            {langMenuOpen && (
              <ul className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                {languages.map((lang) => (
                  <li
                    key={lang.code}
                    onClick={() => {
                      handleLanguageChange(lang.code);
                      setMenuOpen(false);
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-green-100 text-green-800 transition"
                  >
                    {lang.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
      </div>
    </nav>
  );
};

export default Navbar;
