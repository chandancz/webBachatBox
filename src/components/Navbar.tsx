import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow mb-6">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-bold text-lg text-blue-600">Home</Link>
          {isLoggedIn && (
            <>
              <Link to="/profile" className="text-gray-700 hover:text-blue-600">Profile</Link>
              <Link to="/settings" className="text-gray-700 hover:text-blue-600">Settings</Link>
            </>
          )}
        </div>
        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
              <Link to="/signup" className="text-gray-700 hover:text-blue-600">Sign Up</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="text-gray-700 hover:text-red-600">Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
