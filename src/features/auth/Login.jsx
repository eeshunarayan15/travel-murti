// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { login, forgotPassword, verifyOtp, resetPassword } from "../../services/auth.service";
// import { setUser } from "../../redux/slices/userSlice";
// import { useDispatch } from "react-redux";

// const Login = ({ embedded = false }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const from = location.state?.from?.pathname || "/admin";

//   const [step, setStep] = useState("LOGIN"); // LOGIN | FORGOT | OTP | RESET
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//     otp: "",
//     newPassword: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     try {
//       const data = await login({ email: form.email, password: form.password });
//       localStorage.setItem("authToken", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));
//       dispatch(setUser(data.user));
//       navigate(from, { replace: true });
//     } catch (err) {
//       setError(err?.response?.data?.message || err.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleForgot = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     try {
//       await forgotPassword(form.email);
//       setStep("OTP");
//     } catch (err) {
//       setError(err?.response?.data?.message || "Failed to send OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     try {
//       await verifyOtp({ email: form.email, otp: form.otp });
//       setStep("RESET");
//     } catch (err) {
//       setError(err?.response?.data?.message || "Invalid OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReset = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     try {
//       await resetPassword({ email: form.email, otp: form.otp, newPassword: form.newPassword });
//       setStep("LOGIN");
//     } catch (err) {
//       setError(err?.response?.data?.message || "Reset failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className={
//         embedded
//           ? "w-full py-12 px-4"
//           : "min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 px-6"
//       }
//     >
//       <form
//         onSubmit={
//           step === "LOGIN"
//             ? handleLogin
//             : step === "FORGOT"
//             ? handleForgot
//             : step === "OTP"
//             ? handleVerifyOtp
//             : handleReset
//         }
//         className={
//           embedded
//             ? "bg-white rounded-2xl shadow-xl w-full max-w-md mx-auto p-8 border"
//             : "bg-white/95 backdrop-blur p-8 rounded-2xl shadow-xl w-full max-w-md"
//         }
//       >
//         <h2 className="text-2xl font-bold mb-2 text-gray-800 text-center">
//           {step === "LOGIN" && "Admin Login"}
//           {step === "FORGOT" && "Forgot Password"}
//           {step === "OTP" && "Verify OTP"}
//           {step === "RESET" && "Create New Password"}
//         </h2>

//         <p className="text-sm text-gray-500 text-center mb-6">
//           {step === "LOGIN" && "Sign in to manage Travel Murti"}
//           {step === "FORGOT" && "Enter your email to get OTP"}
//           {step === "OTP" && "Enter OTP sent to your email"}
//           {step === "RESET" && "Set a new password"}
//         </p>

//         {error && <p className="mb-4 text-red-600 text-sm">{error}</p>}

//         <input
//           name="email"
//           type="email"
//           value={form.email}
//           onChange={handleChange}
//           placeholder="Email"
//           className="w-full mb-4 px-4 py-2 border rounded-lg"
//           required
//           disabled={step === "OTP" || step === "RESET"}
//         />

//         {step === "LOGIN" && (
//           <input
//             name="password"
//             type="password"
//             value={form.password}
//             onChange={handleChange}
//             placeholder="Password"
//             className="w-full mb-4 px-4 py-2 border rounded-lg"
//             required
//           />
//         )}

//         {step === "OTP" && (
//           <input
//             name="otp"
//             type="text"
//             value={form.otp}
//             onChange={handleChange}
//             placeholder="OTP"
//             className="w-full mb-4 px-4 py-2 border rounded-lg"
//             required
//           />
//         )}

//         {step === "RESET" && (
//           <>
//             <input
//               name="otp"
//               type="text"
//               value={form.otp}
//               onChange={handleChange}
//               placeholder="OTP"
//               className="w-full mb-4 px-4 py-2 border rounded-lg"
//               required
//             />
//             <input
//               name="newPassword"
//               type="password"
//               value={form.newPassword}
//               onChange={handleChange}
//               placeholder="New Password"
//               className="w-full mb-4 px-4 py-2 border rounded-lg"
//               required
//             />
//           </>
//         )}

//         {step === "LOGIN" && (
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-2 rounded-lg disabled:bg-gray-400"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         )}

//         {step !== "LOGIN" && (
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-2 rounded-lg disabled:bg-gray-400"
//           >
//             {loading ? "Please wait..." : "Continue"}
//           </button>
//         )}

//         <div className="mt-4 text-center text-sm">
//           {step === "LOGIN" ? (
//             <button type="button" onClick={() => setStep("FORGOT")} className="text-blue-600 hover:underline">
//               Forgot password?
//             </button>
//           ) : (
//             <button type="button" onClick={() => setStep("LOGIN")} className="text-blue-600 hover:underline">
//               Back to Login
//             </button>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  login,
  forgotPassword,
  verifyOtp,
  resetPassword,
} from "../../services/auth.service";
import { setUser } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

// Step config
const STEPS = {
  LOGIN: {
    title: "Welcome Back",
    description: "Sign in to manage Travel Murti",
    icon: "🏔️",
  },
  FORGOT: {
    title: "Forgot Password",
    description: "Enter your email and we'll send you an OTP",
    icon: "🔐",
  },
  OTP: {
    title: "Verify OTP",
    description: "Check your email for the 6-digit code",
    icon: "📩",
  },
  RESET: {
    title: "New Password",
    description: "Choose a strong new password",
    icon: "🔑",
  },
};

// Tiny animated step indicator
const StepDots = ({ current }) => {
  const order = ["LOGIN", "FORGOT", "OTP", "RESET"];
  const idx = order.indexOf(current);
  if (idx <= 0) return null;
  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      {["FORGOT", "OTP", "RESET"].map((s, i) => (
        <React.Fragment key={s}>
          <div
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i < idx ? "bg-blue-600 scale-110" : "bg-gray-200"
            }`}
          />
          {i < 2 && (
            <div
              className={`h-px w-6 transition-all duration-300 ${i < idx - 1 ? "bg-blue-600" : "bg-gray-200"}`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const Login = ({ embedded = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin";

  const [step, setStep] = useState("LOGIN");
  const [form, setForm] = useState({
    email: "",
    password: "",
    otp: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const withLoading = async (fn) => {
    setLoading(true);
    try {
      await fn();
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    withLoading(async () => {
      try {
        const data = await login({
          email: form.email,
          password: form.password,
        });
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        dispatch(setUser(data.user));
        toast.success("Welcome back! 👋");
        navigate(from, { replace: true });
      } catch (err) {
        toast.error(
          err?.response?.data?.message || err.message || "Login failed",
        );
      }
    });
  };

  const handleForgot = (e) => {
    e.preventDefault();
    withLoading(async () => {
      try {
        await forgotPassword(form.email);
        toast.success("OTP sent to your email!");
        setStep("OTP");
      } catch (err) {
        toast.error(err?.response?.data?.message || "Failed to send OTP");
      }
    });
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    withLoading(async () => {
      try {
        await verifyOtp({ email: form.email, otp: form.otp });
        toast.success("OTP verified!");
        setStep("RESET");
      } catch (err) {
        toast.error(err?.response?.data?.message || "Invalid OTP");
      }
    });
  };

  const handleReset = (e) => {
    e.preventDefault();
    withLoading(async () => {
      try {
        await resetPassword({
          email: form.email,
          otp: form.otp,
          newPassword: form.newPassword,
        });
        toast.success("Password reset! Please login.");
        setStep("LOGIN");
        setForm({ email: "", password: "", otp: "", newPassword: "" });
      } catch (err) {
        toast.error(err?.response?.data?.message || "Reset failed");
      }
    });
  };

  const submitHandler = {
    LOGIN: handleLogin,
    FORGOT: handleForgot,
    OTP: handleVerifyOtp,
    RESET: handleReset,
  };
  const { title, description, icon } = STEPS[step];

  return (
    <div
      className={
        embedded
          ? "w-full py-12 px-4"
          : "min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-950 px-4"
      }
    >
      {/* Animated background blobs — only for full-page */}
      {!embedded && (
        <>
          <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl" />
        </>
      )}

      <Card className="relative w-full max-w-md shadow-2xl border border-white/10 bg-white/95 backdrop-blur-xl">
        <CardHeader className="pb-2 text-center space-y-1">
          {/* Logo / brand */}
          <div className="mx-auto mb-2 flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg text-2xl">
            {icon}
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            {title}
          </CardTitle>
          <CardDescription className="text-gray-500 text-sm">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-4">
          <StepDots current={step} />

          <form onSubmit={submitHandler[step]} className="space-y-4">
            {/* Email */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                Email
              </label>
              <Input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="admin@travelmurti.com"
                required
                disabled={step === "OTP" || step === "RESET"}
                className="h-11"
              />
            </div>

            {/* Password (LOGIN) */}
            {step === "LOGIN" && (
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                  Password
                </label>
                <div className="relative">
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>
            )}

            {/* OTP (OTP + RESET) */}
            {(step === "OTP" || step === "RESET") && (
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                  OTP Code
                </label>
                <Input
                  name="otp"
                  type="text"
                  value={form.otp}
                  onChange={handleChange}
                  placeholder="6-digit code"
                  maxLength={6}
                  required
                  className="h-11 tracking-[0.5em] text-center font-mono text-lg"
                />
              </div>
            )}

            {/* New Password (RESET) */}
            {step === "RESET" && (
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                  New Password
                </label>
                <div className="relative">
                  <Input
                    name="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={form.newPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
                  >
                    {showNewPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>
            )}

            {/* Submit button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Please wait...
                </span>
              ) : step === "LOGIN" ? (
                "Sign In →"
              ) : step === "FORGOT" ? (
                "Send OTP →"
              ) : step === "OTP" ? (
                "Verify →"
              ) : (
                "Reset Password →"
              )}
            </Button>
          </form>

          {/* Footer nav */}
          <div className="mt-5 text-center">
            {step === "LOGIN" ? (
              <button
                type="button"
                onClick={() => setStep("FORGOT")}
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors"
              >
                Forgot your password?
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setStep("LOGIN");
                  setForm({
                    email: "",
                    password: "",
                    otp: "",
                    newPassword: "",
                  });
                }}
                className="text-sm text-gray-500 hover:text-gray-800 hover:underline transition-colors"
              >
                ← Back to Login
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
