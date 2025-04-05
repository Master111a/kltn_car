/** @format */

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./index.css";
import carOnboarding from "../../../public/images/car-onboarding.svg";

const LogInForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // You need to replace with your actual Google Client ID
  const GOOGLE_CLIENT_ID =
    "725277824922-hc72q3kc3951cra5ua1uninqvelh20pn.apps.googleusercontent.com";

  // Backend API base URL
  const API_BASE_URL = "http://localhost:7153";

  // Google OAuth redirect URL - sử dụng URL đã đăng ký trong Google Cloud Console
  // const GOOGLE_REDIRECT_URL = `${API_BASE_URL}/api/Common/Authentication/callbackgoogle`;
  const GOOGLE_REDIRECT_URL = `http://localhost:5173`;
  console.log("Using Google redirect URL:", GOOGLE_REDIRECT_URL);

  useEffect(() => {
    // Kiểm tra xem có code được trả về từ Google OAuth không
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get("code");

    if (code) {
      // Google đã chuyển hướng về với code
      console.log(
        "Google authorization code detected:",
        code.substring(0, 15) + "..."
      );
      console.log("Full query string:", queryString);

      // Gửi code đến API handletoken
      handleTokenManually(code);

      // Xóa các tham số khỏi URL để tránh đăng nhập lại khi refresh
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Load the Google Identity Services script
    const loadGoogleScript = () => {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      script.onload = () => {
        // Initialize Google Identity Services when script loads
        if (window.google) {
          console.log("Google Identity Services script loaded");
        }
      };
    };

    loadGoogleScript();

    // Clean up script on component unmount
    return () => {
      const scriptTag = document.querySelector(
        'script[src="https://accounts.google.com/gsi/client"]'
      );
      if (scriptTag) document.body.removeChild(scriptTag);
    };
  }, []);

  // Hàm xử lý token
  const handleTokenManually = async (code) => {
    try {
      console.log("Attempting to send authorization code to API");
      console.log("Code value:", code);

      // Gửi code dưới dạng plain text string
      try {
        setMessage("Đang xử lý xác thực từ Google...");
        console.log("Sending code as JSON to handletoken API");

        // Gửi code tới API
        const response = await axios.post(
          `${API_BASE_URL}/api/Common/Authentication/handletoken`,
          { code: code },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Authentication status:", response.status);
        console.log("Authentication successful. Response:", response.data);

        if (response.data) {
          console.log("Response data type:", typeof response.data);
          if (typeof response.data === "object") {
            console.log("Response data keys:", Object.keys(response.data));
          }
        }

        processSuccessfulLogin(response.data);
      } catch (error) {
        console.error("Authentication error:", error);

        if (error.response) {
          console.error("Error details:", {
            status: error.response.status,
            data: error.response.data,
          });

          // Thử lại với plain text nếu JSON không thành công
          if (error.response.status === 400 || error.response.status === 415) {
            console.log("Trying again with plain text format");
            try {
              const plainTextResponse = await axios.post(
                `${API_BASE_URL}/api/Common/Authentication/handletoken`,
                code,
                {
                  headers: {
                    "Content-Type": "text/plain",
                  },
                }
              );
              console.log(
                "Plain text method succeeded:",
                plainTextResponse.data
              );
              processSuccessfulLogin(plainTextResponse.data);
              return;
            } catch (plainTextError) {
              console.error("Plain text method also failed:", plainTextError);
            }
          }

          setMessage(
            `Lỗi ${error.response.status}: ${
              typeof error.response.data === "object"
                ? JSON.stringify(error.response.data)
                : error.response.data
            }`
          );
        } else if (error.request) {
          console.error("No response received:", error.request);
          setMessage(
            "Không nhận được phản hồi từ máy chủ. Kiểm tra kết nối của bạn."
          );
        } else {
          console.error("Request error:", error.message);
          setMessage(`Lỗi: ${error.message}`);
        }
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setMessage("Không thể xác thực với Google. Vui lòng thử lại.");
    }
  };

  // Xử lý đăng nhập thành công
  const processSuccessfulLogin = (data) => {
    if (data && data.accessToken) {
      localStorage.setItem("token", data.accessToken);
      setMessage("Google login successful!");
      navigate("/");
    } else if (data && data.AccessToken) {
      localStorage.setItem("token", data.AccessToken);
      setMessage("Google login successful!");
      navigate("/");
    } else {
      console.warn("Login succeeded but no token found in response:", data);
      localStorage.setItem("loginData", JSON.stringify(data));
      setMessage("Login successful but token format unknown. Check console.");
      navigate("/");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("Attempting to login...");

    try {
      console.log("Sending login request with:", {
        Email: userName,
        Password: password,
      });

      const response = await axios.post(
        `${API_BASE_URL}/api/Common/Authentication/Login`,
        {
          Email: userName,
          Password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Login response:", response);

      if (response.status === 200) {
        localStorage.setItem("token", response.data.AccessToken);
        setMessage("Login successful!");
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error data:", error.response.data);
        console.error("Error status:", error.response.status);
        console.error("Error headers:", error.response.headers);
        setMessage(
          `Error ${error.response.status}: ${JSON.stringify(
            error.response.data
          )}`
        );
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error request:", error.request);
        setMessage("No response received from server. Check your connection.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
        setMessage(`Error: ${error.message}`);
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // Gọi API loginGoogle để lấy URL redirect
      const response = await axios.get(
        `${API_BASE_URL}/api/Common/Authentication/loginGoogle`
      );

      if (response.data && response.data.redirectUrl) {
        // Chuyển hướng người dùng đến URL xác thực Google
        window.location.href = response.data.redirectUrl;
      } else {
        // Sử dụng cách cũ nếu API không trả về URL
        redirectToGoogleLogin();
      }
    } catch (error) {
      console.error("Error getting Google login URL:", error);
      // Fallback nếu API không hoạt động
      redirectToGoogleLogin();
    }
  };

  // Sử dụng cách đăng nhập Google mặc định nếu API không hoạt động
  const redirectToGoogleLogin = () => {
    const oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

    const form = document.createElement("form");
    form.setAttribute("method", "GET");
    form.setAttribute("action", oauth2Endpoint);

    const params = {
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: GOOGLE_REDIRECT_URL,
      response_type: "code",
      scope: "email profile openid",
      access_type: "offline",
      prompt: "consent",
    };

    for (const p in params) {
      const input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", p);
      input.setAttribute("value", params[p]);
      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <div className='onboarding'>
      <div className='onboarding-left'>
        <h1 className='signup-title'>Welcome 👋</h1>

        <form onSubmit={handleLogin}>
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
                type='text'
                className='input-field'
                placeholder='Enter your email'
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
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

          <button type='submit' className='btn signup-btn'>
            Login
          </button>
          {message && <p className='message'>{message}</p>}

          <div className='divider'>
            <span className='divider-text'>Or</span>
          </div>

          <button
            className='btn login-btn'
            type='button'
            onClick={handleGoogleLogin}>
            <div className='google-icon'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='21'
                height='20'
                viewBox='0 0 21 20'
                fill='none'>
                <g clipPath='url(#clip0_6_717)'>
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
            Log In with Google
          </button>

          <p className='login-link'>
            Don&apos;t have an account?{" "}
            <a href='#' onClick={() => navigate("/signup")}>
              Sign Up
            </a>
          </p>
        </form>
      </div>

      <div className='onboarding-right'>
        <img src={carOnboarding} alt='Luxury Car' />
      </div>
    </div>
  );
};

export default LogInForm;
