import { useState, useRef, useEffect } from "react";
import React from "react";
import axios from "axios";

import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "./Login.css";
const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [text, settext] = useState("Log In");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [valid, setvalid] = useState(false);
  const navigate = useNavigate();
  const emailTimeoutRef = useRef(null);
  const passwordTimeoutRef = useRef(null);

  const { login } = useUser();
  const validateEmail = (email) => {
    // You can use a regular expression or a more sophisticated validation method
    // Here's a basic example for email validation
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const updateValidState = () => {
    // Check if all validation errors are empty
    if (!emailError && !passwordError && email && password) {
      setvalid(true); // All inputs are valid
    } else {
      setvalid(false); // At least one input is invalid
    }
  };
  useEffect(() => {
    updateValidState();
  }, [email, password]);
  const handleEmail = (e) => {
    const newValue = e.target.value;
    setemail(newValue);

    if (!validateEmail(newValue)) {
      setEmailError("Please enter a valid email");
      setvalid(false);
    } else {
      setEmailError("");
    }
  };

  const handlePass = (e) => {
    const newValue = e.target.value;
    setpassword(newValue);

    if (newValue.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      setvalid(false);
    } else {
      setPasswordError("");
    }
  };
  // Validate password

  // Validate movie

  const handlesubmit = async () => {
    console.log("Valid:", valid);
    if (valid) {
      try {
        const response = await axios.post("http://localhost:4000/login", {
          email: email,
          password: password,
        },{
          withCredentials: true, // Include cookies
        })
      
        settext(" Success");
        const { token, user } = response.data;
        login(user);
        // Clear input fields after 3 seconds
        setTimeout(() => {
          settext("Sign Up");

          setemail("");
          setpassword("");
        }, 3000);

        navigate("/");
      } catch (error) {
        console.error(error.message);
      }
    }
  };
  const checkPassClicked = () => {
    setShowPassword(!showPassword);
    updateValidState(); // Toggle the state when the checkbox is clicked
  };

  return (
    <div className="loginparent">
      <div className="login">
        <input
          type="email"
          className="email"
          placeholder="EMAIL"
          value={email}
          onChange={handleEmail}
        />

        {emailError && (
          <p style={{ color: "red" }} className="error">
            {emailError}
          </p>
        )}
        <input
          type={showPassword ? "text" : "password"}
          className="password"
          placeholder="Password"
          value={password}
          onChange={handlePass}
          onPaste={handlePass}
        />

        <span style={{ textAlign: "initial", marginBottom: "20px" }}>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={checkPassClicked}
            id="pass"
          />
          Show Password
        </span>
        {/* <span>{passref.current.value}</span> */}
        {passwordError && (
          <p style={{ color: "red" }} className="error">
            {passwordError}
          </p>
        )}

        <button
          className={valid ? "validity" : "notvalid"}
          onClick={handlesubmit}
        >
          {text}
        </button>
        <div className="newtovision">
          <span className="asking">New to Vision?</span>
          <Link to="/registration">
            <span className="cna">Create New Account</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
