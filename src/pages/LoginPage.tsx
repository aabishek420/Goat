import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  Phone,
  Loader2,
  Check,
  X,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, signup, loginLoading } = useAuthStore();

  const [showPass, setShowPass] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  // Login form state
  const [loginData, setLoginData] = useState({
    identifier: "",
    password: "",
  });

  // Signup form state
  const [signupData, setSignupData] = useState({
    full_name: "",
    email: "",
    mobile: "",
    password: "",
  });

  // Password validation
  const validatePassword = (password: string) => {
    return {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[@#$!%*?&]/.test(password),
    };
  };

  const passwordRules = validatePassword(signupData.password);
  const isPasswordValid = Object.values(passwordRules).every(Boolean);

  // Email validation
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupData.email);

  // Mobile validation (10 digits)
  const isMobileValid = /^[0-9]{10}$/.test(signupData.mobile);

  const isFormValid =
    signupData.full_name.length > 0 &&
    isEmailValid &&
    isMobileValid &&
    isPasswordValid;

  const toggleForm = () => {
    setShowSignup(!showSignup);
    setShowPass(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(loginData);
    if (success) {
      navigate("/dashboard");
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await signup(signupData);
    if (success) {
      setShowSignup(false);
      setSignupData({ full_name: "", email: "", mobile: "", password: "" });
    }
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-background font-sans overflow-hidden">
      {/* LEFT — CINEMATIC GOAT VISUAL */}
      <div className="relative hidden lg:block">
        <img src="/goo.jpg" className="w-full h-full object-cover" alt="Goat" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/40 to-transparent" />

        <div className="absolute bottom-16 left-16 text-primary-foreground max-w-md">
          <h1 className="text-5xl font-display font-bold leading-tight">
            From Farm to Fortune.
          </h1>
          <p className="mt-4 text-lg text-primary-foreground/80">
            Smart Farming. Strong Goats. Serious Money.
          </p>
        </div>
      </div>

      {/* RIGHT — LOGIN PANEL */}
      <div className="flex items-center justify-center px-6 sm:px-12 py-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md backdrop-blur-xl rounded-[2.5rem] p-10 shadow-2xl border border-border bg-card relative overflow-hidden"
        >
          {/* CENTERED LOGO */}
          <div className="relative z-10 flex justify-center mb-6">
            <div className="w-24 h-24 rounded-full bg-muted backdrop-blur-md flex items-center justify-center shadow-xl">
              <img
                src="/glogo.png"
                alt="logo"
                className="w-16 h-16 object-contain"
              />
            </div>
          </div>

          {/* BRAND */}
          <div className="text-center mb-6 relative z-10">
            <h1 className="text-2xl font-display font-bold text-primary tracking-tight">
              KIDAAVIRUNTHU
            </h1>
            <p className="text-xs text-muted-foreground mt-1">GOATS FOREVER</p>
          </div>

          {/* FORM CONTENT */}
          <div className="relative z-10">
            {!showSignup ? (
              /* LOGIN FORM */
              <form onSubmit={handleLogin}>
                <div className="space-y-4 mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Email or Mobile Number"
                      value={loginData.identifier}
                      onChange={(e) =>
                        setLoginData({
                          ...loginData,
                          identifier: e.target.value,
                        })
                      }
                      required
                      disabled={loginLoading}
                      className="w-full bg-input/20 border border-input rounded-xl p-3 pl-10 outline-none focus:border-ring transition placeholder:text-muted-foreground text-foreground font-medium text-sm disabled:opacity-50"
                    />
                    <User
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      size={18}
                    />
                  </div>

                  <div className="relative">
                    <input
                      type={showPass ? "text" : "password"}
                      placeholder="Password"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                      required
                      disabled={loginLoading}
                      className="w-full bg-input/20 border border-input rounded-xl p-3 pl-10 pr-10 outline-none focus:border-ring transition placeholder:text-muted-foreground text-foreground font-medium text-sm disabled:opacity-50"
                    />
                    <Lock
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      size={18}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      disabled={loginLoading}
                    >
                      {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* LOGIN BUTTON */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: loginLoading ? 1 : 1.02 }}
                  whileTap={{ scale: loginLoading ? 1 : 0.98 }}
                  disabled={loginLoading}
                  className="w-full bg-primary/40 text-primary hover:bg-primary hover:text-white py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loginLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      LOGGING IN...
                    </>
                  ) : (
                    <>
                      LOGIN
                      <ChevronRight size={16} />
                    </>
                  )}
                </motion.button>

                {/* FOOTER TEXT */}
                <p
                  className="text-center mt-4 text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                  onClick={toggleForm}
                >
                  Don't have an account?{" "}
                  <span className="font-semibold">Create Account</span>
                </p>
              </form>
            ) : (
              /* SIGNUP FORM */
              <form onSubmit={handleSignup}>
                <div className="space-y-4 mb-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={signupData.full_name}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          full_name: e.target.value,
                        })
                      }
                      required
                      disabled={loginLoading}
                      className="w-full bg-input/20 border border-input rounded-xl p-3 pl-10 outline-none focus:border-ring transition placeholder:text-muted-foreground text-foreground font-medium text-sm disabled:opacity-50"
                    />
                    <User
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      size={18}
                    />
                  </div>

                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={signupData.email}
                      onChange={(e) =>
                        setSignupData({ ...signupData, email: e.target.value })
                      }
                      required
                      disabled={loginLoading}
                      className={`w-full bg-input/20 border ${
                        signupData.email && !isEmailValid
                          ? "border-red-500"
                          : "border-input"
                      } rounded-xl p-3 pl-10 outline-none focus:border-ring transition placeholder:text-muted-foreground text-foreground font-medium text-sm disabled:opacity-50`}
                    />
                    <Mail
                      className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                        signupData.email && !isEmailValid
                          ? "text-red-500"
                          : "text-muted-foreground"
                      }`}
                      size={18}
                    />
                    {signupData.email && !isEmailValid && (
                      <p className="text-[10px] text-red-500 mt-1 ml-1">
                        Please enter a valid email address
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="Mobile Number"
                      value={signupData.mobile}
                      onChange={(e) =>
                        setSignupData({ ...signupData, mobile: e.target.value })
                      }
                      required
                      disabled={loginLoading}
                      className={`w-full bg-input/20 border ${
                        signupData.mobile && !isMobileValid
                          ? "border-red-500"
                          : "border-input"
                      } rounded-xl p-3 pl-10 outline-none focus:border-ring transition placeholder:text-muted-foreground text-foreground font-medium text-sm disabled:opacity-50`}
                    />
                    <Phone
                      className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                        signupData.mobile && !isMobileValid
                          ? "text-red-500"
                          : "text-muted-foreground"
                      }`}
                      size={18}
                    />
                    {signupData.mobile && !isMobileValid && (
                      <p className="text-[10px] text-red-500 mt-1 ml-1">
                        Please enter a valid 10-digit mobile number
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <input
                      type={showPass ? "text" : "password"}
                      placeholder="Password"
                      value={signupData.password}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          password: e.target.value,
                        })
                      }
                      required
                      disabled={loginLoading}
                      className="w-full bg-input/20 border border-input rounded-xl p-3 pl-10 pr-10 outline-none focus:border-ring transition placeholder:text-muted-foreground text-foreground font-medium text-sm disabled:opacity-50"
                    />
                    <Lock
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      size={18}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      disabled={loginLoading}
                    >
                      {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* PASSWORD REQUIREMENTS */}
                {signupData.password && (
                  <div className="mb-4 p-3 bg-muted/30 rounded-lg space-y-1">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">
                      Password Requirements:
                    </p>
                    <div className="space-y-1">
                      <div
                        className={`flex items-center gap-2 text-xs ${
                          passwordRules.minLength
                            ? "text-green-600"
                            : "text-muted-foreground"
                        }`}
                      >
                        {passwordRules.minLength ? (
                          <Check size={14} />
                        ) : (
                          <X size={14} />
                        )}
                        <span>Minimum 8 characters</span>
                      </div>
                      <div
                        className={`flex items-center gap-2 text-xs ${
                          passwordRules.hasUpperCase
                            ? "text-green-600"
                            : "text-muted-foreground"
                        }`}
                      >
                        {passwordRules.hasUpperCase ? (
                          <Check size={14} />
                        ) : (
                          <X size={14} />
                        )}
                        <span>At least 1 uppercase letter (A-Z)</span>
                      </div>
                      <div
                        className={`flex items-center gap-2 text-xs ${
                          passwordRules.hasLowerCase
                            ? "text-green-600"
                            : "text-muted-foreground"
                        }`}
                      >
                        {passwordRules.hasLowerCase ? (
                          <Check size={14} />
                        ) : (
                          <X size={14} />
                        )}
                        <span>At least 1 lowercase letter (a-z)</span>
                      </div>
                      <div
                        className={`flex items-center gap-2 text-xs ${
                          passwordRules.hasNumber
                            ? "text-green-600"
                            : "text-muted-foreground"
                        }`}
                      >
                        {passwordRules.hasNumber ? (
                          <Check size={14} />
                        ) : (
                          <X size={14} />
                        )}
                        <span>At least 1 number (0-9)</span>
                      </div>
                      <div
                        className={`flex items-center gap-2 text-xs ${
                          passwordRules.hasSpecialChar
                            ? "text-green-600"
                            : "text-muted-foreground"
                        }`}
                      >
                        {passwordRules.hasSpecialChar ? (
                          <Check size={14} />
                        ) : (
                          <X size={14} />
                        )}
                        <span>At least 1 special character (@#$!%*?&)</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* SIGNUP BUTTON */}
                <motion.button
                  type="submit"
                  whileHover={{
                    scale: loginLoading || !isFormValid ? 1 : 1.02,
                  }}
                  whileTap={{
                    scale: loginLoading || !isFormValid ? 1 : 0.98,
                  }}
                  disabled={loginLoading || !isFormValid}
                  className="w-full bg-primary/40  text-primary hover:bg-primary hover:text-white py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loginLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      CREATING ACCOUNT...
                    </>
                  ) : (
                    <>
                      CREATE ACCOUNT
                      <ChevronRight size={16} />
                    </>
                  )}
                </motion.button>

                {/* FOOTER TEXT */}
                <p
                  className="text-center mt-4 text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                  onClick={toggleForm}
                >
                  Already have an account?{" "}
                  <span className="font-semibold">Login</span>
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
