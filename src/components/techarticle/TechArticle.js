import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./TechArticle.css";
import date from "../Time";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
} from "react-share";
import { FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa"; // Icons for buttons
import { AiOutlineMail } from "react-icons/ai";

const TechArticle = () => {
  const [Tech, setTech] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Added loading indicator state
  const { articleId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/article/${articleId}`
        );
        const data = response.data;
        setTech(data);
        setIsLoading(false); // Data has been fetched, set isLoading to false
      } catch (error) {
        console.error("Error fetching news data:", error);
        setIsLoading(false); // An error occurred, set isLoading to false
      }
    };
    fetchData();
  }, [articleId]); // Include articleId in the dependency array to re-fetch when it changes
  const removeJavaScriptCode = (inputString) => {
    const regex =
      /var[\s\S]*?\)\);|googletag\.cmd\.push\(function\(\) \{ googletag\.display\("div-gpt-ad-6601185-5"\); \}\);/g;
    let cleanedString = inputString.replace(regex, "");
    const newRegex =
      /var fire_livetvEnable = false; document.addEventListener\("scroll",[\s\S]*?fire_livetvEnable = true; \}/g;
    cleanedString = cleanedString.replace(newRegex, "");
    return cleanedString;
  };

  // Example usage:
  const inputString = `... your input string ...`; // Replace with your actual input string
  const cleanedString = removeJavaScriptCode(inputString);
  console.log(cleanedString);

  if (isLoading) {
    return <p>Loading...</p>; // Display a loading indicator while fetching data
  }

  const shareUrl = window.location.href; // The current page URL
  const shareTitle = Tech.title; // The title of your article

  return (
    <div className="article">
      <div className="articlesection">
        <div className="title">{Tech.title}</div>
        <img src={Tech.image_url} alt={Tech.title} />
        {/* Social media sharing buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            marginBottom: "15px",
          }}
          className="social-buttons"
        >
          <EmailShareButton url={shareUrl} title={shareTitle}>
            <AiOutlineMail size={32} />
          </EmailShareButton>
          <FacebookShareButton url={shareUrl} title={shareTitle}>
            <FaFacebook size={32} />
          </FacebookShareButton>

          <TwitterShareButton url={shareUrl} title={shareTitle}>
            <FaTwitter size={32} />
          </TwitterShareButton>

          <WhatsappShareButton url={shareUrl} title={shareTitle}>
            <FaWhatsapp size={32} />
          </WhatsappShareButton>
        </div>
        <span
          style={{
            color: "blue",
            fontWeight: "bold",
            marginBottom: "10px",
            textTransform: "uppercase",
          }}
        >
          {Tech.country}
        </span>
        <p style={{ color: "green", fontWeight: "bold", marginBottom: "10px" }}>
          {date(Tech.pubDate)}
        </p>
        <p>{removeJavaScriptCode(Tech.content)}</p>
      </div>
    </div>
  );
};

export default TechArticle;
