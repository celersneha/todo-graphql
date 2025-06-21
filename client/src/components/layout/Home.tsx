import { useAuth } from "@/context/AuthContext";
import React, { useState } from "react";
import AuthDialog from "../Auth/AuthDialog";

// Using standard anchor tags instead of Router Link for now
// Replace with proper routing link when router is set up

const Home: React.FC = () => {
  const { user } = useAuth();
  const [isAuthDialogOpen, setAuthDialogOpen] = useState(false);
  const handleAuthOpen = () => {
    if (!user) {
      setAuthDialogOpen(true);
    }
  };
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#fff5e2] via-white to-[#f8f2ff]">
      {/* Hero Section */}{" "}
      <div className="relative overflow-hidden min-h-screen flex items-center justify-center">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_50%_50%,rgba(157,80,187,0.1),transparent_30%)]"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_50%_50%,rgba(69,227,255,0.1),transparent_30%)]"></div>

          {/* Floating elements */}
          <div className="absolute top-1/4 left-1/4 w-24 h-24 rounded-full bg-gradient-to-br from-[#9d50bb]/10 to-[#a163f7]/20 animate-float-slow"></div>
          <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-gradient-to-br from-[#6f88fc]/10 to-[#45e3ff]/20 animate-float-medium"></div>
          <div className="absolute bottom-1/4 left-1/3 w-20 h-20 rounded-full bg-gradient-to-br from-[#45e3ff]/10 to-[#6f88fc]/20 animate-float-fast"></div>

          {/* Sparkles */}
          <div className="absolute top-1/4 right-1/3 text-3xl animate-twinkle">
            ✨
          </div>
          <div className="absolute bottom-1/3 left-1/4 text-2xl animate-twinkle-delayed">
            ✨
          </div>
          <div className="absolute top-1/2 right-1/4 text-4xl animate-twinkle-slow">
            ✨
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="animate-fadeIn space-y-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center justify-center blur-2xl opacity-50">
                  <span className="text-8xl md:text-9xl">✨</span>
                </div>
                <div className="relative flex items-center justify-center">
                  <span className="text-7xl md:text-8xl mb-4">✨</span>
                </div>
              </div>

              <h1 className="text-6xl md:text-8xl font-bold mb-6 gradient-text tracking-tight">
                TickTask
              </h1>

              <div className="h-2 w-48 bg-gradient-to-r from-[#9d50bb] via-[#a163f7] to-[#45e3ff] mx-auto rounded-full mb-10 animate-shimmer"></div>

              <p className="text-2xl text-[#2c3e50] max-w-3xl mx-auto mb-12 leading-relaxed">
                Organize your tasks with magical efficiency. Experience the
                enchantment of productivity in every click.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
                <button
                  onClick={handleAuthOpen}
                  className="w-full sm:w-auto px-10 py-4 text-lg text-white bg-gradient-to-r from-[#9d50bb] to-[#a163f7] rounded-full hover:shadow-[0_8px_25px_-5px_rgba(157,80,187,0.6)] transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 shadow-lg cursor-pointer"
                >
                  Get Started
                </button>
                <a
                  href="https://github.com/SnehaSharma245/todo-graphql"
                  className="w-full sm:w-auto px-10 py-4 text-lg text-[#9d50bb] bg-white border-2 border-[#9d50bb] rounded-full hover:bg-[#9d50bb]/5 transition-all duration-300 transform hover:-translate-y-1 shadow-sm"
                >
                  View On Github
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Features Section */}
      <section
        id="features"
        className="py-20 bg-gradient-to-b from-white to-[#f8f2ff]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#2c3e50] mb-4">
              Magical Features
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-[#9d50bb] to-[#45e3ff] mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-[#2c3e50]/80 max-w-2xl mx-auto">
              Discover the enchanted tools that make TickTask special
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Card 1 */}
            <div className="bg-white rounded-xl p-8 shadow-[0_10px_40px_-15px_rgba(161,99,247,0.3)] hover:shadow-[0_20px_60px_-15px_rgba(161,99,247,0.4)] transition-all duration-300 hover:translate-y-[-8px]">
              <div className="w-20 h-20 bg-gradient-to-r from-[#9d50bb] to-[#a163f7] rounded-full flex items-center justify-center mb-8 mx-auto transform hover:rotate-6 transition-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-center text-[#2c3e50] mb-4">
                Easy Task Creation
              </h3>
              <p className="text-[#2c3e50]/80 text-center">
                Create tasks effortlessly with our intuitive interface. Add
                titles, descriptions, and stay organized with magical
                simplicity.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-xl p-8 shadow-[0_10px_40px_-15px_rgba(111,136,252,0.3)] hover:shadow-[0_20px_60px_-15px_rgba(111,136,252,0.4)] transition-all duration-300 hover:translate-y-[-8px]">
              <div className="w-20 h-20 bg-gradient-to-r from-[#6f88fc] to-[#566fd8] rounded-full flex items-center justify-center mb-8 mx-auto transform hover:rotate-6 transition-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-center text-[#2c3e50] mb-4">
                Task Management
              </h3>
              <p className="text-[#2c3e50]/80 text-center">
                Filter tasks by status, mark them as complete, and stay on top
                of your progress with enchanted tracking tools.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-xl p-8 shadow-[0_10px_40px_-15px_rgba(69,227,255,0.3)] hover:shadow-[0_20px_60px_-15px_rgba(69,227,255,0.4)] transition-all duration-300 hover:translate-y-[-8px]">
              <div className="w-20 h-20 bg-gradient-to-r from-[#45e3ff] to-[#36b6e5] rounded-full flex items-center justify-center mb-8 mx-auto transform hover:rotate-6 transition-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-center text-[#2c3e50] mb-4">
                Secure Authentication
              </h3>
              <p className="text-[#2c3e50]/80 text-center">
                Your tasks are protected with secure authentication. Access them
                from anywhere with the peace of mind of magical protection.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section className="py-20 bg-[#f8f2ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#2c3e50] mb-4">
              How It Works
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-[#45e3ff] to-[#6f88fc] mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-[#2c3e50]/80 max-w-2xl mx-auto">
              Your journey to enchanted productivity
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1.5 bg-gradient-to-b from-[#9d50bb]/50 to-[#45e3ff]/50 rounded-full hidden md:block"></div>

            <div className="md:grid md:grid-cols-2 md:gap-12">
              {/* Step 1 */}
              <div
                className="mb-16 md:mb-0 md:pr-12 animate-fadeIn"
                style={{ animationDelay: "0.1s" }}
              >
                <div className="flex justify-end">
                  <div className="bg-white p-8 rounded-xl shadow-[0_10px_40px_-15px_rgba(161,99,247,0.3)] w-full md:max-w-md relative hover:shadow-[0_20px_60px_-15px_rgba(161,99,247,0.4)] transition-all duration-300 hover:translate-y-[-5px]">
                    <div className="absolute top-1/2 transform -translate-y-1/2 -right-5 w-10 h-10 bg-gradient-to-r from-[#9d50bb] to-[#a163f7] rounded-full hidden md:flex items-center justify-center text-white font-bold shadow-lg">
                      1
                    </div>
                    <h3 className="text-2xl font-semibold text-[#2c3e50] mb-4">
                      Sign Up
                    </h3>
                    <p className="text-[#2c3e50]/80">
                      Create your account in seconds and get immediate access to
                      all features. No credit card required.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="mb-16 md:mb-0 md:pl-12 md:pt-32 animate-fadeIn"
                style={{ animationDelay: "0.3s" }}
              ></div>

              {/* Step 2 */}
              <div
                className="mb-16 md:mb-0 md:pr-12 md:pt-32 animate-fadeIn"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div
                className="mb-16 md:mb-0 md:pl-12 animate-fadeIn"
                style={{ animationDelay: "0.7s" }}
              >
                <div className="flex justify-start">
                  <div className="bg-white p-8 rounded-xl shadow-[0_10px_40px_-15px_rgba(111,136,252,0.3)] w-full md:max-w-md relative hover:shadow-[0_20px_60px_-15px_rgba(111,136,252,0.4)] transition-all duration-300 hover:translate-y-[-5px]">
                    <div className="absolute top-1/2 transform -translate-y-1/2 -left-5 w-10 h-10 bg-gradient-to-r from-[#6f88fc] to-[#566fd8] rounded-full hidden md:flex items-center justify-center text-white font-bold shadow-lg">
                      2
                    </div>
                    <h3 className="text-2xl font-semibold text-[#2c3e50] mb-4">
                      Create Tasks
                    </h3>
                    <p className="text-[#2c3e50]/80">
                      Add new tasks with titles and descriptions. Organize your
                      workflow in an intuitive interface.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div
                className="mb-16 md:mb-0 md:pr-12 animate-fadeIn"
                style={{ animationDelay: "0.9s" }}
              >
                <div className="flex justify-end">
                  <div className="bg-white p-8 rounded-xl shadow-[0_10px_40px_-15px_rgba(69,227,255,0.3)] w-full md:max-w-md relative hover:shadow-[0_20px_60px_-15px_rgba(69,227,255,0.4)] transition-all duration-300 hover:translate-y-[-5px]">
                    <div className="absolute top-1/2 transform -translate-y-1/2 -right-5 w-10 h-10 bg-gradient-to-r from-[#45e3ff] to-[#36b6e5] rounded-full hidden md:flex items-center justify-center text-white font-bold shadow-lg">
                      3
                    </div>
                    <h3 className="text-2xl font-semibold text-[#2c3e50] mb-4">
                      Manage & Track
                    </h3>
                    <p className="text-[#2c3e50]/80">
                      Easily filter tasks by status. Mark them as complete and
                      keep track of your progress visually.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="md:pl-12 md:pt-32 animate-fadeIn"
                style={{ animationDelay: "1.1s" }}
              ></div>
            </div>
          </div>

          <div className="flex justify-center mt-16">
            <a
              href="/dashboard"
              className="px-8 py-4 text-white bg-gradient-to-r from-[#45e3ff] to-[#6f88fc] rounded-full hover:shadow-[0_8px_25px_-5px_rgba(69,227,255,0.6)] transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
            >
              Try TickTask Now
            </a>
          </div>
        </div>
      </section>
      {/* Footer */}
      <div className="mt-auto py-8 bg-[#2c3e50]/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[#2c3e50]/60 text-sm">
            TickTask — Sprinkle a little magic on your productivity ✨
          </p>
        </div>
      </div>
      <AuthDialog
        isOpen={isAuthDialogOpen}
        onOpenChange={() => setAuthDialogOpen(false)}
      />
    </div>
  );
};

export default Home;
