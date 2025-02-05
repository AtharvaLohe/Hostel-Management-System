import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isOtpButtonDisabled, setIsOtpButtonDisabled] = useState(false);
  const [otpExpiryTime, setOtpExpiryTime] = useState(null);

  const navigate = useNavigate();
  // Function to send OTP
  const sendOtp = async () => {
    setError("");
    setMessage("");

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/password/sendOtp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setOtpSent(true);
        setIsOtpButtonDisabled(true);
        const expiryTime = Date.now() + 5 * 60 * 1000; // 5 minutes from now
        setOtpExpiryTime(expiryTime);

        setTimeout(() => {
          setIsOtpButtonDisabled(false);
          setOtpExpiryTime(null);
        }, 5 * 60 * 1000);
      } else {
        setError("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      setError("Error sending OTP. Please try again.");
    }
  };

  // Function to verify OTP
  const verifyOtp = async () => {
    setError("");
    setMessage("");

    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/password/verifyOtp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      if (data.success) {
        setOtpVerified(true);
        setMessage(data.message);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Failed to verify OTP. Please try again.");
    }
  };

  // Function to reset password
  const resetPassword = async () => {
    setError("");
    setMessage("");

    if (!newPassword || !confirmPassword) {
      setError("Please enter both password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/password/resetPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage(data.message);
        navigate('/login')
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Failed to reset password. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <h2>Password Reset</h2>

      {!otpSent ? (
        <>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", margin: "10px 0" }}
          />
          <button onClick={sendOtp} disabled={isOtpButtonDisabled} style={{ padding: "10px", width: "100%" }}>
            {isOtpButtonDisabled
              ? `Resend OTP in ${Math.ceil((otpExpiryTime - Date.now()) / 1000 / 60)} min`
              : "Send OTP"}
          </button>
        </>
      ) : !otpVerified ? (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", margin: "10px 0" }}
          />
          <button onClick={verifyOtp} style={{ padding: "10px", width: "100%" }}>
            Verify OTP
          </button>
        </>
      ) : (
        <>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", margin: "10px 0" }}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", margin: "10px 0" }}
          />
          <button onClick={resetPassword} style={{ padding: "10px", width: "100%" }}>
            Reset Password
          </button>
        </>
      )}

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ForgetPassword;
