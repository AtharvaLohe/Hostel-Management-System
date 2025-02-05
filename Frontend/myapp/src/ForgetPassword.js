import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOtpField, setShowOtpField] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [isOtpButtonDisabled, setIsOtpButtonDisabled] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  // Send OTP Function
  const handleSendOtp = async () => {
    setIsOtpButtonDisabled(true);
    setShowOtpField(true);
    setMessage("");

    setTimeout(() => {
      setIsOtpButtonDisabled(false);
    }, 5 * 60 * 1000);

    const response = await fetch("http://localhost:8080/api/password/sendOtp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.text();
    setMessage(data);
  };

  // Verify OTP Function
  const handleVerifyOtp = async () => {
    const response = await fetch("http://localhost:8080/api/password/verifyOtp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });
  
    const data = await response.json();
    if (data.success) {
      setShowOtpField(false); // Hide OTP input & button
      setShowPasswordFields(true); // Show password fields
    }
    setMessage(data.message);
  };
  
  // Reset Password Function
  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    const response = await fetch("http://localhost:8080/api/password/resetPassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, newPassword }),
    });

    const data = await response.json();
    if (data.success) {
      navigate('/login');
    }
    setMessage(data.message);

  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ marginTop: "-50px" }}>

      <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
        <h2 className="text-center mb-3">Forgot Password</h2>

        {/* Email Input */}
        <div className="mb-3">
          <label className="form-label">Enter Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        {/* Send OTP Button */}
        <button
          onClick={handleSendOtp}
          disabled={isOtpButtonDisabled}
          className="btn btn-primary w-100"
        >
          {isOtpButtonDisabled ? "Wait 5 min to Resend OTP" : "Send OTP"}
        </button>

        {/* OTP Input */}
        {showOtpField && (
          <div className="mt-3">
            <label className="form-label">Enter OTP:</label>
            <input
              type="text"
              className="form-control"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
            />
            <button onClick={handleVerifyOtp} className="btn btn-success w-100 mt-2">
              Verify OTP
            </button>
          </div>
        )}

        {/* Password Fields */}
        {showPasswordFields && (
          <div className="mt-3">
            <label className="form-label">New Password:</label>
            <input
              type="password"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />

            <label className="form-label mt-2">Confirm Password:</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
            />

            <button onClick={handleResetPassword} className="btn btn-danger w-100 mt-3">
              Reset Password
            </button>
          </div>
        )}

        {/* Message Display */}
        {message && <div className="alert alert-info text-center mt-3">{message}</div>}
      </div>
    </div>
  );
}
