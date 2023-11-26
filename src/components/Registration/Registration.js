import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Registration.css";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [movie, setmovie] = useState("");
  const [text, settext] = useState("Sign Up");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [movieError, setMovieError] = useState("");
  const [valid, setvalid] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  useEffect(() => {
    updateValidState();
  }, [name, email, movie, password, nameError, emailError, movieError, passwordError]);

  const updateValidState = () => {
    if (
      !nameError &&
      !emailError &&
      !movieError &&
      !passwordError &&
      name &&
      email &&
      movie &&
      password
    ) {
      setvalid(true);
    } else {
      setvalid(false);
    }
  };

  const handleName = (e) => {
    setname(e.target.value);
    if (e.target.value.length < 3) {
      setNameError("Please enter more than 3 characters for name");
    } else {
      setNameError("");
    }
  };

  const handlemovie = (e) => {
    setmovie(e.target.value);
    if (e.target.value.length < 3) {
      setMovieError("Please enter more than 3 characters for favorite movie");
    } else {
      setMovieError("");
    }
  };

  const handleEmail = (e) => {
    setemail(e.target.value);
    if (!validateEmail(e.target.value)) {
      setEmailError("Please enter a valid email");
    } else {
      setEmailError("");
    }
  };

  const handlePass = (e) => {
    setpassword(e.target.value);
    if (e.target.value.length < 8) {
      setPasswordError("Password must be minimum 8 characters");
    } else {
      setPasswordError("");
    }
  };

  const handlesubmit = async () => {
    if (valid) {
      try {
        const response = await axios.post("http://localhost:4000/registration", {
          name: name,
          email: email,
          password: password,
          favouritemovie: movie,
        });

        if (response.status === 200) {
          settext("Created Successfully");
          setRegistrationSuccess(true);

          setTimeout(() => {
            settext("Sign Up");
            setname("");
            setemail("");
            setpassword("");
            setmovie("");
            setRegistrationSuccess(false);
            navigate("/login");
          }, 3000);
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          settext("Account Already Exists");
          setRegistrationSuccess(true);

          setTimeout(() => {
            settext("Sign Up");
            setRegistrationSuccess(false);
          }, 3000);
        } else {
          console.error(error.message);
        }
      }
    }
  };

  return (
    <div className="reg">
      <div className="registration">
        <input
          type="text"
          className="text"
          placeholder="Full Name"
          value={name}
          onChange={handleName}
        />
        <br />
        {nameError && (
          <p style={{ color: "red" }} className="error">
            {nameError}
          </p>
        )}
        <input
          type="text"
          className="fm"
          placeholder="Favourite Movie"
          value={movie}
          onChange={handlemovie}
        />
        <br />
        {movieError && (
          <p style={{ color: "red" }} className="error">
            {movieError}
          </p>
        )}
        <input
          type="email"
          className="email"
          placeholder="EMAIL"
          value={email}
          onChange={handleEmail}
        />
        <br />
        {emailError && (
          <p style={{ color: "red" }} className="error">
            {emailError}
          </p>
        )}
        <input
          type="password"
          className="password"
          placeholder="Password"
          value={password}
          onChange={handlePass}
        />
        <br />
        {passwordError && (
          <p style={{ color: "red" }} className="error">
            {passwordError}
          </p>
        )}

        {registrationSuccess && text !== "Account Already Exists" && (
          <p className="success-message">
            Account created &#10004;
          </p>
        )}

        <button
          className={valid ? "validity" : "notvalid"}
          onClick={handlesubmit}
        >
          {text}
        </button>
      </div>
    </div>
  );
};

export default Registration;
