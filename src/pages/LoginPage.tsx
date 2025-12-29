import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import type { UserRole } from "./types";

interface LoginPageProps {
  onLogin: (role: UserRole) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [showPass, setShowPass] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const toggleForm = () => {
    setShowSignup(!showSignup);
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-cream font-sans overflow-hidden">
      {/* LEFT — CINEMATIC GOAT VISUAL */}
      <div className="relative hidden lg:block">
        <img
          src="/goo.jpg"
          className="w-full h-full object-cover"
          alt="Goat"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest/90 via-forest/40 to-transparent" />

        <div className="absolute bottom-16 left-16 text-cream max-w-md">
          <h1 className="text-5xl font-serif font-bold leading-tight">
            From Farm to Fortune.
          </h1>
          <p className="mt-4 text-lg text-cream/80">
            Smart Farming. Strong Goats. Serious Money.
          </p>
        </div>
      </div>

      {/* RIGHT — LOGIN PANEL */}
      <div className="flex items-center justify-center px-6 sm:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md backdrop-blur-xl rounded-[2.5rem] p-10 shadow-2xl border border-white/40 relative overflow-hidden"
        >
          {/* Overlay for contrast */}
          <div className="absolute inset-0 bg-black/30" />

          {/* CENTERED LOGO */}
          <div className="relative z-10 flex justify-center mb-6">
            <div className="w-24 h-24 rounded-full bg-cream backdrop-blur-md flex items-center justify-center shadow-xl">
              <img
                src="/glogo.png"
                alt="logo"
                className="w-16 h-16 object-contain"
              />
            </div>
          </div>

          {/* BRAND */}
          <div className="text-center mb-6 relative z-10">
            <h1 className="text-2xl font-serif font-bold text-olive tracking-tight">
              KIDAAVIRUNTHU
            </h1>
            <p className="text-xs text-cream/80 mt-1">
              GOATS FOREVER
            </p>
          </div>

          {/* FORM CONTENT */}
          <div className="relative z-10">
            {!showSignup ? (
              /* LOGIN FORM */
              <>
                {/* INPUTS */}
                <div className="space-y-4 mb-6">
                  <input
                    type="text"
                    placeholder="Mobile Number / Trader ID"
                    className="w-full bg-white/80 border border-white/40 rounded-xl p-3 outline-none focus:border-cream transition placeholder:text-olive/50 text-cream font-medium text-sm"
                  />

                  <div className="relative">
                    <input
                      type={showPass ? "text" : "password"}
                      placeholder="Password"
                      className="w-full bg-white/80 border border-white/40 rounded-xl p-3 pr-10 outline-none focus:border-cream transition placeholder:text-olive/50 text-cream font-medium text-sm"
                    />
                    <button
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/60 hover:text-cream"
                    >
                      {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* LOGIN BUTTON */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onLogin("farmer")}
                  className="w-full bg-olive text-cream py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  LOGIN
                  <ChevronRight size={16} />
                </motion.button>

                {/* FOOTER TEXT */}
                <p
                  className="text-center mt-4 text-xs text-cream/60 italic cursor-pointer hover:text-cream transition-colors"
                  onClick={toggleForm}
                >
                  Create Account
                </p>
              </>
            ) : (
              /* SIGNUP FORM */
              <>
                {/* INPUTS */}
                <div className="space-y-4 mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full bg-white/80 border border-white/40 rounded-xl p-3 pl-10 outline-none focus:border-cream transition placeholder:text-olive/50 text-cream font-medium text-sm"
                    />
                    <User
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/40"
                      size={18}
                    />
                  </div>

                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full bg-white/80 border border-white/40 rounded-xl p-3 pl-10 outline-none focus:border-cream transition placeholder:text-olive/50 text-cream font-medium text-sm"
                    />
                    <Mail
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/40"
                      size={18}
                    />
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Mobile Number"
                      className="w-full bg-white/80 border border-white/40 rounded-xl p-3 pl-10 outline-none focus:border-cream transition placeholder:text-olive/50 text-cream font-medium text-sm"
                    />
                    <ChevronRight
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/40"
                      size={18}
                    />
                  </div>

                  <div className="relative">
                    <input
                      type={showPass ? "text" : "password"}
                      placeholder="Password"
                      className="w-full bg-white/80 border border-white/40 rounded-xl p-3 pl-10 pr-10 outline-none focus:border-cream transition placeholder:text-olive/50 text-cream font-medium text-sm"
                    />
                    <Lock
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/40"
                      size={18}
                    />
                    <button
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/60 hover:text-cream"
                    >
                      {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* SIGNUP BUTTON */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onLogin("farmer")}
                  className="w-full bg-olive text-cream py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  CREATE ACCOUNT
                  <ChevronRight size={16} />
                </motion.button>

                {/* FOOTER TEXT */}
                <p
                  className="text-center mt-4 text-xs text-cream/60 italic cursor-pointer hover:text-cream transition-colors"
                  onClick={toggleForm}
                >
                  Already have an account? Login
                </p>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
