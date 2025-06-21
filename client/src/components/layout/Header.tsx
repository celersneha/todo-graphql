import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../ui/button";
import AuthDialog from "../Auth/AuthDialog";

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [isAuthDialogOpen, setAuthDialogOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <header
        className={`fixed w-full z-50 transition-all duration-300 flex justify-between items-center px-6 py-4 
        ${"bg-white/90 backdrop-blur-sm text-[#2c3e50] shadow-lg"}`}
      >
        {/* Logo */}
        <div className="flex items-center cursor-pointer">
          <div className="text-2xl font-bold flex items-center ">
            <span className="mr-2">✨</span>
            <span className="gradient-text">TickTask</span>
          </div>
        </div>

        {/* Login Button */}
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <div className="hidden md:block mr-2 rounded-full bg-white/20 px-3 py-1 text-sm">
                {user.username || user.email?.split("@")[0]}
              </div>
              <Button
                className={`${
                  isScrolled
                    ? "bg-[#a163f7] hover:bg-[#8a4de0]"
                    : "bg-white text-[#a163f7] hover:bg-[#f0f0f0]"
                } font-medium px-4 py-2 rounded-full transition shadow-md hover:shadow-lg cursor-pointer`}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              className={`${
                isScrolled
                  ? "bg-[#a163f7] hover:bg-[#8a4de0] text-white"
                  : "bg-white text-[#a163f7] hover:bg-[#f0f0f0]"
              } font-medium px-6 py-2 rounded-full transition shadow-md hover:shadow-lg cursor-pointer`}
              onClick={handleAuthOpen}
            >
              Login
            </Button>
          )}

          {/* Mobile menu button - Just for UI, functionality would need to be added */}
          <button className="md:hidden ml-2 p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Spacer to prevent content from hiding under fixed header */}
      <div className="h-16"></div>

      <AuthDialog isOpen={isAuthDialogOpen} onOpenChange={setAuthDialogOpen} />
    </>
  );
};

export default Header;
