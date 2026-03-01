import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyOtp } from "../../services/auth.service";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const emailFromState = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔒 Guard: user should not access this page directly
  useEffect(() => {
    if (!emailFromState) {
      toast.error("Invalid access. Please request OTP again.");
      navigate("/forgot-password", { replace: true });
    }
  }, [emailFromState, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await verifyOtp({
        email: emailFromState,
        otp,
      });

      toast.success(res.message || "OTP verified successfully");

      navigate("/reset-password", {
        state: { email: emailFromState },
        replace: true,
      });
    } catch (error) {
      toast.error(error.message || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-6">
      <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold">
          Verify OTP
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={emailFromState}
            disabled
            className="mb-4 w-full rounded border px-3 py-2 bg-gray-100"
          />

          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
            className="mb-4 w-full rounded border px-3 py-2 focus:outline-none focus:ring"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;