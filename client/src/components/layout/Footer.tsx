import React from "react";
import { Twitter, Github, Linkedin } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-[#fff5e6]/80 backdrop-blur border-t border-[#6949ff]/10 py-10 mt-20 relative overflow-hidden">
      <div className="absolute bottom-0 left-10 w-24 h-24 rounded-full bg-[#6949ff]/5 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-[#c961ff]/5 animate-pulse"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col items-center">
          <div className="flex items-center mb-4">
            <span className="text-3xl font-bold mr-2">✨</span>
            <span className="text-3xl font-bold bg-gradient-to-r from-[#6949ff] to-[#c961ff] text-transparent bg-clip-text">
              TickTask
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-8 text-center max-w-md">
            Organize your tasks with magical efficiency. Experience the
            enchantment of productivity.
          </p>
          <div className="flex space-x-8 mb-10">
            <a
              href="https://www.linkedin.com/in/celersneha/"
              className="text-gray-300 hover:text-[#45e3ff] transition-colors"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="https://x.com/celersneha"
              className="text-gray-300 hover:text-[#45e3ff] transition-colors"
            >
              <Twitter className="h-6 w-6" />
            </a>
            <a
              href="https://github.com/celersneha"
              className="text-gray-300 hover:text-[#45e3ff] transition-colors"
            >
              <Github className="h-6 w-6" />
            </a>
          </div>
          <div className="pt-8 border-t border-[#6949ff]/10 text-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} TickTask. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
