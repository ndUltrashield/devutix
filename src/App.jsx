import React, { useState, useEffect } from "react";
import "./App.css";
import { utilities } from "./components";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUtility, setSelectedUtility] = useState(null);
  const [filteredUtilities, setFilteredUtilities] = useState(utilities);

  useEffect(() => {
    // Filter utilities based on search term
    if (searchTerm) {
      const filtered = utilities.filter(
        (utility) =>
          utility.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          utility.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUtilities(filtered);
    } else {
      setFilteredUtilities(utilities);
    }
  }, [searchTerm]);

  useEffect(() => {
    // Handle CMD+K shortcut
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        document.getElementById("search-input").focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const openUtility = (utility) => {
    setSelectedUtility(utility);
  };

  const closeUtility = () => {
    setSelectedUtility(null);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "dark bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Header */}
      <header
        className={`${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } border-b transition-colors duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full"></div>
              </div>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  darkMode
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {darkMode ? "🌞" : "🌙"}
              </button>

              <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200">
                Button?
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <span className="text-white text-2xl">YO</span>
            </div>
          </div>
          <h1
            className={`text-4xl font-bold mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            DevUtiliX
          </h1>
          <p
            className={`text-lg mb-8 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Fast, free, open source, ad-free tools.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <input
                id="search-input"
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500"
                } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50`}
              />
              <div
                className={`absolute right-3 top-3 text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                CMD + K
              </div>
            </div>
          </div>

          {/* Utilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUtilities.map((utility) => (
              <div
                key={utility.id}
                className={`p-6 rounded-xl border transition-all duration-200 hover:shadow-lg ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 hover:border-gray-600"
                    : "bg-white border-gray-200 hover:border-gray-300"
                }`}
              >
                <h3
                  className={`text-xl font-semibold mb-3 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {utility.title}
                </h3>
                <p
                  className={`text-sm mb-4 ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {utility.description}
                </p>
                <button
                  onClick={() => openUtility(utility)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    darkMode
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Try it
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedUtility && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
          onClick={closeUtility}
        >
          <div
            className={`max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-xl ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`sticky top-0 p-6 border-b ${
                darkMode
                  ? "border-gray-700 bg-gray-800"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div className="flex justify-between items-center">
                <h2
                  className={`text-2xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {selectedUtility.title}
                </h2>
                <button
                  onClick={closeUtility}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    darkMode
                      ? "text-gray-400 hover:text-white hover:bg-gray-700"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <selectedUtility.component darkMode={darkMode} />
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600 dark:text-gray-300">
            <p className="text-sm">
              Built by <b>Nirdhum</b> with ❤️ for developers. All utilities run
              client-side for privacy and speed.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
