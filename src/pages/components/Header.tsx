import { Button } from "@/components/ui/button";
import React, { useState, useRef, useEffect } from "react";
import { Sun, Moon, Settings as SettingsIcon, User, LogOut, ChevronDown, Bell, HelpCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";

function Header() {
  const navigate = useNavigate();
  const { theme, updateTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const themeOptions: { name: "light" | "dark"; icon: any; label: string }[] = [
    { name: "light", icon: Sun, label: "Light" },
    { name: "dark", icon: Moon, label: "Dark" },
  ];

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    setIsDropdownOpen(false);
  };

  const handleProfileClick = () => {
    setIsDropdownOpen(false);
    navigate("/profile");
  };

  const handleSettingsClick = () => {
    setIsDropdownOpen(false);
    navigate("/settings");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 border-gray-200 dark:border-gray-700">
      <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4 lg:px-6">
        {/* Logo / Left Side */}
        <div className="flex items-center">
          <div className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
            <div className="flex items-center space-x-3">
              {/* BachatBox Logo */}
              <svg
                className="h-8 w-8"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="boxGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      className="text-blue-600 dark:text-blue-400"
                      style={{ stopColor: "currentColor" }}
                    />
                    <stop
                      offset="100%"
                      className="text-purple-600 dark:text-purple-400"
                      style={{ stopColor: "currentColor" }}
                    />
                  </linearGradient>
                  <linearGradient
                    id="coinGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" style={{ stopColor: "#F59E0B" }} />
                    <stop offset="100%" style={{ stopColor: "#EF4444" }} />
                  </linearGradient>
                </defs>

                {/* Main box */}
                <rect
                  x="8"
                  y="20"
                  width="32"
                  height="24"
                  rx="4"
                  ry="4"
                  fill="url(#boxGradient)"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-blue-600 dark:text-blue-400"
                />

                {/* Box lid */}
                <rect
                  x="8"
                  y="16"
                  width="32"
                  height="6"
                  rx="4"
                  ry="4"
                  fill="url(#boxGradient)"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-blue-600 dark:text-blue-400"
                />

                {/* Coins */}
                <circle
                  cx="18"
                  cy="32"
                  r="4"
                  fill="url(#coinGradient)"
                  stroke="#D97706"
                  strokeWidth="0.5"
                />
                <circle
                  cx="30"
                  cy="32"
                  r="4"
                  fill="url(#coinGradient)"
                  stroke="#D97706"
                  strokeWidth="0.5"
                />
                <circle
                  cx="24"
                  y="26"
                  r="4"
                  fill="url(#coinGradient)"
                  stroke="#D97706"
                  strokeWidth="0.5"
                />

                {/* Dollar signs */}
                <text
                  x="18"
                  y="35"
                  textAnchor="middle"
                  fill="white"
                  fontSize="6"
                  fontWeight="bold"
                  fontFamily="Arial, sans-serif"
                >
                  $
                </text>
                <text
                  x="30"
                  y="35"
                  textAnchor="middle"
                  fill="white"
                  fontSize="6"
                  fontWeight="bold"
                  fontFamily="Arial, sans-serif"
                >
                  $
                </text>
                <text
                  x="24"
                  y="29"
                  textAnchor="middle"
                  fill="white"
                  fontSize="6"
                  fontWeight="bold"
                  fontFamily="Arial, sans-serif"
                >
                  $
                </text>

                {/* Box handle */}
                <rect
                  x="20"
                  y="14"
                  width="8"
                  height="3"
                  rx="1.5"
                  ry="1.5"
                  fill="currentColor"
                  className="text-blue-700 dark:text-blue-300"
                />
              </svg>

              <Link to="/home">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  BachatBox
                </h1>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Theme Toggle */}
          <div className="flex items-center space-x-0.5 sm:space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5 sm:p-1">
            {themeOptions.map((option) => (
              <Button
                key={option.name}
                variant={theme === option.name ? "default" : "ghost"}
                size="sm"
                onClick={() => updateTheme(option.name)}
                className={`h-7 w-7 sm:h-8 sm:w-8 p-0 transition-all duration-200 ${theme === option.name
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                  }`}
                aria-label={`Switch to ${option.label} theme`}
              >
                <option.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Button>
            ))}
          </div>

          {/* Notifications - Hidden on mobile */}
          <Button
            variant="ghost"
            size="sm"
            className="hidden md:flex h-8 w-8 p-0 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 relative"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            {/* Notification badge */}
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
          </Button>

          {/* User Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <Button
              variant="ghost"
              onClick={toggleDropdown}
              className="flex items-center space-x-2 h-8 px-2 sm:px-3 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
              aria-label="User menu"
            >
              {/* User Avatar */}
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-6 w-6 sm:h-7 sm:w-7 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700"
                />
                <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 bg-green-500 rounded-full border border-white dark:border-gray-900"></div>
              </div>

              {/* User Name - Hidden on mobile */}
              <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300 max-w-24 truncate">
                {user.name.split(" ")[0]}
              </span>

              {/* Dropdown Arrow */}
              <ChevronDown
                className={`h-3 w-3 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""
                  }`}
              />
            </Button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 sm:w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                {/* User Info */}
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-1">
                  <button
                    onClick={handleProfileClick}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <User className="h-4 w-4 mr-3" />
                    View Profile
                  </button>

                  <Link
                    to="/settings"
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <SettingsIcon className="h-4 w-4 mr-3" />
                    Settings
                  </Link>

                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <HelpCircle className="h-4 w-4 mr-3" />
                    Help & Support
                  </button>
                </div>

                {/* Logout */}
                <div className="border-t border-gray-200 dark:border-gray-700 py-1">
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
