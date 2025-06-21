import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../ui/button";
import AuthDialog from "../Auth/AuthDialog";

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [isAuthDialogOpen, setAuthDialogOpen] = useState(false);

  const handleAuthOpen = () => {
    if (!user) {
      setAuthDialogOpen(true);
    }
  };

  const handleLogout = () => {
    if (user) {
      logout();
    }
  };

  return (
    <>
      <header className="flex justify-between items-center px-4 py-3 bg-gray-800 text-white shadow-md">
        {/* Logo */}
        <div className="text-xl font-bold">MyApp</div>

        {/* Navigation */}
        <nav>
          <ul className="flex gap-6">
            <li>
              <a href="/" className="hover:text-gray-400 transition-colors">
                Home
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="hover:text-gray-400 transition-colors"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-gray-400 transition-colors"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>

        {/* Login Button */}
        {user ? (
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition"
            onClick={handleLogout}
          >
            Logout
          </Button>
        ) : (
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition"
            onClick={handleAuthOpen}
          >
            Login
          </Button>
        )}
      </header>

      <AuthDialog isOpen={isAuthDialogOpen} onOpenChange={setAuthDialogOpen} />
    </>
  );
};

export default Header;
