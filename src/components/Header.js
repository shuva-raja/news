import React, { useState } from "react";
import riya from "../logo.png";
import "./Header.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import { useUser } from "../components/context/UserContext";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setshow] = useState(false);
  const { user, logout } = useUser();
  
  // Check if the current route is /login or /registration
  const isLoginOrRegistration = location.pathname === "/login" || location.pathname === "/registration";

  const handleclick = () => {
    setshow(!show);
  };
  
  const handleLogout = async () => {
    try {
      // Make an HTTP POST request to the logout route on your server
      await axios.post("http://localhost:4000/user/logout", null, {
        withCredentials: true, // Include cookies
      });
      console.log("logged out ");
      logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Conditional rendering based on the route
  if (isLoginOrRegistration) {
    return null; // Do not render the header for login or registration routes
  }

  return (
    <div className="parent">
      <img style={{ width: "300px" }} src={riya} alt="Logo" />
      <Link className="anchor" to="/">
        Home
      </Link>
      <Link className="anchor" to="/bengali">
        Bengali
      </Link>
      <Link className="anchor" to="/health">
        Health
      </Link>
      <Link className="anchor" to="/tech">
        Technology
      </Link>
      <Link className="anchor" to="/space">
        Space
      </Link>
      <Link className="anchor" to="/sports">
        Sports
      </Link>
      <Link className="anchor" to="/entertainment">
        Entertainment
      </Link>
      <Link className="anchor" to="/politics">
        Politics
      </Link>
      <Link className="anchor" to="/crypto">
        Crypto
      </Link>
      <Link className="anchor" to="/weather">
        Weather
      </Link>
      
      {user ? (
        <div className="anchor2" onClick={handleclick}>
          <span>{user.name}</span>
          <span className="anchor" style={{ marginTop: "3px" }}>
            {" "}
            <IoMdArrowDropdown />
          </span>

          <div className={show ? "info" : "not"}>
            <div>
              <Link to={"/user/info"} className="in">
                Info
              </Link>
            </div>
            <div onClick={handleLogout}>Logout</div>
          </div>
        </div>
      ) : (
        <Link className="anchor" to="/login">
          Log In
        </Link>
      )}
    </div>
  );
};

export default Header;
