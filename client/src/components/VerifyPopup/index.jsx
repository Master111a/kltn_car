/** @format */

import React, { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";

const VerifyPopup = ({ email, onSuccess, onClose }) => {
  const [verifyCode, setVerifyCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [sentCode, setSentCode] = useState("");
  const [resendTimeout, setResendTimeout] = useState(0);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Bắt đầu đếm ngược từ 60 giây
    if (resendTimeout > 0) {
      const timer = setTimeout(() => setResendTimeout(resendTimeout - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimeout]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Function to handle countdown for resend button
  const startResendCountdown = () => {
    setResendDisabled(true);
    setCountdown(60); // 60 seconds countdown

    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer);
          setResendDisabled(false);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("Sending verification with:", { email, verifyCode });

      const response = await axios.post(
        "http://localhost:5046/api/Common/Authentication/verify-regis-account",
        {
          Email: email,
          Code: verifyCode,
        }
      );

      console.log("Verification response:", response);

      if (response.status === 200) {
        onSuccess();
      }
    } catch (err) {
      console.error("Verification error details:", err);
      alert(`DEBUG: Lỗi xác thực. Chi tiết trong console.`);
      setError("Xác thực không thành công. Vui lòng kiểm tra mã và thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const resendVerificationCode = async () => {
    if (countdown > 0) return;

    try {
      setLoading(true);
      setError("");

      const response = await axios.post(
        `http://localhost:5046/api/Common/Authentication/send-verify-email?email=${encodeURIComponent(
          email
        )}`
      );

      if (response.status === 200) {
        setCountdown(60); // Bắt đầu đếm ngược 60 giây
        setSuccess("Đã gửi lại mã xác thực. Vui lòng kiểm tra email của bạn.");

        // Hiển thị thông báo thành công trong 3 giây
        setTimeout(() => {
          setSuccess("");
        }, 3000);
      }
    } catch (err) {
      console.error("Error resending code:", err);
      setError("Không thể gửi lại mã xác thực. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='verify-popup-overlay'>
      <div className='verify-popup'>
        <div className='verify-popup-header'>
          <h2>Xác thực tài khoản</h2>
          <button className='close-button' onClick={onClose}>
            ×
          </button>
        </div>

        <div className='verify-popup-content'>
          <p>
            Chúng tôi đã gửi mã xác thực đến email:
            <br />
            <span className='verify-email'>{email}</span>
          </p>

          {error && <div className='error-message'>{error}</div>}
          {success && <div className='success-message'>{success}</div>}

          <form onSubmit={handleVerify}>
            <div className='form-group'>
              <label>Nhập mã xác thực</label>
              <div className='verify-input-container'>
                <input
                  type='text'
                  value={verifyCode}
                  onChange={(e) => setVerifyCode(e.target.value)}
                  placeholder='Nhập mã 6 chữ số'
                  maxLength={6}
                  required
                />
              </div>
            </div>

            <button type='submit' className='verify-button' disabled={loading}>
              {loading ? "Đang xử lý..." : "Xác thực"}
            </button>
          </form>

          <div className='resend-code'>
            <span>Không nhận được mã? </span>
            <button
              onClick={resendVerificationCode}
              className='resend-button'
              disabled={countdown > 0 || loading}>
              {countdown > 0 ? `Gửi lại sau ${countdown}s` : "Gửi lại mã"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyPopup;
