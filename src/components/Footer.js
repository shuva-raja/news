import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGooglePlay, faAppStore } from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";
import { Link, useLocation } from "react-router-dom";
import riya from "../logo.png";

const Footer = () => {
  const location = useLocation();
  const { pathname } = location;

  // Check if current path is '/login' or '/registration'
  const hideFooter = pathname === "/login" || pathname === "/registration";

  if (hideFooter) {
    return null; // Don't render the footer if on '/login' or '/registration'
  }

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <Link to={"/aboutus"}>
            <h3>About Us</h3>
          </Link>
          <div style={{width:'140px',height:'30px',backgroundColor:'white',marginLeft:'30px',borderRadius:'7px',marginBottom:'4px'}}>
            <img className="im" src={riya} alt="images" />
          </div>
          <span>
            <h3>TRUTH UNBOUND</h3>
          </span>
        </div>
        <div className="footer-section">
          <Link to={"/contactus"}>
            <h3>Contact Us</h3>
          </Link>
          <span>Phone: +123 456 7890</span>
          <br />
          <span>visionthenews@gmail.com</span>
        </div>

        <div className="footer-section">
          <h3>Legal</h3>
          <Link style={{textDecoration:'none'}} to={"/news"}>Load More</Link>
          <br />
          <span>Privacy Policy</span>
          <br />
          <span>Terms and Conditions</span>
        </div>
        <div className="footer-section">
          <h3>Our App</h3>
          <div className="app-icons">
            <span className="idk">
              <FontAwesomeIcon style={{color: '#3ddc84',marginRight:'4px'}} icon={faGooglePlay} />
              Google Play Store
            </span>
            <span className="idk">
              <FontAwesomeIcon  style={{color: '#0073ff',marginRight:'9px'}} icon={faAppStore} />
              Iphone App Store
            </span>
          </div>
        </div>
        <div className="footer-sections">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <Link><FaTwitter className="icon" /></Link>
            <Link><FaLinkedin className="icon" /></Link>
            <Link><FaFacebook className="icon" /></Link>
            <Link><FaInstagram className="icond" /></Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2023 TheVision | Headquarters: Asansol, India</p>
      </div>
    </footer>
  );
};

export default Footer;
