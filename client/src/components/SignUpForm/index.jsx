/** @format */

import React, { useState } from "react";
import "./index.css";
import carOnboarding from "../../../public/images/car-onboarding.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import VerifyPopup from "../VerifyPopup";

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showVerifyPopup, setShowVerifyPopup] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validate form
    if (!name || !email || !password) {
      setError("Vui lòng điền đầy đủ thông tin");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      setLoading(false);
      return;
    }

    // Current date for DOB (you might want to add a date picker in the future)
    const dob = new Date();

    try {
      // Create signup payload
      const signUpData = {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        dob: dob.toISOString(),
        gender: true, // Default value, consider adding gender selection
      };

      // Call API endpoint
      const response = await axios.post(
        "http://localhost:5046/api/Common/Authentication/signUpAccount",
        signUpData
      );

      if (response.status === 200) {
        setSuccess(true);

        // Gửi email xác thực
        try {
          const verifyResponse = await axios.post(
            `http://localhost:5046/api/Common/Authentication/send-verify-email?email=${encodeURIComponent(
              email
            )}`
          );
          console.log("Verify email response:", verifyResponse);

          // Hiển thị popup xác thực
          setShowVerifyPopup(true);
        } catch (verifyErr) {
          console.error("Error sending verification email:", verifyErr);
          setError(
            "Đăng ký thành công nhưng không thể gửi email xác thực. Vui lòng thử lại."
          );
        }
      }
    } catch (err) {
      console.error("Đăng ký thất bại:", err);
      setError(
        err.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại sau."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifySuccess = () => {
    setShowVerifyPopup(false);
    navigate("/login");
  };

  return (
    <div className='onboarding'>
      <div className='onboarding-left'>
        <h1 className='signup-title'>Create Your Account</h1>

        {error && <div className='error-message'>{error}</div>}
        {success && (
          <div className='success-message'>
            Đăng ký thành công! Vui lòng kiểm tra email để xác minh tài khoản.
          </div>
        )}

        <form onSubmit={handleSignUp}>
          <div className='form-group'>
            <label className='form-label'>Name</label>
            <div className='input-container'>
              <svg
                className='input-icon'
                width='18'
                height='18'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'>
                <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' />
                <circle cx='12' cy='7' r='4' />
              </svg>
              <input
                type='text'
                className='input-field'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className='form-group'>
            <label className='form-label'>Email</label>
            <div className='input-container'>
              <svg
                className='input-icon'
                width='18'
                height='18'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'>
                <path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' />
                <polyline points='22,6 12,13 2,6' />
              </svg>
              <input
                type='email'
                className='input-field'
                placeholder='email@example.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className='form-group'>
            <label className='form-label'>Password</label>
            <div className='input-container'>
              <svg
                className='input-icon'
                width='18'
                height='18'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'>
                <rect x='3' y='11' width='18' height='11' rx='2' ry='2' />
                <path d='M7 11V7a5 5 0 0 1 10 0v4' />
              </svg>
              <input
                type={showPassword ? "text" : "password"}
                className='input-field'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <svg
                className='password-toggle'
                width='18'
                height='18'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <>
                    <path d='M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24' />
                    <line x1='1' y1='1' x2='23' y2='23' />
                  </>
                ) : (
                  <>
                    <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />
                    <circle cx='12' cy='12' r='3' />
                  </>
                )}
              </svg>
            </div>
          </div>

          <div className='form-group'>
            <label className='form-label'>Confirm Password</label>
            <div className='input-container'>
              <svg
                className='input-icon'
                width='18'
                height='18'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'>
                <rect x='3' y='11' width='18' height='11' rx='2' ry='2' />
                <path d='M7 11V7a5 5 0 0 1 10 0v4' />
              </svg>
              <input
                type={showPassword ? "text" : "password"}
                className='input-field'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type='submit' className='btn signup-btn' disabled={loading}>
            {loading ? "Đang xử lý..." : "Sign Up"}
          </button>
          <div className='divider'>
            <span className='divider-text'>Or</span>
          </div>

          <button type='button' className='btn login-btn'>
            <div className='google-icon'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='21'
                height='20'
                viewBox='0 0 21 20'
                fill='none'>
                <g clip-path='url(#clip0_6_717)'>
                  <path
                    d='M4.93242 12.0863L4.23625 14.6852L1.69176 14.739C0.931328 13.3286 0.5 11.7149 0.5 10C0.5 8.34179 0.903281 6.77804 1.61813 5.40112H1.61867L3.88398 5.81644L4.87633 8.06816C4.66863 8.67366 4.55543 9.32366 4.55543 10C4.55551 10.7341 4.68848 11.4374 4.93242 12.0863Z'
                    fill='#FBBB00'
                  />
                  <path
                    d='M20.3252 8.1319C20.44 8.73682 20.4999 9.36155 20.4999 10C20.4999 10.716 20.4246 11.4143 20.2812 12.088C19.7944 14.3803 18.5224 16.3819 16.7604 17.7984L16.7598 17.7978L13.9065 17.6522L13.5027 15.1314C14.6719 14.4456 15.5857 13.3726 16.067 12.088H10.7197V8.1319H16.145H20.3252Z'
                    fill='#518EF8'
                  />
                  <path
                    d='M16.76 17.7978L16.7606 17.7984C15.0469 19.1758 12.8699 20 10.5001 20C6.6919 20 3.38092 17.8715 1.69189 14.739L4.93256 12.0863C5.77705 14.3401 7.95123 15.9445 10.5001 15.9445C11.5957 15.9445 12.6221 15.6484 13.5029 15.1313L16.76 17.7978Z'
                    fill='#28B446'
                  />
                  <path
                    d='M16.883 2.30219L13.6434 4.95438C12.7319 4.38461 11.6544 4.05547 10.5 4.05547C7.89344 4.05547 5.67859 5.73348 4.87641 8.06813L1.61871 5.40109H1.61816C3.28246 2.19231 6.63519 0 10.5 0C12.9264 0 15.1511 0.864297 16.883 2.30219Z'
                    fill='#F14336'
                  />
                </g>
                <defs>
                  <clipPath id='clip0_6_717'>
                    <rect
                      width='20'
                      height='20'
                      fill='white'
                      transform='translate(0.5)'
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
            Sign In with Google
          </button>

          <p className='login-link'>
            Have an account?{" "}
            <a href='#' onClick={() => navigate("/login")}>
              Log in
            </a>
          </p>
        </form>
      </div>

      <div className='onboarding-right'>
        <img src={carOnboarding} alt='Luxury Car' />
      </div>

      {showVerifyPopup && (
        <VerifyPopup
          email={email}
          onSuccess={handleVerifySuccess}
          onClose={() => setShowVerifyPopup(false)}
        />
      )}
    </div>
  );
};

export default SignupForm;
