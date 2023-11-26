import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <>
      <div className="about-section">
        <h1>About Us Page</h1>
        <p>Welcome to our Website</p>
        <p>
        Our mission at Vision is to bring you the latest and most reliable news from around the globe. We strive to provide accurate, diverse, and engaging content covering a wide spectrum of topics, from politics and technology to entertainment and sports. With a team dedicated to delivering comprehensive news articles and stories, we aim to keep you informed and up-to-date with the ever-evolving world. Join us in exploring the world through the lens of unbiased journalism and insightful reporting."
        </p>
      </div>

      <h2 style={{ textAlign: "center" }}>Our Team</h2>

      <div className="row">
        <div className="column">
          <div className="cards">
            
            <div className="containers">
              <h2>Shuvajit Karmakar</h2>
              <p className="title">Developer</p>
              <p>shuvajit.motog@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="cards">
            
            <div className="containers">
              <h2>Malina Mondal</h2>
              <p className="title">Developer</p>
              <p>totto.buni@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="cards">
            
            <div className="containers">
              <h2>Ayan Sarkar</h2>
              <p className="title">Designer</p>
              <p>sarkarayon@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="cards">
           
            <div className="containers">
              <h2>Suman Dutta</h2>
              <p className="title">Backend Developer</p>
              <p>souu.dey1234@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="cards">
            
            <div className="containers">
              <h2>Shubhadeep Gorai</h2>
              <p className="title">Frontend Developer</p>
              <p>Shubhadeepgorai@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="cards">
            
            <div className="containers">
              <h2>Sujoy Kumar Basu</h2>
              <p className="title">Our Guide</p>
              <p>sujoukumarbasu@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
