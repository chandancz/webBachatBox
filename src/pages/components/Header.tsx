import { Button } from "@/components/ui/button";
import React, { useEffect, useState, useContext } from "react";
import { Sun, Moon, Monitor, User, LogOut, LogIn, Settings as SettingsIcon } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";

function Header() {
  const [theme, setTheme] = useState("system");
  const themeOptions = [
    { name: "light", icon: Sun, label: "Light" },
    { name: "dark", icon: Moon, label: "Dark" },
    { name: "system", icon: Monitor, label: "System" },
  ];
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Theme management
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "system";
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (selectedTheme) => {
    const root = document.documentElement;

    if (selectedTheme === "system") {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      root.classList.toggle("dark", systemPrefersDark);
    } else {
      root.classList.toggle("dark", selectedTheme === "dark");
    }
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  // Listen for system theme changes
  useEffect(() => {
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => applyTheme("system");
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [theme]);

  // Placeholder user info (replace with real user data if available)
  const user = {
    name: isLoggedIn ? "John Doe" : "Guest",
    email: isLoggedIn ? "john@example.com" : "",
    imageUrl: isLoggedIn ? undefined : undefined, // Add image url if available
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 border-gray-200 dark:border-gray-700">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
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

          <Link to="/">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              BachatBox
            </h1>
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {themeOptions.map((option) => (
              <Button
                key={option.name}
                variant={theme === option.name ? "default" : "ghost"}
                size="sm"
                onClick={() => handleThemeChange(option.name)}
                className={`h-8 w-8 p-0 ${
                  theme === option.name
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                }`}
              >
                <option.icon className="h-4 w-4" />
              </Button>
            ))}
          </div>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-0 h-10 w-10 rounded-full ml-2">
                <Avatar>
                  {user.imageUrl ? (
                    <AvatarImage src={user.imageUrl} alt={user.name} />
                  ) : (
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  )}
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="flex flex-col">
                <span>{user.name}</span>
                {user.email && <span className="text-xs text-gray-500">{user.email}</span>}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {isLoggedIn ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2">
                      <User className="h-4 w-4" /> Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="flex items-center gap-2">
                      <SettingsIcon className="h-4 w-4" /> Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-red-600">
                    <LogOut className="h-4 w-4" /> Logout
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/login" className="flex items-center gap-2">
                      <LogIn className="h-4 w-4" /> Login
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/signup" className="flex items-center gap-2">
                      <User className="h-4 w-4" /> Sign Up
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

export default Header;
